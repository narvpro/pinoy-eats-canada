import { Link } from 'react-router-dom'

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="bg-gradient-to-r from-red-700 via-pinoy-red to-foodie-orange dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg sticky top-0 z-40 overflow-hidden">
      {/* Gen Z food emoji ticker — subtle background decoration */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none flex items-center opacity-[0.07] whitespace-nowrap text-3xl gap-5 pl-2 select-none"
        aria-hidden="true"
      >
        🐷🍲🥩🥟🍜🍗🍧🥜🌶️🥓🦴🫕🐷🍲🥩🥟🍜🍗🍧🥜🌶️🥓🦴🫕
      </div>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <span className="text-2xl leading-none drop-shadow">🇵🇭</span>
          <div>
            <span className="text-white font-extrabold text-xl leading-none tracking-tight block drop-shadow">
              Pinoy Eats
            </span>
            <span className="text-foodie-gold text-[10px] font-black tracking-[0.25em] uppercase drop-shadow">
              Canada
            </span>
          </div>
        </Link>

        <div className="items-center gap-1.5 text-white/80 text-xs font-semibold hidden sm:flex relative z-10">
          <span className="text-base">🍽️</span>
          <span className="tracking-wide">Filipino Food Finder</span>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-white hover:text-foodie-gold transition-colors p-2 rounded-full hover:bg-white/10 relative z-10"
          aria-label="Toggle dark mode"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span className="text-lg">{darkMode ? '☀️' : '🌙'}</span>
        </button>
      </div>
    </header>
  )
}
