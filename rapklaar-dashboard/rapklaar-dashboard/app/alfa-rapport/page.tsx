'use client'

import ALFAReportForm from '../../components/ALFAReportForm'

export default function ALFAReportPage() {
  // Mock student data
  const student = {
    naam: "Jan Jansen",
    klas: "ALFA 1"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">ALFA Rapport</h1>
      <ALFAReportForm studentName={student.naam} className={student.klas} />
    </div>
  )
}

