import { useState } from 'react'
import { UserCircle, Bell, Settings, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userRole')
    router.push('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-full px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            {/* Logo is removed */}
          </div>
          <div className="flex items-center">
            <div className="ml-3 relative">
              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-[#5BA4C1] hover:bg-gray-100 rounded-md"
                >
                  <LogOut size={16} className="mr-2" />
                  Uitloggen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

