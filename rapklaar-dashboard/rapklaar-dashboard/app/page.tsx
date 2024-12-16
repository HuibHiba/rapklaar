'use client'

import { useState } from 'react'
import { Upload, FileUp, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Papa from 'papaparse'
import ClassSelection from '../components/ClassSelection'
import ReportForm from '../components/ReportForm'
import ReportSelection from '../components/ReportSelection'
import ALFAReportForm from '../components/ALFAReportForm'
import { Button } from "@/components/ui/button"

interface Student {
  id: string
  naam: string
  groep: string
  vakken: {
    [vak: string]: {
      vaardigheid: string
      resultaten: {
        resultaat: string
        niveau: string
        score: string | number
        afnamedatum: string
      }
    }[]
  }
}

export default function Home() {
  const [step, setStep] = useState(1)
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [classes, setClasses] = useState<{ [key: string]: Student[] }>({})
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const processCSV = (file: File) => {
    Papa.parse(file, {
      complete: (result) => {
        console.log('Ruwe CSV data:', result.data);
        const processedClasses: { [key: string]: Student[] } = {}
        const studentMap: { [key: string]: Student } = {}
        
        if (!result.data || result.data.length === 0) {
          setError('Het CSV-bestand is leeg.')
          return
        }

        // First pass: Group all data by student and subject
        result.data.forEach((row: any) => {
          const firstName = row['Voornaam'] || ''
          const middleName = row['Tussenvoegsel'] || ''
          const lastName = row['Achternaam'] || ''
          const studentNumber = row['Leerlingnummer']
          const groupValue = row['Groep']
          
          if (studentNumber && groupValue) {
            const studentKey = studentNumber.toString()
            const fullName = [firstName, middleName, lastName]
              .filter(part => part.length > 0)
              .join(' ')
              .trim()

            if (!studentMap[studentKey]) {
              studentMap[studentKey] = {
                id: studentNumber,
                naam: fullName,
                groep: groupValue,
                vakken: {}
              }
            }

            const vak = row['Vak']
            const vaardigheid = row['Vaardigheid']
            if (vak && vaardigheid) {
              if (!studentMap[studentKey].vakken[vak]) {
                studentMap[studentKey].vakken[vak] = []
              }

              // Add the test data
              const testData = {
                vaardigheid: vaardigheid,
                resultaten: {
                  resultaat: row['Resultaat'] || 'Niet beschikbaar',
                  niveau: row['Niveau'] || 'Niet beschikbaar',
                  score: row['Score'] || 'Niet beschikbaar',
                  afnamedatum: row['Afname st'] || 'Geen datum'
                }
              }

              // Check if we already have this vaardigheid for this vak
              const existingIndex = studentMap[studentKey].vakken[vak]
                .findIndex(v => v.vaardigheid === vaardigheid)

              if (existingIndex >= 0) {
                // Update only if the new test is more recent
                const existingDate = new Date(studentMap[studentKey].vakken[vak][existingIndex].resultaten.afnamedatum)
                const newDate = new Date(row['Afname st'])
                if (newDate > existingDate) {
                  studentMap[studentKey].vakken[vak][existingIndex] = testData
                }
              } else {
                // Add new vaardigheid
                studentMap[studentKey].vakken[vak].push(testData)
              }
            }
          }
        })

        console.log('Verwerkte studenten:', Object.values(studentMap));

        // Group by class
        Object.values(studentMap).forEach((student) => {
          const groupValue = student.groep
          if (!processedClasses[groupValue]) {
            processedClasses[groupValue] = []
          }
          processedClasses[groupValue].push(student)
        })

        console.log('Gegroepeerde klassen:', processedClasses);

        if (Object.keys(processedClasses).length === 0) {
          setError('Geen klassen gevonden. Controleer of het CSV-bestand de juiste kolommen bevat.')
          return
        }

        // Sort students within each class by name
        Object.keys(processedClasses).forEach(className => {
          processedClasses[className].sort((a, b) => a.naam.localeCompare(b.naam))
        })

        console.log('Verwerkte klassen:', processedClasses)
        setClasses(processedClasses)
        setStep(2)
      },
      header: true,
      skipEmptyLines: true,
      error: (error) => {
        console.error('CSV parsing error:', error)
        setError('Er is een fout opgetreden bij het verwerken van het CSV-bestand.')
      }
    })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0]
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile)
        setError(null)
      } else {
        setError('Selecteer alstublieft een geldig CSV-bestand.')
        setFile(null)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile.type === 'text/csv' || droppedFile.name.endsWith('.csv')) {
      setFile(droppedFile)
      setError(null)
    } else {
      setError('Alleen CSV-bestanden zijn toegestaan.')
      setFile(null)
    }
  }

  const handleNextStep = () => {
    if (file) {
      processCSV(file)
    }
  }

  const handleClassSelect = (className: string) => {
    setSelectedClass(className)
    setStep(3)
  }

  const handleReportSelect = (reportId: string) => {
    setSelectedReport(reportId)
    setStep(4)
  }

  const handleBackToReportSelection = () => {
    setStep(3)
    setSelectedReport(null)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Rapklaar Dashboard</CardTitle>
              <CardDescription>
                Upload een CSV-bestand met studentgegevens om te beginnen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  className={`relative flex flex-col items-center justify-center w-full h-64 ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
                  } border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                  >
                    <Upload className="w-16 h-16 mb-4 text-gray-400" />
                    <p className="mb-2 text-lg text-gray-500">
                      <span className="font-semibold">Klik om een bestand te kiezen</span>
                      {' '}of sleep het hierheen
                    </p>
                    <p className="text-sm text-gray-500">CSV-bestand (max. 10MB)</p>
                  </label>
                </div>

                {file && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                    <FileUp className="text-green-500 mr-2" />
                    <span className="text-green-700">Geselecteerd bestand: {file.name}</span>
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <AlertCircle className="text-red-500 mr-2" />
                    <span className="text-red-700">{error}</span>
                  </div>
                )}

                <Button onClick={handleNextStep} disabled={!file} className="w-full">
                  Volgende stap
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Stap 2: Selecteer een klas</CardTitle>
              <CardDescription>
                Kies de klas waarvoor u rapporten wilt maken
              </CardDescription>
            </CardHeader>
            <CardContent>
              {Object.keys(classes).length > 0 ? (
                <ClassSelection classes={classes} onClassSelect={handleClassSelect} />
              ) : (
                <div className="text-center p-4 text-gray-500">
                  Geen klassen gevonden in het CSV-bestand. Controleer of het bestand de juiste kolommen bevat.
                </div>
              )}
            </CardContent>
          </Card>
        )
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Stap 3: Selecteer een rapport</CardTitle>
              <CardDescription>
                Kies het rapport dat u wilt invullen voor {selectedClass}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportSelection onSelectReport={handleReportSelect} />
            </CardContent>
          </Card>
        )
      case 4:
        if (selectedClass && selectedReport) {
          if (selectedReport === 'alfa') {
            return (
              <ALFAReportForm 
                studentName={classes[selectedClass][0].naam} 
                className={selectedClass} 
                onBack={handleBackToReportSelection}
              />
            )
          } else {
            return (
              <Card>
                <CardHeader>
                  <CardTitle>Stap 4: Rapporten invullen voor {selectedClass}</CardTitle>
                  <CardDescription>
                    Vul {selectedReport} in voor de studenten van de geselecteerde klas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportForm 
                    students={classes[selectedClass]} 
                    reportType={selectedReport} 
                    onBack={handleBackToReportSelection}
                  />
                </CardContent>
              </Card>
            )
          }
        }
        return null
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {renderStep()}
    </div>
  )
}

