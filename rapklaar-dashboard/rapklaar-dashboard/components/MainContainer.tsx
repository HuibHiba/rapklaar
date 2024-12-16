import React from 'react'

interface MainContainerProps {
  children: React.ReactNode
}

export function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
  )
}

