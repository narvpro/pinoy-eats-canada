import { useState } from 'react'

export default function SuggestRestaurant({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    city: '',
    neighborhood: '',
    specialties: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]')
    suggestions.push({ ...form, submittedAt: new Date().toISOString() })
    localStorage.setItem('suggestions', JSON.stringify(suggestions))
    console.log('[Pinoy Eats] New restaurant suggestion:', form)
    setSubmitted(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-pinoy-red px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">📩 Suggest a Restaurant</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Thanks for the tip!
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We'll look into it and add verified spots to the list.
              </p>
              <button
                onClick={onClose}
                className="mt-5 bg-pinoy-red text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                  Restaurant Name *
                </label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Nay's Turo-Turo"
                  className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pinoy-red"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                  City *
                </label>
                <input
                  required
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Toronto, Vancouver, Calgary..."
                  className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pinoy-red"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                  Neighbourhood / Area
                </label>
                <input
                  name="neighborhood"
                  value={form.neighborhood}
                  onChange={handleChange}
                  placeholder="e.g. Scarborough, Burnaby, NE Calgary..."
                  className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pinoy-red"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                  Best Dishes
                </label>
                <input
                  name="specialties"
                  value={form.specialties}
                  onChange={handleChange}
                  placeholder="e.g. Sisig, Lechon, Halo-halo..."
                  className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pinoy-red"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                  Why should we add it?
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us what makes it special..."
                  className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pinoy-red resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pinoy-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors text-sm"
              >
                Submit Suggestion
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
