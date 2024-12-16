import React, { useState, useMemo, useCallback } from 'react'

interface SchuifknopProps {
  onChange: (value: number) => void
  initialValue?: number
  min: number
  max: number
  step: number
  labels: string[]
}

const Schuifknop: React.FC<SchuifknopProps> = ({ onChange, initialValue = 0, min, max, step, labels }) => {
  const [value, setValue] = useState(initialValue)
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  const labelPositions = useMemo(() => {
    const positions: { [key: string]: number } = {}
    labels.forEach((label, index) => {
      positions[label] = (index * (max - min)) / (labels.length - 1)
    })
    return positions
  }, [labels, min, max])

  const getCurrentLabel = useCallback((val: number) => {
    const index = Math.floor(val / (max / (labels.length - 1)))
    return labels[index] || ''
  }, [labels, max])

  const getAdjustedValue = useCallback((val: number) => {
    const labelIndex = Math.floor(val / (max / (labels.length - 1)))
    return val - labelIndex * (max / (labels.length - 1))
  }, [max, labels])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10)
    setValue(newValue)
    onChange(newValue)
  }

  const totalBlocks = (max - min) / step
  const filledBlocks = (value - min) / step

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const hoverVal = Math.round((x / rect.width) * max)
    setHoverValue(hoverVal)
  }

  const handleMouseLeave = () => {
    setHoverValue(null)
  }

  const getTooltipContent = (val: number) => {
    const label = getCurrentLabel(val)
    const adjustedValue = getAdjustedValue(val)
    return `${label}: ${adjustedValue} blokjes`
  }

  return (
    <div className="w-full pt-6">
      <div className="relative">
        {/* Tooltip */}
        <div 
          className="absolute bottom-full left-0 bg-gray-800 text-white px-2 py-1 rounded text-sm mb-2"
          style={{ left: `${(value / max) * 100}%`, transform: 'translateX(-50%)' }}
        >
          {getTooltipContent(value)}
        </div>

        {/* Blocks */}
        <div 
          className="flex space-x-0.5 mb-2" 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {Array.from({ length: totalBlocks }).map((_, index) => (
            <div
              key={index}
              className={`h-6 w-full rounded ${
                index < filledBlocks 
                  ? 'bg-blue-500' 
                  : hoverValue !== null && index < hoverValue 
                    ? 'bg-blue-300'
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Labels */}
        <div className="relative h-6">
          {labels.map((label) => (
            <div
              key={label}
              className={`absolute transform -translate-x-1/2 text-sm font-bold ${
                getCurrentLabel(value) === label ? 'text-blue-600' : 'text-gray-700'
              }`}
              style={{ left: `${(labelPositions[label] / max) * 100}%` }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="w-full h-2 mt-4 bg-transparent rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600"
        />
      </div>
    </div>
  )
}

export default Schuifknop

