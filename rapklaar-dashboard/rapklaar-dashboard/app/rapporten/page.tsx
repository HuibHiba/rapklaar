'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Download } from 'lucide-react'
import { CSVUpload } from '@/components/CSVUpload'
import { MainContainer } from '@/components/MainContainer'
import { Breadcrumb } from '@/components/Breadcrumb'

interface Student {
  id: string
  naam: string
  klas: string
  [key: string]: string | number
}

export default function Rapporten() {
  const [studenten, setStudenten] = useState<Student[]>([])
  const [rapporten, setRapporten] = useState<{ id: number; naam: string; beschrijving: string }[]>([])

  useEffect(() => {
    // Haal de opgeslagen studentengegevens op uit localStorage
    const storedStudenten = localStorage.getItem('studenten')
    if (storedStudenten) {
      setStudenten(JSON.parse(storedStudenten))
    }

    // Stel enkele voorbeeldrapporten in
    setRapporten([
      { id: 1, naam: 'Rapport 1', beschrijving: 'Beschrijving van rapport 1' },
      { id: 2, naam: 'Rapport 2', beschrijving: 'Beschrijving van rapport 2' },
      { id: 3, naam: 'Rapport 3', beschrijving: 'Beschrijving van rapport 3' },
    ])
  }, [])

  const handleDataProcessed = (data: any[]) => {
    const processedStudenten = data.map((row, index) => ({
      id: (index + 1).toString(),
      naam: row.naam || '',
      klas: row.klas || '',
      ...row
    }))
    setStudenten(processedStudenten)
    localStorage.setItem('studenten', JSON.stringify(processedStudenten))
  }

  return (
    <MainContainer>
      <Breadcrumb items={[
        { label: 'Dashboard', href: '/' },
        { label: 'Rapporten' }
      ]} />

      <h1 className="text-2xl font-bold mb-6">Rapporten</h1>

      {studenten.length === 0 ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload CSV met studentengegevens</h2>
          <CSVUpload onDataProcessed={handleDataProcessed} />
        </div>
      ) : (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Studentengegevens geladen</h2>
          <p>Er zijn {studenten.length} studenten geladen. U kunt nu rapporten genereren.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rapporten.map((rapport) => (
          <div key={rapport.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{rapport.naam}</h2>
            <p className="text-gray-600 mb-4">{rapport.beschrijving}</p>
            <div className="flex justify-between">
              <Link 
                href={`/rapporten/${rapport.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <FileText className="mr-2" size={16} />
                Bekijk
              </Link>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <Download className="mr-2" size={16} />
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </MainContainer>
  )
}

