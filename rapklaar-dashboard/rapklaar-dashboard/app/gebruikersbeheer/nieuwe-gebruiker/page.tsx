'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NieuweGebruiker() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('docent')
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem('userRole')
    if (userRole !== 'beheerder') {
      router.push('/')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Hier zou je normaal gesproken een API call maken om de nieuwe gebruiker aan te maken
    console.log('Nieuwe gebruiker aangemaakt:', { name, email, password, role })
    // Reset form
    setName('')
    setEmail('')
    setPassword('')
    setRole('docent')
    // Redirect naar gebruikersbeheer
    router.push('/gebruikersbeheer')
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Nieuwe Gebruiker Aanmaken</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Naam</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Wachtwoord</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="role" className="block mb-1">Rol</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="docent">Docent</option>
            <option value="beheerder">Beheerder</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Gebruiker Aanmaken
        </button>
      </form>
    </div>
  )
}

