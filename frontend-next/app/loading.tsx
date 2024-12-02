import React from 'react'

const LoadingView = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent z-10">
        <div className="animate-spin h-8 w-8 border-primary text-secondary"  />
        <p className="mt-4 text-lg text-primary">Loading...</p>
      </div>
  )
}

export default LoadingView