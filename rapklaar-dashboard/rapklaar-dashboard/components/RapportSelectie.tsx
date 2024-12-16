import React from 'react'

const rapporten = [
  { id: '1', naam: 'Rapport 1' },
  { id: '2', naam: 'Rapport 2' },
  { id: '3', naam: 'Rapport 3' },
]

interface RapportSelectieProps {
  klasId: string
  onSelectRapport: (rapportId: string) => void
}

const RapportSelectie: React.FC<RapportSelectieProps> = ({ klasId, onSelectRapport }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Selecteer een rapport voor Klas {klasId}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rapporten.map((rapport) => (
          <button
            key={rapport.id}
            onClick={() => onSelectRapport(rapport.id)}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 text-left"
          >
            <h3 className="text-xl font-semibold">{rapport.naam}</h3>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RapportSelectie

