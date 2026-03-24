import { Crown } from 'lucide-react'
import { CARD_STYLES } from '../../utils/constants'

function to24hr(timeStr) {
  if (!timeStr) return ''
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i)
  if (!match) return timeStr
  let [, h, m, period] = match
  h = parseInt(h)
  if (period) {
    if (period.toUpperCase() === 'PM' && h !== 12) h += 12
    if (period.toUpperCase() === 'AM' && h === 12) h = 0
  }
  return `${h}:${m.padStart(2, '0')}`
}

export default function ItemCard({ item, onClick }) {
  const style = CARD_STYLES[item.type] || CARD_STYLES.attraction
  const Icon = style.iconComponent
  const isHighlight = item.highlight
  const time24 = to24hr(item.time)

  return (
    <div
      className="relative mb-6 group cursor-pointer"
      onClick={() => onClick?.(item)}
    >
      {/* Time above card */}
      {time24 && (
        <span className="font-serif-tc text-sm text-slate-400 block mb-1.5 ml-1">
          {time24}
        </span>
      )}

      {/* Content card */}
      <div
        className={`rounded-2xl p-4 transition-transform active:scale-[0.98] ${
          isHighlight
            ? 'bg-pink-50 border border-pink-100 shadow-sm'
            : 'bg-slate-50 hover:bg-slate-100'
        }`}
      >
        {/* Highlight badge */}
        {isHighlight && (
          <div className="flex items-center space-x-1 mb-2 text-pink-500">
            <Crown size={14} fill="currentColor" />
            <span className="text-[10px] font-bold tracking-wider">SPECIAL EXPERIENCE</span>
          </div>
        )}

        {/* Type badge (non-highlight only) */}
        {!isHighlight && (
          <div className="flex items-center space-x-1.5 mb-2 text-slate-400">
            <Icon size={14} />
            <span className="text-[10px] font-bold tracking-wider uppercase">
              {style.label}
            </span>
          </div>
        )}

        <h3 className={`font-serif-tc text-lg font-bold mb-1 ${
          isHighlight ? 'text-pink-700' : 'text-slate-800'
        }`}>
          {item.title}
        </h3>

        {item.description && (
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mt-1 font-sans-tc">
            {item.description}
          </p>
        )}

        {/* Notes tags */}
        {item.notes && item.notes.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {item.notes.map((note) => (
              <span
                key={note}
                className={`text-[10px] px-2 py-1 rounded-md ${
                  isHighlight
                    ? 'bg-white text-pink-600'
                    : 'bg-white text-slate-500 border border-slate-100'
                }`}
              >
                {note}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
