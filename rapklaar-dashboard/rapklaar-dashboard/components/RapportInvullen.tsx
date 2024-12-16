import React, { useState } from 'react'
import Schuifknop from './Schuifknop'

interface Student {
  id: string
  naam: string
  [key: string]: string | number
}

interface RapportInvullenProps {
  klasId: string
  rapportId: string
  onBack: () => void
  studenten: Student[]
}

const RapportInvullen: React.FC<RapportInvullenProps> = ({ klasId, rapportId, onBack, studenten }) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [sprekenScore, setSprekenScore] = useState(0)
  const [schrijvenScore, setSchrijvenScore] = useState(0)

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
    <div>
      <h1 className="text-2xl font-bold mb-6">Rapport {rapportId} voor Klas {klasId}</h1>
      <button
        onClick={onBack}
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Terug naar rapportselectie
      </button>
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
              {Object.entries(selectedStudent).map(([key, value]) => {
                if (key !== 'id' && key !== 'naam' && key !== 'klas') {
                  return (
                    <div key={key}>
                      <h3 className="font-medium">{key}</h3>
                      <p>{value}</p>
                    </div>
                  )
                }
                return null
              })}
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

export default RapportInvullen

