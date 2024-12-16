'use client'

import { useState } from 'react'
import { Upload, AlertCircle, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Papa from 'papaparse'

interface Student {
  id: string
  naam: string
  klas: string
  [key: string]: string | number
}

interface DataInputProps {
  onDataUploaded: (data: Student[], klassen: string[]) => void
}

export default function DataInput({ onDataUploaded }: DataInputProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [manualData, setManualData] = useState('')
  const [isManualInputOpen, setIsManualInputOpen] = useState(false)

  const processData = (data: string[][]) => {
    if (data.length > 0) {
      const headers = data[0]
      const students: Student[] = data.slice(1).map(row => {
        const student: Student = { id: '', naam: '', klas: '' }
        headers.forEach((header, index) => {
          student[header.toLowerCase()] = row[index]
        })
        return student
      })
      const klassen = [...new Set(students.map(s => s.klas))].filter(Boolean)
      onDataUploaded(students, klassen)
      setError(null)
    } else {
      setError('Geen geldige gegevens gevonden.')
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0]
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile)
        setError(null)
      } else {
        setError('Selecteer alstublieft een geldig CSV-bestand.')
        setFile(null)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile.type === 'text/csv' || droppedFile.name.endsWith('.csv')) {
      setFile(droppedFile)
      setError(null)
    } else {
      setError('Alleen CSV-bestanden zijn toegestaan.')
      setFile(null)
    }
  }

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          processData(result.data as string[][])
        },
        error: (error) => {
          setError(`Fout bij het verwerken van het bestand: ${error.message}`)
        }
      })
    } else {
      setError('Selecteer eerst een bestand om te uploaden.')
    }
  }

  const handleManualSubmit = () => {
    const rows = manualData.split('\n').map(row => row.split(',').map(cell => cell.trim()))
    processData(rows)
    setIsManualInputOpen(false)
  }

  return (
    <div className="space-y-4">
      <div 
        className={`flex items-center justify-center w-full ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
        } border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label htmlFor="csv-upload" className="flex flex-col items-center justify-center w-full h-64 cursor-pointer">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Klik om een bestand te kiezen</span> of sleep het hierheen
            </p>
            <p className="text-xs text-gray-500">CSV-bestand (max. 10MB)</p>
          </div>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {file && (
        <div className="flex items-center text-sm text-gray-600">
          <p>Geselecteerd bestand: {file.name}</p>
        </div>
      )}

      {error && (
        <div className="flex items-center p-4 text-sm text-red-800 bg-red-100 rounded-lg">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <div className="flex justify-between">
        <Button onClick={handleUpload} disabled={!file}>
          Upload CSV
        </Button>
        <Dialog open={isManualInputOpen} onOpenChange={setIsManualInputOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Handmatige invoer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Handmatige gegevensinvoer</DialogTitle>
              <DialogDescription>
                Voer de gegevens in CSV-formaat in. Gebruik komma&apos;s om kolommen te scheiden en nieuwe regels voor rijen.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Textarea
                value={manualData}
                onChange={(e) => setManualData(e.target.value)}
                placeholder="id,naam,klas,vak,score
1,Jan Jansen,1A,Nederlands,8
2,Piet Pietersen,1B,Wiskunde,7"
                className="h-40"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleManualSubmit}>Gegevens verwerken</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

