'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Schuifknop from '../../../../components/Schuifknop'

interface Student {
  id: string
  naam: string
  scores: {
    [key: string]: number
  }
}

export default function RapportInvullen() {
  const params = useParams()
  const router = useRouter()
  const [klasNaam, setKlasNaam] = useState('')
  const [rapportNaam, setRapportNaam] = useState('')
  const [studenten, setStudenten] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [sprekenScore, setSprekenScore] = useState(0)
  const [schrijvenScore, setSchrijvenScore] = useState(0)

  useEffect(() => {
    // Hier zou je normaal gesproken de klas- en rapportnaam ophalen op basis van de IDs
    setKlasNaam(`Klas ${params.klasId}`)
    setRapportNaam(`Rapport ${params.rapportId}`)

    // Hier zou je normaal gesproken de studentengegevens ophalen uit de CSV
    const dummyStudenten: Student[] = [
      { id: '1', naam: 'Jan Jansen', scores: { lezen: 80, luisteren: 75 } },
      { id: '2', naam: 'Piet Pietersen', scores: { lezen: 70, luisteren: 85 } },
    ]
    setStudenten(dummyStudenten)
  }, [params.klasId, params.rapportId])

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student)
    // Reset scores when selecting a new student
    setSprekenScore(0)
    setSchrijvenScore(0)
  }

  const handleSave = () => {
    if (selectedStudent) {
      // Hier zou je normaal gesproken de gegevens opslaan (lokaal of naar een server)
      console.log('Opgeslagen:', {
        student: selectedStudent,
        spreken: sprekenScore,
        schrijven: schrijvenScore,
      })
      alert('Gegevens opgeslagen!')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{rapportNaam} voor {klasNaam}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Selecteer een student</h2>
          <ul className="space-y-2">
            {studenten.map((student) => (
              <li
                key={student.id}
                className={`p-2 rounded cursor-pointer ${
                  selectedStudent?.id === student.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleStudentSelect(student)}
              >
                {student.naam}
              </li>
            ))}
          </ul>
        </div>
        {selectedStudent && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Rapport voor {selectedStudent.naam}</h2>
            <div className="space-y-4">
              {Object.entries(selectedStudent.scores).map(([vaardigheid, score]) => (
                <div key={vaardigheid}>
                  <h3 className="font-medium">{vaardigheid}</h3>
                  <p>{score}</p>
                </div>
              ))}
              <div>
                <h3 className="font-medium">Spreken</h3>
                <Schuifknop onChange={setSprekenScore} />
              </div>
              <div>
                <h3 className="font-medium">Schrijven</h3>
                <Schuifknop onChange={setSchrijvenScore} />
              </div>
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Opslaan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

