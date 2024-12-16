import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

interface ClassSelectionProps {
  classes: { [key: string]: any[] }
  onClassSelect: (className: string) => void
}

export default function ClassSelection({ classes, onClassSelect }: ClassSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.keys(classes).map((className) => (
        <Card key={className} className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4">
            <button
              onClick={() => onClassSelect(className)}
              className="w-full text-left"
            >
              <h3 className="text-lg font-semibold">{className}</h3>
              <p className="text-gray-600">{classes[className].length} studenten</p>
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

