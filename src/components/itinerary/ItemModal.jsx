import { X, Clock, Navigation, Crown } from 'lucide-react'
import { CARD_STYLES } from '../../utils/constants'
import { getNavigationUrl } from '../../utils/helpers'

export default function ItemModal({ item, isOpen, onClose }) {
  const style = item ? (CARD_STYLES[item.type] || CARD_STYLES.attraction) : CARD_STYLES.attraction
  const Icon = style.iconComponent
  const navUrl = item ? getNavigationUrl(item.address) : null
  const isHighlight = item?.highlight

  return (
    <>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Centered Modal */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2.5rem)] bg-white rounded-3xl z-40 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen && item ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        } max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col`}
      >
        {item && (
          <>
            {/* Fixed close button */}
            <button
              onClick={onClose}
              className="sticky top-3 self-end mr-4 mt-3 z-10 p-2 bg-white/80 backdrop-blur-sm text-slate-600 rounded-full hover:bg-white active:bg-slate-100 transition-colors shadow-sm"
            >
              <X size={18} />
            </button>

            {/* Photo */}
            {item.image && (
              <div className="relative w-full h-44 overflow-hidden shrink-0 -mt-11">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
              </div>
            )}

            <div className={`px-6 pb-6 ${item.image ? 'pt-3' : '-mt-6'}`}>
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
                  className={`mt-6 w-full rounded-2xl py-4 text-base font-bold flex items-center justify-center space-x-2 shadow-lg active:opacity-90 transition-opacity ${
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
          </>
        )}
      </div>
    </>
  )
}
