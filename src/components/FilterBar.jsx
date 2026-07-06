const ALL_TAGS = [
  'Adobo', 'Sinigang', 'Lechon', 'Sisig', 'Kare-kare',
  'Halo-halo', 'Pancit', 'Lumpia', 'Chicken Inasal',
  'Crispy Pata', 'Bulalo', 'Dinuguan', 'Bicol Express',
  'Lechon Kawali',
]

const SORT_OPTIONS = [
  { value: 'rating', label: '⭐ Top Rated' },
  { value: 'alpha', label: '🔤 A–Z' },
  { value: 'price-asc', label: '💰 Price ↑' },
  { value: 'price-desc', label: '💰 Price ↓' },
]

const PRICE_OPTIONS = ['$', '$$', '$$$']

export default function FilterBar({
  search, setSearch,
  activeTags, setActiveTags,
  priceFilter, setPriceFilter,
  sortBy, setSortBy,
}) {
  const toggleTag = (tag) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const hasFilters = search.trim() !== '' || activeTags.length > 0 || priceFilter !== ''

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 py-4">
      <div className="max-w-7xl mx-auto px-4 space-y-3">
        {/* Search + Sort */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pinoy-red text-sm transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pinoy-red text-sm cursor-pointer"
          >
            {SORT_OPTIONS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Dish tag chips */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold tracking-wide uppercase mr-1">
            Dish:
          </span>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 ${
                activeTags.includes(tag)
                  ? 'bg-pinoy-red text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-600 hover:text-pinoy-red'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Price filter + clear */}
        <div className="flex gap-1.5 items-center flex-wrap">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold tracking-wide uppercase mr-1">
            Price:
          </span>
          <button
            onClick={() => setPriceFilter('')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 ${
              priceFilter === ''
                ? 'bg-pinoy-red text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-50 hover:text-pinoy-red'
            }`}
          >
            All
          </button>
          {PRICE_OPTIONS.map(p => (
            <button
              key={p}
              onClick={() => setPriceFilter(priceFilter === p ? '' : p)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 ${
                priceFilter === p
                  ? 'bg-pinoy-red text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-50 hover:text-pinoy-red'
              }`}
            >
              {p}
            </button>
          ))}
          {hasFilters && (
            <button
              onClick={() => { setActiveTags([]); setPriceFilter(''); setSearch('') }}
              className="ml-auto text-xs text-pinoy-red dark:text-red-400 hover:underline font-medium"
            >
              ✕ Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
