const SPECIALTY_EMOJI = {
  'Lechon':        '🐷',
  'Adobo':         '🫕',
  'Sinigang':      '🍲',
  'Kare-kare':     '🥜',
  'Sisig':         '🥩',
  'Halo-halo':     '🍧',
  'Pancit':        '🍜',
  'Lumpia':        '🥟',
  'Chicken Inasal':'🍗',
  'Crispy Pata':   '🦵',
  'Bulalo':        '🦴',
  'Dinuguan':      '🫕',
  'Bicol Express': '🌶️',
  'Lechon Kawali': '🥓',
  'Fried Chicken': '🍗',
  'Afritada':      '🍅',
  'Pork Sinigang': '🍲',
  'Pork Adobo':    '🫕',
}

// Per-dish gradient: each specialty gets its own colour story
const SPECIALTY_GRADIENTS = {
  'Lechon':        'from-red-600 via-orange-500 to-amber-400',
  'Adobo':         'from-amber-600 via-orange-500 to-yellow-400',
  'Sinigang':      'from-teal-500 via-emerald-400 to-cyan-400',
  'Kare-kare':     'from-yellow-600 via-amber-500 to-orange-400',
  'Sisig':         'from-orange-600 via-red-500 to-amber-400',
  'Halo-halo':     'from-violet-500 via-pink-400 to-rose-400',
  'Pancit':        'from-lime-500 via-green-400 to-emerald-400',
  'Lumpia':        'from-amber-500 via-yellow-400 to-lime-400',
  'Chicken Inasal':'from-yellow-500 via-amber-400 to-orange-500',
  'Crispy Pata':   'from-red-600 via-orange-600 to-amber-500',
  'Bulalo':        'from-stone-400 via-amber-300 to-orange-300',
  'Dinuguan':      'from-purple-700 via-violet-600 to-purple-500',
  'Bicol Express': 'from-red-600 via-red-500 to-orange-500',
  'Lechon Kawali': 'from-amber-600 via-orange-500 to-red-500',
  'Fried Chicken': 'from-yellow-500 via-amber-400 to-orange-400',
  'Afritada':      'from-rose-500 via-red-400 to-orange-400',
  'Pork Sinigang': 'from-teal-500 via-emerald-400 to-cyan-400',
  'Pork Adobo':    'from-amber-600 via-orange-500 to-yellow-400',
}
const FALLBACK_GRADIENTS = [
  'from-red-500 via-orange-400 to-amber-300',
  'from-orange-600 via-amber-500 to-yellow-300',
  'from-rose-500 via-red-500 to-orange-400',
  'from-amber-500 via-orange-500 to-red-500',
  'from-yellow-500 via-amber-500 to-orange-500',
]

// Per-dish pill colours for specialty tags
const TAG_COLORS = {
  'Lechon':        'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  'Adobo':         'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'Sinigang':      'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  'Kare-kare':     'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  'Sisig':         'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  'Halo-halo':     'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  'Pancit':        'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
  'Lumpia':        'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  'Chicken Inasal':'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-300',
  'Crispy Pata':   'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300',
  'Bulalo':        'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300',
  'Dinuguan':      'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'Bicol Express': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  'Lechon Kawali': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'Fried Chicken': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  'Afritada':      'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300',
  'Pork Sinigang': 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  'Pork Adobo':    'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
}
const TAG_DEFAULT = 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`text-sm ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-600'}`}
        >
          ★
        </span>
      ))}
      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  )
}

export default function RestaurantCard({ restaurant, isFavorite, toggleFavorite, onSelect, index = 0 }) {
  const emoji = SPECIALTY_EMOJI[restaurant.specialties[0]] || '🍽️'
  const gradient = SPECIALTY_GRADIENTS[restaurant.specialties[0]] || FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length]
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    restaurant.name + ' ' + restaurant.address
  )}`

  return (
    <article
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-orange-200/60 dark:hover:shadow-orange-900/30 transition-all duration-200 overflow-hidden cursor-pointer group flex flex-col border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-700 hover:-translate-y-0.5"
      onClick={() => onSelect(restaurant)}
    >
      {/* Card image area */}
      <div className={`bg-gradient-to-br ${gradient} h-40 flex items-center justify-center relative overflow-hidden food-card-pattern`}>
        {/* Soft glow blob behind emoji */}
        <div className="absolute w-24 h-24 rounded-full bg-white/25 blur-2xl" />
        <span className="card-emoji text-7xl relative z-10 emoji-glow">{emoji}</span>
        {restaurant.homeStyle && (
          <span className="absolute top-2 left-2 bg-white/90 text-orange-700 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            🏠 Home-style
          </span>
        )}
        <button
          onClick={e => { e.stopPropagation(); toggleFavorite(restaurant.id) }}
          className="absolute top-2 right-2 text-xl hover:scale-125 transition-transform duration-150 drop-shadow"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Card content */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-gray-900 dark:text-white text-[15px] leading-snug group-hover:text-pinoy-red dark:group-hover:text-red-400 transition-colors duration-150">
            {restaurant.name}
          </h3>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex-shrink-0">
            {restaurant.priceRange}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
          <span>📍</span>
          <span>{restaurant.neighborhood}</span>
        </div>

        <StarRating rating={restaurant.rating} />

        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 flex-1">
          {restaurant.blurb}
        </p>

        {/* Specialty tags — each dish gets its own colour */}
        <div className="flex flex-wrap gap-1 pt-1">
          {restaurant.specialties.slice(0, 4).map(s => (
            <span
              key={s}
              className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${TAG_COLORS[s] || TAG_DEFAULT}`}
            >
              {s}
            </span>
          ))}
          {restaurant.specialties.length > 4 && (
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-400 text-[11px] px-2 py-0.5 rounded-full">
              +{restaurant.specialties.length - 4}
            </span>
          )}
        </div>

        {/* Maps link */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="text-[11px] text-pinoy-blue dark:text-blue-400 hover:underline flex items-center gap-1 mt-0.5"
        >
          <span>🗺️</span>
          <span>View on Google Maps</span>
        </a>
      </div>
    </article>
  )
}
