import { CARD_STYLES } from '../../utils/constants'

export default function ItemCard({ item, onClick }) {
  const style = CARD_STYLES[item.type] || CARD_STYLES.attraction
  const Icon = style.iconComponent

  return (
    <div
      className="relative flex mb-8 group cursor-pointer"
      onClick={() => onClick?.(item)}
    >
      {/* Left time column */}
      <div className="w-16 shrink-0 pt-1">
        <span className="font-serif-tc text-lg text-slate-800 block">
          {item.time || ''}
        </span>
      </div>

      {/* Content card */}
      <div
        className={`flex-1 ml-3 rounded-2xl p-4 transition-transform active:scale-[0.98] ${style.bg} ${style.hoverBg}`}
      >
        {/* Type badge */}
        <div className="flex items-center space-x-1.5 mb-2 text-slate-400">
          <Icon size={14} />
          <span className="text-[10px] font-bold tracking-wider uppercase">
            {style.label}
          </span>
        </div>

        <h3 className="font-serif-tc text-lg font-bold text-slate-800 mb-1">
          {item.title}
        </h3>

        {item.description && (
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mt-1 font-sans-tc">
            {item.description}
          </p>
        )}
      </div>
    </div>
  )
}
