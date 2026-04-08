import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#064e3b] text-white p-4">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#d4af37] opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37] opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="text-center animate-fade-in relative">
        <h1 className="text-9xl font-bold text-[#d4af37] mb-4">404</h1>
        <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-8 animate-reveal"></div>
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-300 max-w-md mx-auto mb-10 text-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <button 
          onClick={() => navigate(-1)}
          className="inline-block px-12 py-3 bg-[#d4af37] text-[#064e3b] font-bold rounded-lg transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-lg shadow-black/20 cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
