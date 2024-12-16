'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, Plus, HelpCircle, Search } from 'lucide-react'
import { Tooltip } from '@/components/ui/tooltip'
import { MainContainer } from '@/components/MainContainer'
import { Breadcrumb } from '@/components/Breadcrumb'

interface User {
  id: number
  name: string
  email: string
  role: string
}

export default function Gebruikersbeheer() {
  const [users, setUsers] = useState<User[]>([])
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'Docent' })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError('Er is een fout opgetreden bij het ophalen van de gebruikers.')
    } finally {
      setIsLoading(false)
    }
  }

  const updateUsers = async (updatedUsers: User[]) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUsers),
      })
      if (!response.ok) {
        throw new Error('Failed to update users')
      }
    } catch (err) {
      setError('Er is een fout opgetreden bij het bijwerken van de gebruikers.')
    }
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    const id = Math.max(...users.map(u => u.id), 0) + 1
    const updatedUsers = [...users, { id, ...newUser }]
    setUsers(updatedUsers)
    await updateUsers(updatedUsers)
    setShowAddUser(false)
    setNewUser({ name: '', email: '', password: '', role: 'Docent' })
  }

  const handleDeleteUser = async (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id)
    setUsers(updatedUsers)
    await updateUsers(updatedUsers)
  }

  const handleRoleChange = async (id: number, newRole: string) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, role: newRole } : user
    )
    setUsers(updatedUsers)
    await updateUsers(updatedUsers)
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return <MainContainer>Laden...</MainContainer>
  }

  if (error) {
    return <MainContainer><div className="text-red-500">{error}</div></MainContainer>
  }

  return (
    <MainContainer>
      <Breadcrumb items={[
        { label: 'Dashboard', href: '/' },
        { label: 'Gebruikersbeheer' }
      ]} />

      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Gebruikersbeheer</h1>

      {/* Zoekbalk */}
      <div className="mb-4 flex items-center">
        <Search className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Zoek gebruikers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-full max-w-md text-lg"
        />
      </div>

      <Tooltip content="Klik hier om een nieuwe gebruiker toe te voegen">
        <button
          onClick={() => setShowAddUser(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg mb-6 flex items-center text-lg"
        >
          <Plus size={24} className="mr-2" />
          Nieuwe gebruiker toevoegen
        </button>
      </Tooltip>

      {/* Instructietekst */}
      <p className="text-gray-600 mb-4 text-lg">
        Hieronder vindt u een lijst van alle gebruikers. U kunt hun gegevens bewerken of verwijderen met de knoppen aan de rechterkant.
      </p>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Naam</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Acties</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-lg">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-lg">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-lg">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
                  >
                    <option value="Docent">Docent</option>
                    <option value="Beheerder">Beheerder</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg font-medium">
                  <Tooltip content="Bewerk gebruiker">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Pencil size={24} />
                    </button>
                  </Tooltip>
                  <Tooltip content="Verwijder gebruiker">
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteUser(user.id)}>
                      <Trash2 size={24} />
                    </button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Help sectie */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <HelpCircle className="mr-2" /> Hulp nodig?
        </h2>
        <p className="text-lg">
          Als u vragen heeft over het gebruik van deze pagina, kunt u contact opnemen met de IT-ondersteuning via support@hetstreek.nl of bel naar 0123-456789.
        </p>
      </div>

      {showAddUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Nieuwe gebruiker toevoegen</h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Naam</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mailadres</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Wachtwoord</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
                <select
                  id="role"
                  name="role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="Beheerder">Beheerder</option>
                  <option value="Docent">Docent</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setShowAddUser(false)} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                  Annuleren
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Toevoegen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainContainer>
  )
}

