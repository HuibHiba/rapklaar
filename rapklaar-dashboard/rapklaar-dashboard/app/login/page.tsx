'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

// Lijst van gebruikers (in een echte applicatie zou dit van een API komen)
const users = [
  { email: 'hlt@hetstreek.nl', role: 'beheerder' },
  { email: 'ama@hetstreek.nl', role: 'docent' },
  { email: 'asa@hetstreek.nl', role: 'docent' },
  { email: 'bha@hetstreek.nl', role: 'docent' },
  { email: 'cba@hetstreek.nl', role: 'docent' },
  { email: 'cvg@hetstreek.nl', role: 'docent' },
  { email: 'dbo@hetstreek.nl', role: 'docent' },
  { email: 'dvs@hetstreek.nl', role: 'docent' },
  { email: 'ebe@hetstreek.nl', role: 'docent' },
  { email: 'een@hetstreek.nl', role: 'docent' },
  { email: 'fad@hetstreek.nl', role: 'docent' },
  { email: 'fja@hetstreek.nl', role: 'docent' },
  { email: 'fjn@hetstreek.nl', role: 'docent' },
  { email: 'gbl@hetstreek.nl', role: 'docent' },
  { email: 'gni@hetstreek.nl', role: 'docent' },
  { email: 'hve@hetstreek.nl', role: 'docent' },
  { email: 'jbl@hetstreek.nl', role: 'docent' },
  { email: 'jdn@hetstreek.nl', role: 'docent' },
  { email: 'jko@hetstreek.nl', role: 'docent' },
  { email: 'kpe@hetstreek.nl', role: 'docent' },
  { email: 'lah@hetstreek.nl', role: 'docent' },
  { email: 'lde@hetstreek.nl', role: 'docent' },
  { email: 'lti@hetstreek.nl', role: 'docent' },
  { email: 'lvn@hetstreek.nl', role: 'docent' },
  { email: 'mbe@hetstreek.nl', role: 'docent' },
  { email: 'mdl@hetstreek.nl', role: 'docent' },
  { email: 'mgi@hetstreek.nl', role: 'docent' },
  { email: 'mho@hetstreek.nl', role: 'docent' },
  { email: 'mro@hetstreek.nl', role: 'docent' },
  { email: 'mst@hetstreek.nl', role: 'docent' },
  { email: 'msu@hetstreek.nl', role: 'docent' },
  { email: 'mto@hetstreek.nl', role: 'docent' },
  { email: 'mvn@hetstreek.nl', role: 'docent' },
  { email: 'qab@hetstreek.nl', role: 'docent' },
  { email: 'sab@hetstreek.nl', role: 'docent' },
  { email: 'shn@hetstreek.nl', role: 'docent' },
  { email: 'tba@hetstreek.nl', role: 'docent' },
  { email: 'tiu@hetstreek.nl', role: 'docent' },
  { email: 'wdo@hetstreek.nl', role: 'docent' },
  { email: 'whs@hetstreek.nl', role: 'docent' },
  { email: 'wou@hetstreek.nl', role: 'docent' },
  { email: 'wve@hetstreek.nl', role: 'docent' },
  { email: 'wzi@hetstreek.nl', role: 'docent' },
  { email: 'yze@hetstreek.nl', role: 'docent' },
  { email: 'zna@hetstreek.nl', role: 'docent' },
]

// Functie om wachtwoord te genereren
const generatePassword = (email: string) => {
  const prefix = email.split('@')[0]
  return `${prefix}rapport1!`
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const user = users.find(u => u.email === email)
    if (user && password === generatePassword(email)) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userRole', user.role)
      router.push('/')
    } else {
      setError('Ongeldige inloggegevens')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in op uw account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welkom bij het Rapklaar dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-mailadres
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="E-mailadres"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Wachtwoord
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Wachtwoord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Onthoud mij
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Wachtwoord vergeten?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Inloggen
            </button>
          </div>
        </form>
        {error && (
          <p className="mt-2 text-center text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

