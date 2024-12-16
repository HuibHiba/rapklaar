'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  name: string
  email: string
  role: string
}

export default function Profiel() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Simuleer het ophalen van gebruikersgegevens
    const dummyUser: User = {
      name: 'Jan Jansen',
      email: 'jan.jansen@example.com',
      role: 'docent'
    }
    setUser(dummyUser)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Hier zou je normaal gesproken een API call maken om de gebruikersgegevens bij te werken
    console.log('Gebruikersgegevens bijgewerkt:', user)
    // Toon een bevestigingsbericht aan de gebruiker
    alert('Uw profiel is bijgewerkt!')
  }

  if (!user) {
    return <div>Laden...</div>
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Mijn Profiel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Naam</label>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">E-mail</label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="role" className="block mb-1">Rol</label>
          <input
            type="text"
            id="role"
            value={user.role}
            readOnly
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Profiel Bijwerken
        </button>
      </form>
    </div>
  )
}

