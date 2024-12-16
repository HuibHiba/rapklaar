import React from 'react'

interface Klas {
  id: string
  naam: string
}

interface KlassenLijstProps {
  klassen: Klas[]
  onSelectKlas: (klasId: string) => void
  selectedKlas: string | null
}

const KlassenLijst: React.FC<KlassenLijstProps> = ({ klassen, onSelectKlas, selectedKlas }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {klassen.map((klas) => (
        <button
          key={klas.id}
          onClick={() => onSelectKlas(klas.id)}
          className={`bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 text-left ${
            selectedKlas === klas.id ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <h3 className="text-lg font-semibold">{klas.naam}</h3>
        </button>
      ))}
    </div>
  )
}

export default KlassenLijst

