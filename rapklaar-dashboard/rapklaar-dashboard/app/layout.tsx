'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { BackgroundPattern } from '../components/BackgroundPattern'

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      const role = localStorage.getItem('userRole')
      setIsLoggedIn(loggedIn)
      setUserRole(role)

      if (!loggedIn && pathname !== '/login' && pathname !== '/forgot-password') {
        router.push('/login')
      }
    }

    checkAuth()
    window.addEventListener('storage', checkAuth)

    return () => {
      window.removeEventListener('storage', checkAuth)
    }
  }, [pathname, router])

  if (!isLoggedIn && pathname !== '/login' && pathname !== '/forgot-password') {
    return null // of een laadcomponent
  }

  return (
    <html lang="nl">
      <body>
        <BackgroundPattern />
        {isLoggedIn ? (
          <div className="flex h-screen bg-gray-100">
            <Sidebar userRole={userRole} />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Navbar />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div className="container mx-auto px-6 py-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  )
}

