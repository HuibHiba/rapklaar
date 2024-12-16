import { useState } from 'react'
import Papa from 'papaparse'

interface CSVUploadProps {
  onDataProcessed: (data: any[]) => void
}

export default function CSVUpload({ onDataProcessed }: CSVUploadProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const processedData = result.data.map((row: any) => ({
            ...row,
            groep: row.groep || ''  // Gebruik de 'groep' kolom voor klasinformatie
          }))
          onDataProcessed(processedData)
        },
        header: true,
        skipEmptyLines: true,
      })
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        disabled={!file}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Upload en verwerk CSV
      </button>
    </div>
  )
}

