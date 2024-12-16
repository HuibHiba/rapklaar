'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const rapporten = [
  { id: '1', naam: 'Rapport 1' },
  { id: '2', naam: 'Rapport 2' },
  { id: '3', naam: 'Rapport 3' },
]

export default function KlasRapportSelectie() {
  const params = useParams()
  const router = useRouter()
  const [klasNaam, setKlasNaam] = useState('')

  useEffect(() => {
    // Hier zou je normaal gesproken de klasnaam ophalen op basis van het ID
    setKlasNaam(`Klas ${params.id}`)
  }, [params.id])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Selecteer een rapport voor {klasNaam}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rapporten.map((rapport) => (
          <Link
            key={rapport.id}
            href={`/klas/${params.id}/rapport/${rapport.id}`}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold">{rapport.naam}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

