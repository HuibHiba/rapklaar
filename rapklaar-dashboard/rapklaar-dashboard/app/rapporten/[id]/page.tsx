'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowLeft, Download } from 'lucide-react'
import { MainContainer } from '@/components/MainContainer'
import { Breadcrumb } from '@/components/Breadcrumb'

interface Student {
  id: string
  naam: string
  klas: string
  [key: string]: string | number
}

export default function Rapport() {
  const params = useParams()
  const router = useRouter()
  const [rapport, setRapport] = useState<{ id: number; naam: string; inhoud: string } | null>(null)
  const [studenten, setStudenten] = useState<Student[]>([])

  useEffect(() => {
    const rapportId = Number(params.id)
    // Normaal gesproken zou je hier een API-call doen om het rapport op te halen
    const dummyRapport = { id: rapportId, naam: `Rapport ${rapportId}`, inhoud: `Inhoud van rapport ${rapportId}...` }
    setRapport(dummyRapport)

    // Haal de opgeslagen studentengegevens op uit localStorage
    const storedStudenten = localStorage.getItem('studenten')
    if (storedStudenten) {
      setStudenten(JSON.parse(storedStudenten))
    }
  }, [params.id])

  if (!rapport) {
    return <MainContainer>Rapport niet gevonden</MainContainer>
  }

  return (
    <MainContainer>
      <Breadcrumb items={[
        { label: 'Dashboard', href: '/' },
        { label: 'Rapporten', href: '/rapporten' },
        { label: rapport.naam }
      ]} />

      <div className="mb-6 flex justify-between items-center">
        <button 
          onClick={() => router.back()} 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <ArrowLeft className="mr-2" size={16} />
          Terug
        </button>
        <h1 className="text-2xl font-bold">{rapport.naam}</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <Download className="mr-2" size={16} />
          Download PDF
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div dangerouslySetInnerHTML={{ __html: rapport.inhoud }} />
        
        <h2 className="text-xl font-semibold mt-6 mb-4">Studentengegevens</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Naam</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Klas</th>
              {/* Voeg hier meer kolomkoppen toe op basis van de beschikbare gegevens */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {studenten.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">{student.naam}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.klas}</td>
                {/* Voeg hier meer cellen toe op basis van de beschikbare gegevens */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainContainer>
  )
}

