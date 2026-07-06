import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import data from '../data/restaurants.json'

export default function CitySelector() {
  const { cityId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (cityId) {
      localStorage.setItem('lastCity', cityId)
    }
  }, [cityId])

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-1 py-2 no-scrollbar">
          {data.cities.map(city => (
            <button
              key={city.id}
              onClick={() => navigate(`/city/${city.id}`)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150 flex-shrink-0
                ${cityId === city.id
                  ? 'bg-pinoy-red text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-pinoy-red dark:hover:text-red-400'
                }
              `}
            >
              {city.name}
              <span className={`ml-1 text-xs ${cityId === city.id ? 'opacity-80' : 'opacity-50'}`}>
                {city.province}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
