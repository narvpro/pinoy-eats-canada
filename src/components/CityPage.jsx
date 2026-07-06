import { useParams, Navigate } from 'react-router-dom'
import { useState, useMemo, useEffect } from 'react'
import data from '../data/restaurants.json'
import CitySelector from './CitySelector'
import FilterBar from './FilterBar'
import TopPicks from './TopPicks'
import RestaurantCard from './RestaurantCard'
import RestaurantDetail from './RestaurantDetail'
import SuggestRestaurant from './SuggestRestaurant'

const PRICE_ORDER = { '$': 1, '$$': 2, '$$$': 3 }

export default function CityPage({ favorites, toggleFavorite }) {
  const { cityId } = useParams()
  const [search, setSearch] = useState('')
  const [activeTags, setActiveTags] = useState([])
  const [priceFilter, setPriceFilter] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [showSuggest, setShowSuggest] = useState(false)

  const city = data.cities.find(c => c.id === cityId)

  const cityRestaurants = useMemo(
    () => (city ? data.restaurants.filter(r => r.city === cityId) : []),
    [cityId, city]
  )

  // Reset filters when city changes
  useEffect(() => {
    setSearch('')
    setActiveTags([])
    setPriceFilter('')
    setSortBy('rating')
    setSelectedRestaurant(null)
  }, [cityId])

  const filtered = useMemo(() => {
    let result = [...cityRestaurants]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.specialties.some(s => s.toLowerCase().includes(q)) ||
        r.neighborhood.toLowerCase().includes(q)
      )
    }

    if (activeTags.length > 0) {
      result = result.filter(r =>
        activeTags.some(tag => r.specialties.includes(tag))
      )
    }

    if (priceFilter) {
      result = result.filter(r => r.priceRange === priceFilter)
    }

    return result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'alpha') return a.name.localeCompare(b.name)
      if (sortBy === 'price-asc') return PRICE_ORDER[a.priceRange] - PRICE_ORDER[b.priceRange]
      if (sortBy === 'price-desc') return PRICE_ORDER[b.priceRange] - PRICE_ORDER[a.priceRange]
      return 0
    })
  }, [cityRestaurants, search, activeTags, priceFilter, sortBy])

  if (!city) return <Navigate to="/city/toronto" replace />

  const hasFilters = search.trim() !== '' || activeTags.length > 0 || priceFilter !== ''

  return (
    <>
      <CitySelector />

      {/* City banner */}
      <div className="bg-gradient-to-r from-pinoy-red via-red-600 to-orange-500 text-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-black tracking-tight">
            {city.name}{' '}
            <span className="text-foodie-gold font-bold">{city.province}</span>
          </h1>
          <p className="text-sm text-white/80 mt-1 max-w-xl">{city.description}</p>
          <p className="text-sm text-yellow-200 font-bold mt-2 flex items-center gap-1.5">
            <span>🍽️</span>
            <span>{cityRestaurants.length} Filipino restaurant{cityRestaurants.length !== 1 ? 's' : ''}</span>
          </p>
        </div>
      </div>

      {/* Top Picks carousel — hidden when filters are active */}
      {!hasFilters && (
        <TopPicks
          restaurants={cityRestaurants}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onSelect={setSelectedRestaurant}
        />
      )}

      <FilterBar
        search={search} setSearch={setSearch}
        activeTags={activeTags} setActiveTags={setActiveTags}
        priceFilter={priceFilter} setPriceFilter={setPriceFilter}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      {/* Restaurant grid */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {hasFilters && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
            {filtered.length === 0
              ? 'No restaurants match your filters'
              : `${filtered.length} result${filtered.length !== 1 ? 's' : ''} found`}
          </p>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((restaurant, i) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                isFavorite={favorites.includes(restaurant.id)}
                toggleFavorite={toggleFavorite}
                onSelect={setSelectedRestaurant}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">
              No restaurants match your filters
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Try different dishes, price range, or search terms
            </p>
            <button
              onClick={() => { setActiveTags([]); setPriceFilter(''); setSearch('') }}
              className="mt-4 text-pinoy-red dark:text-red-400 text-sm font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Suggest a restaurant CTA */}
      <div className="text-center pb-10 px-4">
        <div className="inline-flex flex-col items-center gap-2">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Know a great Filipino spot we're missing?
          </p>
          <button
            onClick={() => setShowSuggest(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pinoy-red to-foodie-orange text-white px-8 py-3 rounded-2xl font-black text-sm hover:from-red-700 hover:to-orange-600 transition-all duration-200 shadow-lg shadow-red-400/30 hover:shadow-red-500/50 hover:scale-105"
          >
            <span>📩</span>
            <span>Suggest a Restaurant</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-700 via-pinoy-red to-foodie-orange dark:bg-gray-800 dark:bg-none text-white text-center py-5 px-4">
        <p className="font-semibold">🇵🇭 Pinoy Eats Canada</p>
        <p className="text-white/70 text-xs mt-1">
          Connecting the community, one meal at a time.
          Restaurant data is for discovery — verify details before visiting.
        </p>
      </footer>

      {/* Modals */}
      {selectedRestaurant && (
        <RestaurantDetail
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          isFavorite={favorites.includes(selectedRestaurant.id)}
          toggleFavorite={toggleFavorite}
        />
      )}
      {showSuggest && (
        <SuggestRestaurant onClose={() => setShowSuggest(false)} />
      )}
    </>
  )
}
