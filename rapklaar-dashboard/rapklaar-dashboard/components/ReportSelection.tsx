import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ReportSelectionProps {
  onSelectReport: (reportType: string) => void
}

const reports = [
  { id: 'rapport1', name: 'Rapport 1', description: 'Eerste rapport van het schooljaar' },
  { id: 'rapport2', name: 'Rapport 2', description: 'Tweede rapport van het schooljaar' },
  { id: 'rapport3', name: 'Rapport 3', description: 'Eindrapport van het schooljaar' },
  { id: 'alfa', name: 'ALFA Rapport', description: 'Speciaal rapport voor ALFA-studenten' },
]

export default function ReportSelection({ onSelectReport }: ReportSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reports.map((report) => (
        <Card key={report.id} className="flex flex-col">
          <CardHeader className="flex-1">
            <CardTitle className="text-xl mb-2">{report.name}</CardTitle>
            <CardDescription className="text-sm">{report.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button onClick={() => onSelectReport(report.id)} className="w-full bg-black hover:bg-gray-800">
              Selecteer
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

