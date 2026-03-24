import { X, Clock, Navigation, Crown } from 'lucide-react'
import { CARD_STYLES } from '../../utils/constants'
import { getNavigationUrl } from '../../utils/helpers'

export default function ItemModal({ item, isOpen, onClose }) {
  if (!item) return null

  const style = CARD_STYLES[item.type] || CARD_STYLES.attraction
  const Icon = style.iconComponent
  const navUrl = getNavigationUrl(item.address)
  const isHighlight = item.highlight

  return (
    <>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-30 transition-opacity duration-400 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        style={{
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(2rem)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease-out',
        }}
        className={`absolute left-0 right-0 bottom-0 bg-white rounded-t-[2rem] z-40 will-change-transform ${
          !isOpen ? 'pointer-events-none' : ''
        } max-h-[85vh] overflow-y-auto no-scrollbar pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]`}
      >
        {/* Photo */}
        {item.image && (
          <div className="relative w-full h-48 overflow-hidden rounded-t-[2rem]">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
          </div>
        )}

        {/* Handle + close */}
        <div className={`sticky top-0 z-10 flex justify-between items-center px-6 pt-5 pb-3 ${
          item.image ? 'bg-white' : 'bg-gradient-to-b from-white via-white to-white/90'
        }`}>
          {!item.image && (
            <div className="w-10 h-1.5 bg-slate-200 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
          )}
          <div className="w-8" />
          <button
            onClick={onClose}
            className="p-2 bg-slate-50 text-slate-500 rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6">
          {/* Type badge */}
          {isHighlight ? (
            <div className="flex items-center space-x-1 mb-3 text-pink-500">
              <Crown size={14} fill="currentColor" />
              <span className="text-[10px] font-bold tracking-wider">SPECIAL EXPERIENCE</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 mb-3 text-slate-400">
              <Icon size={14} />
              <span className="text-[10px] font-bold tracking-wider uppercase">
                {style.label}
              </span>
            </div>
          )}

          {/* Title + time */}
          <h2 className={`font-serif-tc text-2xl font-bold leading-snug ${
            isHighlight ? 'text-pink-700' : 'text-slate-800'
          }`}>
            {item.title}
          </h2>
          {item.time && (
            <div className="flex items-center space-x-2 mt-2 text-slate-500 text-sm">
              <Clock size={14} />
              <span className="font-serif-tc">{item.time}</span>
            </div>
          )}

          {/* Notes tags */}
          {item.notes && item.notes.length > 0 && (
            <div className="mt-5">
              <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-2 uppercase">
                備註
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.notes.map((note) => (
                  <span
                    key={note}
                    className={`text-xs px-3 py-1.5 rounded-lg ${
                      isHighlight
                        ? 'bg-pink-50 text-pink-600'
                        : 'bg-slate-50 text-slate-600 border border-slate-100'
                    }`}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {item.description && (
            <div className="mt-5">
              <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-2 uppercase">
                詳細說明
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-sans-tc">
                {item.description}
              </p>
            </div>
          )}

          {/* Address */}
          {item.address && (
            <div className="mt-5">
              <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-2 uppercase">
                地址
              </h4>
              <p className="text-slate-600 text-sm font-sans-tc">{item.address}</p>
            </div>
          )}

          {/* Navigate button */}
          {navUrl && (
            <a
              href={navUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 w-full rounded-2xl py-4 text-base font-bold flex items-center justify-center space-x-2 shadow-lg active:opacity-90 transition-opacity ${
                isHighlight
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/20'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-blue-500/20'
              }`}
            >
              <Navigation size={18} />
              <span>開啟導航</span>
            </a>
          )}
        </div>
      </div>
    </>
  )
}
