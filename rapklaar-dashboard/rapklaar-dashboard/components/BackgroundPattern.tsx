export const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="smallGrid"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 8 0 L 0 0 0 8"
              fill="none"
              stroke="rgba(91, 164, 193, 0.05)"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <rect width="80" height="80" fill="url(#smallGrid)" />
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="rgba(91, 164, 193, 0.08)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

