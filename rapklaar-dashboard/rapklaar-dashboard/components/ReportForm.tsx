'use client'

import { useState, useCallback } from 'react'
import { ChevronDown, ChevronUp, Eye, Save } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Schuifknop from './Schuifknop'
import { Card, CardContent } from "@/components/ui/card"

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

interface ReportFormProps {
  students: Student[]
  reportType: string
}

export default function ReportForm({ students, reportType }: ReportFormProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [scores, setScores] = useState<{ [key: string]: number }>({})

  const handleScoreChange = useCallback((vaardigheid: string, score: number) => {
    setScores(prevScores => ({
      ...prevScores,
      [vaardigheid]: score
    }))
  }, [])

  const handleSave = useCallback(() => {
    if (selectedStudent) {
      console.log('Opgeslagen scores voor', selectedStudent.naam, scores)
      // Hier zou je normaal gesproken de scores naar een backend sturen
      alert('Rapport opgeslagen!')
    }
  }, [selectedStudent, scores])

  const togglePreview = useCallback(() => {
    setShowPreview(prev => !prev)
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">{reportType}</h2>
      <Accordion type="single" collapsible className="w-full">
        {students.map((student) => (
          <AccordionItem key={student.id} value={student.id}>
            <AccordionTrigger 
              className="hover:no-underline"
              onClick={() => setSelectedStudent(student)}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-base font-medium">{student.naam}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 pb-2">
                {Object.entries(student.vakken).map(([vakNaam, vaardigheden]) => (
                  <div key={vakNaam} className="mb-6">
                    <h3 className="text-base font-semibold bg-gray-100 text-gray-800 px-3 py-1 rounded mb-3">
                      {vakNaam}
                    </h3>
                    <div className="space-y-3">
                      {vaardigheden.map((vaardigheid, index) => (
                        <div key={index} className="ml-3">
                          <div className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded inline-block mb-2">
                            {vaardigheid.vaardigheid}
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex">
                              <span className="font-medium">Resultaat:</span>
                              <span className="ml-2 bg-gray-200 text-gray-800 px-2 rounded">
                                {vaardigheid.resultaten.resultaat || 'Niet beschikbaar'}
                              </span>
                            </div>
                            <div className="flex">
                              <span className="font-medium">Niveau:</span>
                              <span className="ml-2 bg-gray-200 text-gray-800 px-2 rounded">
                                {vaardigheid.resultaten.niveau || 'Niet beschikbaar'}
                              </span>
                            </div>
                            <div className="flex">
                              <span className="font-medium">Score:</span>
                              <span className="ml-2 bg-gray-200 text-gray-800 px-2 rounded">
                                {vaardigheid.resultaten.score || 'Niet beschikbaar'}
                              </span>
                            </div>
                            <div className="flex">
                              <span className="font-medium">Afnamedatum:</span>
                              <span className="ml-2 bg-gray-200 text-gray-800 px-2 rounded">
                                {vaardigheid.resultaten.afnamedatum || 'Geen datum'}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Schuifknop
                              onChange={(value) => handleScoreChange(vaardigheid.vaardigheid, value)}
                              initialValue={scores[vaardigheid.vaardigheid] || 0}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <Button onClick={togglePreview}>
                    <Eye className="mr-2 h-4 w-4" /> {showPreview ? 'Verberg' : 'Toon'} Preview
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" /> Opslaan
                  </Button>
                </div>
                {showPreview && (
                  <Card className="mt-4">
                    <CardContent>
                      <h4 className="font-semibold mb-2">Rapport Preview</h4>
                      {Object.entries(scores).map(([vaardigheid, score]) => (
                        <p key={vaardigheid}>{vaardigheid}: {score}</p>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

