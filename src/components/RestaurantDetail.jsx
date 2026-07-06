import { useEffect } from 'react'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`text-xl ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-600'}`}
        >
          ★
        </span>
      ))}
      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{rating.toFixed(1)} / 5</span>
    </div>
  )
}

export default function RestaurantDetail({ restaurant, onClose, isFavorite, toggleFavorite }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    restaurant.name + ' ' + restaurant.address
  )}`

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${restaurant.name}`}
    >
      <div
        className="bg-white dark:bg-gray-800 w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-gray-200 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Sticky header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-start justify-between gap-3 z-10">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                {restaurant.name}
              </h2>
              {restaurant.homeStyle && (
                <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                  🏠 Home-style
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              📍 {restaurant.neighborhood}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => toggleFavorite(restaurant.id)}
              className="text-2xl hover:scale-110 transition-transform duration-150"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-100 transition-colors p-1"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Rating & Price */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <StarRating rating={restaurant.rating} />
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {restaurant.priceRange}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {restaurant.description}
          </p>

          {/* Why it's a favorite */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800/30 rounded-2xl p-4">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1.5 flex items-center gap-1.5">
              <span>💛</span> Why it's a favourite
            </h3>
            <p className="text-sm text-yellow-900 dark:text-yellow-200 leading-relaxed">
              {restaurant.whyFavorite}
            </p>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2.5">
              🍽️ Specialty Dishes
            </h3>
            <div className="flex flex-wrap gap-2">
              {restaurant.specialties.map(s => (
                <span
                  key={s}
                  className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm px-3 py-1 rounded-full font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2.5">
              📋 Details
            </h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {restaurant.address && (
                <div className="flex gap-2.5">
                  <span className="flex-shrink-0">📍</span>
                  <span>{restaurant.address}</span>
                </div>
              )}
              {restaurant.phone && (
                <div className="flex gap-2.5">
                  <span className="flex-shrink-0">📞</span>
                  <a
                    href={`tel:${restaurant.phone}`}
                    className="text-pinoy-blue dark:text-blue-400 hover:underline"
                  >
                    {restaurant.phone}
                  </a>
                </div>
              )}
              {restaurant.hours && (
                <div className="flex gap-2.5">
                  <span className="flex-shrink-0">🕐</span>
                  <span>{restaurant.hours}</span>
                </div>
              )}
            </div>
          </div>

          {/* Maps CTA */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-pinoy-blue text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors duration-150 w-full"
          >
            <span>🗺️</span>
            <span>Open in Google Maps</span>
          </a>

          <p className="text-xs text-center text-gray-400 dark:text-gray-500">
            Details may not be current. Verify before visiting.
          </p>
        </div>
      </div>
    </div>
  )
}
