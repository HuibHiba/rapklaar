'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

interface KlasSelectorProps {
  klassen: string[]
  onSelectKlas: (klas: string) => void
}

const KlasSelector: React.FC<KlasSelectorProps> = ({ klassen, onSelectKlas }) => {
  const [selectedKlas, setSelectedKlas] = useState<string | null>(null)

  const handleKlasSelect = (klas: string) => {
    setSelectedKlas(klas)
    onSelectKlas(klas)
  }

  if (klassen.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Er zijn geen klassen gevonden in het geüploade bestand.</p>
        <p className="text-sm text-gray-500 mt-2">
          Controleer of het CSV-bestand een kolom &quot;klas&quot; bevat met klasgegevens.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {klassen.map((klas) => (
        <button
          key={klas}
          onClick={() => handleKlasSelect(klas)}
          className={`relative flex items-center p-4 rounded-lg transition-all duration-200 ${
            selectedKlas === klas
              ? 'bg-blue-100 border-2 border-blue-500 shadow-md'
              : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }`}
        >
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{klas}</h3>
            <p className="text-sm text-gray-600">{klas.split(' - ')[1]}</p>
          </div>
          {selectedKlas === klas && (
            <div className="absolute right-4">
              <Check className="w-5 h-5 text-blue-500" />
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

export default KlasSelector

