import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import CityPage from './components/CityPage'

function DefaultRedirect() {
  const lastCity = localStorage.getItem('lastCity') || 'toronto'
  return <Navigate to={`/city/${lastCity}`} replace />
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', String(darkMode))
  }, [darkMode])

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
      localStorage.setItem('favorites', JSON.stringify(next))
      return next
    })
  }

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-gray-900 transition-colors duration-200">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<DefaultRedirect />} />
        <Route
          path="/city/:cityId"
          element={<CityPage favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
        <Route path="*" element={<Navigate to="/city/toronto" replace />} />
      </Routes>
    </div>
  )
}
