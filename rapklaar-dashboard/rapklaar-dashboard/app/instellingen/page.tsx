'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Instellingen() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem('userRole')
    setUserRole(role)

    if (role !== 'beheerder') {
      router.push('/')
    }
  }, [router])

  if (userRole !== 'beheerder') {
    return null // of een laadcomponent
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Instellingen</h1>
      <p>Deze pagina is momenteel in ontwikkeling. Hier komen binnenkort instellingsopties.</p>
    </div>
  )
}

