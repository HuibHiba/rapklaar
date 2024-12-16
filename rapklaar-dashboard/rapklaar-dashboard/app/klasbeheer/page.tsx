'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Klas {
  id: number
  naam: string
  aantalLeerlingen: number
}

export default function Klasbeheer() {
  const [klassen, setKlassen] = useState<Klas[]>([])
  const router = useRouter()

  useEffect(() => {
    // Simuleer het ophalen van klassen
    const dummyKlassen: Klas[] = [
      { id: 1, naam: 'Klas 1A', aantalLeerlingen: 25 },
      { id: 2, naam: 'Klas 1B', aantalLeerlingen: 23 },
      { id: 3, naam: 'Klas 2A', aantalLeerlingen: 22 },
    ]
    setKlassen(dummyKlassen)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Klasbeheer</h1>
      <Link href="/klasbeheer/nieuwe-klas" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4 inline-block">
        Nieuwe Klas Aanmaken
      </Link>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Klas</th>
              <th className="py-3 px-6 text-left">Aantal Leerlingen</th>
              <th className="py-3 px-6 text-center">Acties</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {klassen.map((klas) => (
              <tr key={klas.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{klas.naam}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>{klas.aantalLeerlingen}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <Link href={`/klasbeheer/bewerk/${klas.id}`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </Link>
                    <button onClick={() => {/* Implementeer verwijderen */}} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

