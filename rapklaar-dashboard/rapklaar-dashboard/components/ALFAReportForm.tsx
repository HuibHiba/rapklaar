import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Schuifknop from './Schuifknop'
import { Star, Printer, ArrowLeft } from 'lucide-react'

interface ALFAReportFormProps {
  studentName: string
  className: string
  onBack: () => void
}

const WorkAttitudeItems = [
  "Komt op tijd",
  "Praat Nederlands in de klas",
  "Gebruikt weinig eigen taal",
  "Toont respect naar de leerkracht",
  "Toont respect naar de leerlingen",
  "Concentreert zich",
  "Toont inzet",
  "Houdt zich aan afspraken",
  "Maakt het huiswerk",
  "Helpt anderen",
  "Is zelfstandig",
  "Kan samenwerken",
  "Werkt netjes"
]

const LanguageSkills = ["Technisch Lezen", "Functioneel Lezen", "Technisch Schrijven", "Functioneel Schrijven"]
const LanguageLevels = ["A0", "Alfa A", "Alfa B", "Alfa C"]

const MathLevels = ["0", "1F", "2F"]

const ALFAReportForm: React.FC<ALFAReportFormProps> = ({ studentName, className, onBack }) => {
  const [workAttitude, setWorkAttitude] = useState<{[key: string]: number}>({})
  const [languageSkills, setLanguageSkills] = useState<{[key: string]: number}>({})
  const [mathSkill, setMathSkill] = useState<number>(0)
  const [report, setReport] = useState<string>("")
  const [schoolYear, setSchoolYear] = useState<string>("2024-2025")
  const [date, setDate] = useState<string>("")
  const [savedReports, setSavedReports] = useState<any[]>([])
  const [selectedReport, setSelectedReport] = useState<any | null>(null)

  useEffect(() => {
    const storedReports = localStorage.getItem('alfaReports')
    if (storedReports) {
      setSavedReports(JSON.parse(storedReports))
    }
  }, [])

  const handleWorkAttitudeChange = (item: string, value: number) => {
    setWorkAttitude(prev => ({ ...prev, [item]: value }))
  }

  const handleLanguageSkillChange = (skill: string, value: number) => {
    setLanguageSkills(prev => ({ ...prev, [skill]: value }))
  }

  const handleSave = () => {
    const newReport = {
      id: Date.now(),
      studentName,
      className,
      schoolYear,
      date,
      workAttitude,
      languageSkills,
      mathSkill,
      report
    }
    const updatedReports = [...savedReports, newReport]
    setSavedReports(updatedReports)
    localStorage.setItem('alfaReports', JSON.stringify(updatedReports))
    alert("Rapport is opgeslagen en kan nu worden teruggevonden in de lijst met opgeslagen rapporten.")
  }

  const handleLoadReport = (loadedReport: any) => {
    setSelectedReport(loadedReport)
    setWorkAttitude(loadedReport.workAttitude)
    setLanguageSkills(loadedReport.languageSkills)
    setMathSkill(loadedReport.mathSkill)
    setReport(loadedReport.report)
    setSchoolYear(loadedReport.schoolYear)
    setDate(loadedReport.date)
  }

  const handlePrint = () => {
    if (!selectedReport) {
      alert("Selecteer eerst een rapport om te printen.")
      return
    }

    const printContent = `
      <html>
        <head>
          <title>ALFA Rapport - ${selectedReport.studentName}</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #333; }
            .section { margin-bottom: 20px; }
            .skill { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>ALFA Rapport</h1>
          <div class="section">
            <p><strong>Naam leerling:</strong> ${selectedReport.studentName}</p>
            <p><strong>Klas:</strong> ${selectedReport.className}</p>
            <p><strong>Schooljaar:</strong> ${selectedReport.schoolYear}</p>
            <p><strong>Datum:</strong> ${selectedReport.date}</p>
          </div>
          <div class="section">
            <h2>Werkhouding en sociale ontwikkeling</h2>
            ${Object.entries(selectedReport.workAttitude).map(([item, value]) => `
              <p>${item}: ${'★'.repeat(value as number)}${'☆'.repeat(5 - (value as number))}</p>
            `).join('')}
          </div>
          <div class="section">
            <h2>Taalvaardigheid</h2>
            ${Object.entries(selectedReport.languageSkills).map(([skill, value]) => `
              <div class="skill">
                <p><strong>${skill}:</strong> ${value}/30</p>
              </div>
            `).join('')}
          </div>
          <div class="section">
            <h2>Rekenvaardigheid</h2>
            <p>${selectedReport.mathSkill}/20</p>
          </div>
          <div class="section">
            <h2>Verslag</h2>
            <p>${selectedReport.report}</p>
          </div>
        </body>
      </html>
    `

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    } else {
      alert("Kan het printvenster niet openen. Controleer of pop-ups zijn toegestaan.")
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>ALFA Rapport</span>
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar rapportselectie
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input value={studentName} readOnly label="Naam leerling" />
          <Input value={className} readOnly label="Klas" />
          <Input value={schoolYear} onChange={(e) => setSchoolYear(e.target.value)} label="Schooljaar" />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} label="Datum" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Werkhouding en sociale ontwikkeling</CardTitle>
            <p className="text-sm text-gray-500">1 ster is slecht, 5 sterren is perfect</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {WorkAttitudeItems.map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <span>{item}</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Button
                        key={value}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleWorkAttitudeChange(item, value)}
                      >
                        <Star className={`h-4 w-4 ${value <= (workAttitude[item] || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taalvaardigheid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {LanguageSkills.map((skill) => (
                <div key={skill} className="space-y-2">
                  <h3 className="font-semibold">{skill}</h3>
                  <Schuifknop
                    onChange={(value) => handleLanguageSkillChange(skill, value)}
                    initialValue={languageSkills[skill] || 0}
                    min={0}
                    max={30}
                    step={1}
                    labels={LanguageLevels}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rekenvaardigheid</CardTitle>
          </CardHeader>
          <CardContent>
            <Schuifknop
              onChange={(value) => setMathSkill(value)}
              initialValue={mathSkill}
              min={0}
              max={20}
              step={1}
              labels={MathLevels}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verslag</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={report}
              onChange={(e) => setReport(e.target.value)}
              rows={6}
              placeholder="Schrijf hier het verslag..."
            />
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full">Rapport Opslaan</Button>

        <Card>
          <CardHeader>
            <CardTitle>Opgeslagen Rapporten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {savedReports.map((savedReport) => (
                <Button
                  key={savedReport.id}
                  onClick={() => handleLoadReport(savedReport)}
                  variant="outline"
                  className="w-full justify-start"
                >
                  {savedReport.studentName} - {savedReport.date}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedReport && (
          <Card>
            <CardHeader>
              <CardTitle>Geselecteerd Rapport</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Student: {selectedReport.studentName}</p>
              <p>Klas: {selectedReport.className}</p>
              <p>Datum: {selectedReport.date}</p>
              <p>Schooljaar: {selectedReport.schoolYear}</p>
              <Button onClick={handlePrint} className="mt-4">
                <Printer className="mr-2 h-4 w-4" />
                Print Rapport
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

export default ALFAReportForm

