import { Crown } from 'lucide-react'
import { CARD_STYLES } from '../../utils/constants'

export default function ItemCard({ item, onClick }) {
  const style = CARD_STYLES[item.type] || CARD_STYLES.attraction
  const Icon = style.iconComponent
  const isHighlight = item.highlight

  return (
    <div
      className="relative flex mb-8 group cursor-pointer"
      onClick={() => onClick?.(item)}
    >
      {/* Left time column */}
      <div className="w-12 shrink-0 pt-1">
        <span className="font-serif-tc text-base text-slate-800 block">
          {item.time || ''}
        </span>
      </div>

      {/* Content card */}
      <div
        className={`flex-1 ml-3 rounded-2xl p-4 transition-transform active:scale-[0.98] ${
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
