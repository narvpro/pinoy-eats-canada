import RestaurantCard from './RestaurantCard'

export default function TopPicks({ restaurants, favorites, toggleFavorite, onSelect }) {
  const topPicks = [...restaurants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)

  if (topPicks.length === 0) return null

  return (
    <section className="py-6 bg-gradient-to-b from-orange-50 to-transparent dark:from-gray-900 dark:to-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">⭐</span>
          <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Top Picks</h2>
          <span className="text-sm text-gray-400 font-normal">
            — highest-rated spots in this city
          </span>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 top-picks-scroll no-scrollbar -mx-4 px-4">
          {topPicks.map((restaurant, i) => (
            <div key={restaurant.id} className="flex-shrink-0 w-64 relative">
              {/* Rank badge */}
              <span className="rank-badge absolute -top-2 -left-2 z-20 bg-gradient-to-br from-foodie-gold to-amber-500 text-gray-900 text-xs font-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white dark:ring-gray-900">
                #{i + 1}
              </span>
              <RestaurantCard
                restaurant={restaurant}
                isFavorite={favorites.includes(restaurant.id)}
                toggleFavorite={toggleFavorite}
                onSelect={onSelect}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
