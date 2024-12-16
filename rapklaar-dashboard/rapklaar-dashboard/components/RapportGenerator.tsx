import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { pdf } from '@react-pdf/renderer'
import saveAs from 'file-saver'
import JSZip from 'jszip'
import Schuifknop from './Schuifknop'
import RapportPDF from './RapportPDF'
import { Download, Eye, Save } from 'lucide-react'

interface Student {
  id: string
  naam: string
  klas: string
  [key: string]: string | number
}

interface RapportGeneratorProps {
  klasId: string
  studenten: Student[]
}

const RapportGenerator: React.FC<RapportGeneratorProps> = ({ klasId, studenten }) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [sprekenScore, setSprekenScore] = useState(0)
  const [schrijvenScore, setSchrijvenScore] = useState(0)
  const [opgeslagen, setOpgeslagen] = useState<string[]>([])
  const [stap, setStap] = useState<3 | 4>(3)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleStudentSelect = useCallback((student: Student) => {
    setSelectedStudent(student)
    setSprekenScore(student.spreken as number || 0)
    setSchrijvenScore(student.schrijven as number || 0)
    setStap(3)
    setShowPreview(false)
    setPdfUrl(null)
    setError(null)
  }, [])

  const handleSave = useCallback(() => {
    if (selectedStudent) {
      const updatedStudent = {
        ...selectedStudent,
        spreken: sprekenScore,
        schrijven: schrijvenScore,
      }
      console.log('Rapport opgeslagen:', updatedStudent)
      setOpgeslagen(prev => [...prev, selectedStudent.id])
      alert(`Rapport voor ${selectedStudent.naam} is opgeslagen!`)
    }
  }, [selectedStudent, sprekenScore, schrijvenScore])

  const generatePDF = useCallback(async (student: Student): Promise<Blob> => {
    if (!student) {
      throw new Error('Student data is missing')
    }

    try {
      const document = <RapportPDF student={student} />
      const pdfBlob = await pdf(document).toBlob()
      
      if (!pdfBlob) {
        throw new Error('PDF generation failed: Blob is null')
      }
      
      return pdfBlob
    } catch (error) {
      console.error('PDF generation error:', error)
      throw new Error(`Failed to generate PDF for ${student.naam}: ${error.message}`)
    }
  }, [])

  const handleDownloadKlas = useCallback(async () => {
    if (isGenerating) return
    setIsGenerating(true)
    setError(null)

    const zip = new JSZip()
    
    try {
      for (const student of studenten) {
        try {
          const pdfBlob = await generatePDF(student)
          zip.file(`${student.naam}_rapport.pdf`, pdfBlob)
        } catch (error) {
          console.error(`Error generating PDF for ${student.naam}:`, error)
          setError(`Fout bij het genereren van PDF voor ${student.naam}: ${error.message}`)
          continue
        }
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      saveAs(zipBlob, `${klasId}_rapporten.zip`)
    } catch (error) {
      console.error('Error creating class report zip:', error)
      setError(`Er is een fout opgetreden bij het genereren van de rapporten: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }, [generatePDF, isGenerating, klasId, studenten])

  const handleDownloadPDF = useCallback(async (student: Student) => {
    if (isGenerating) return
    setIsGenerating(true)
    setError(null)

    try {
      const blob = await generatePDF(student)
      if (!blob) {
        throw new Error('PDF generation failed: Blob is null')
      }
      saveAs(blob, `${student.naam}_rapport.pdf`)
    } catch (error) {
      console.error('Error downloading PDF:', error)
      setError(`Er is een fout opgetreden bij het downloaden van het rapport: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }, [generatePDF, isGenerating])

  const togglePreview = useCallback(async () => {
    if (!selectedStudent) return

    setShowPreview(prev => !prev)
    if (!showPreview) {
      setError(null)
      try {
        const blob = await generatePDF({...selectedStudent, spreken: sprekenScore, schrijven: schrijvenScore})
        const url = URL.createObjectURL(blob)
        setPdfUrl(url)
      } catch (error) {
        console.error('Error generating PDF preview:', error)
        setError(`Er is een fout opgetreden bij het genereren van de voorvertoning: ${error.message}`)
      }
    } else {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
        setPdfUrl(null)
      }
    }
  }, [selectedStudent, showPreview, sprekenScore, schrijvenScore, generatePDF, pdfUrl])

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [pdfUrl])

  const studentList = useMemo(() => (
    <ul className="space-y-2 max-h-60 overflow-y-auto bg-gray-50 rounded-lg p-4">
      {studenten.map((student) => (
        <li
          key={student.id}
          className={`p-2 rounded cursor-pointer ${
            selectedStudent?.id === student.id ? 'bg-blue-100' : 'hover:bg-gray-100'
          } ${opgeslagen.includes(student.id) ? 'text-green-600' : ''}`}
          onClick={() => handleStudentSelect(student)}
        >
          <span>{student.naam}</span>
          {opgeslagen.includes(student.id) && (
            <Save className="inline-block ml-2" size={16} />
          )}
        </li>
      ))}
    </ul>
  ), [studenten, selectedStudent, opgeslagen, handleStudentSelect])

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Rapporten maken voor {klasId}</h2>
        <button
          onClick={() => setStap(stap === 3 ? 4 : 3)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {stap === 3 ? "Ga naar downloaden" : "Terug naar invullen"}
        </button>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Fout: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {stap === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Selecteer een student</h3>
              {studentList}
            </div>
            {selectedStudent && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold mb-2">Live Preview</h4>
                <button
                  onClick={togglePreview}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2"
                >
                  {showPreview ? "Verberg Preview" : "Toon Preview"}
                </button>
                {showPreview && pdfUrl && (
                  <div className="pdf-viewer-container" style={{ height: '400px', overflow: 'auto' }}>
                    <iframe src={pdfUrl} width="100%" height="100%" title="PDF Preview" />
                  </div>
                )}
              </div>
            )}
          </div>
          {selectedStudent && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Rapport voor {selectedStudent.naam}</h3>
              <div className="space-y-4">
                {Object.entries(selectedStudent).map(([key, value]) => {
                  if (key !== 'id' && key !== 'naam' && key !== 'klas' && key !== 'spreken' && key !== 'schrijven') {
                    return (
                      <div key={key} className="border-b pb-2">
                        <h4 className="font-medium text-gray-700">{key}</h4>
                        <p className="text-gray-900">{value}</p>
                      </div>
                    )
                  }
                  return null
                })}
                <div className="border-b pb-2">
                  <h4 className="font-medium text-gray-700">Spreken</h4>
                  <Schuifknop onChange={setSprekenScore} initialValue={sprekenScore} />
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-gray-700">Schrijven</h4>
                  <Schuifknop onChange={setSchrijvenScore} initialValue={schrijvenScore} />
                </div>
                <button
                  onClick={handleSave}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                >
                  Rapport Opslaan
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {stap === 4 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Rapporten downloaden</h3>
          <button
            onClick={handleDownloadKlas}
            disabled={isGenerating}
            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Download className="mr-2" size={20} />
            {isGenerating ? 'Bezig met genereren...' : 'Download alle rapporten'}
          </button>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4">Individuele rapporten downloaden</h4>
            <ul className="space-y-2">
              {studenten.map((student) => (
                <li key={student.id} className="flex justify-between items-center">
                  <span>{student.naam}</span>
                  <button
                    onClick={() => handleDownloadPDF(student)}
                    disabled={isGenerating}
                    className={`text-green-500 hover:text-green-600 ${
                      isGenerating ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Download size={20} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default RapportGenerator

