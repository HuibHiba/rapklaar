'use client'

import { useState, useEffect } from 'react'
import { Upload, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CSVUpload() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const role = localStorage.getItem('userRole')
    setUserRole(role)

    if (role !== 'beheerder') {
      router.push('/')
    }
  }, [])

  if (userRole !== 'beheerder') {
    return null // of een laadcomponent
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      if (file.type !== 'text/csv') {
        setError('Alleen CSV-bestanden zijn toegestaan.')
        setSelectedFile(null)
      } else {
        setSelectedFile(file)
        setError(null)
      }
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      // Hier zou je de logica voor het uploaden van het bestand implementeren
      // Voor nu simuleren we een succesvolle upload
      setTimeout(() => {
        setUploadStatus('Bestand succesvol geüpload!')
        setSelectedFile(null)
      }, 2000)
    } else {
      setError('Selecteer eerst een bestand om te uploaden.')
    }
  }

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">CSV-upload</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecteer CSV-bestand
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload een bestand</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".csv" />
                </label>
                <p className="pl-1">of sleep en zet neer</p>
              </div>
              <p className="text-xs text-gray-500">
                CSV tot 10MB
              </p>
            </div>
          </div>
        </div>
        {selectedFile && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">Geselecteerd bestand: {selectedFile.name}</p>
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 rounded-md flex items-center">
            <AlertCircle className="text-red-600 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        )}
        <div className="mt-4">
          <label htmlFor="class" className="block text-sm font-medium text-gray-700">
            Selecteer klas
          </label>
          <select
            id="class"
            name="class"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option>Alle klassen</option>
            <option>Klas 1A</option>
            <option>Klas 1B</option>
            <option>Klas 2A</option>
            <option>Klas 2B</option>
          </select>
        </div>
        <div className="mt-4">
          <button
            onClick={handleUpload}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload
          </button>
        </div>
        {uploadStatus && (
          <div className="mt-4 p-4 bg-green-100 rounded-md">
            <p className="text-green-700">{uploadStatus}</p>
          </div>
        )}
      </div>
    </>
  )
}

