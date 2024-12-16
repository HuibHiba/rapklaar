import Link from 'next/link'
import { Users, Upload, FileText, BarChart, UserPlus, BookOpen, User } from 'lucide-react'

interface SidebarProps {
  userRole: string | null
}

export default function Sidebar({ userRole }: SidebarProps) {
  const isAdmin = userRole === 'beheerder'
  const isTeacher = userRole === 'docent'

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        {(isAdmin || isTeacher) && (
          <Link href="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
            <BarChart className="inline-block mr-2" size={20} />
            Dashboard
          </Link>
        )}
        {isAdmin && (
          <>
            <Link href="/gebruikersbeheer" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
              <Users className="inline-block mr-2" size={20} />
              Gebruikersbeheer
            </Link>
            <Link href="/csv-upload" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
              <Upload className="inline-block mr-2" size={20} />
              CSV-upload
            </Link>
            <Link href="/gebruikersbeheer/nieuwe-gebruiker" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
              <UserPlus className="inline-block mr-2" size={20} />
              Nieuwe Gebruiker
            </Link>
            <Link href="/klasbeheer" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
              <BookOpen className="inline-block mr-2" size={20} />
              Klasbeheer
            </Link>
          </>
        )}
        {isAdmin && (
          <Link href="/profiel" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
            <User className="inline-block mr-2" size={20} />
            Mijn Profiel
          </Link>
        )}
        {(isAdmin || isTeacher) && (
          <Link href="/rapporten" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
            <FileText className="inline-block mr-2" size={20} />
            Rapporten
          </Link>
        )}
      </nav>
    </div>
  )
}

