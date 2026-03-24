import { MapPin, ChevronRight } from 'lucide-react'
import { CARD_STYLES } from '../../utils/constants'

export default function StatusWidget({ items, onItemClick }) {
  // Find current/next item based on current time
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  const parseTime = (timeStr) => {
    if (!timeStr) return null
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i)
    if (!match) return null
    let [, h, m, period] = match
    h = parseInt(h)
    m = parseInt(m)
    if (period) {
      if (period.toUpperCase() === 'PM' && h !== 12) h += 12
      if (period.toUpperCase() === 'AM' && h === 12) h = 0
    }
    return h * 60 + m
  }

  // Find the next upcoming item (or the last passed one)
  const timedItems = items.filter((i) => parseTime(i.time) !== null)
  if (timedItems.length === 0) return null

  const currentMinutes = currentHour * 60 + currentMinute
  let nextItem = timedItems.find((i) => parseTime(i.time) > currentMinutes)
  let isNext = true

  if (!nextItem) {
    // All items have passed — show the last one
    nextItem = timedItems[timedItems.length - 1]
    isNext = false
  }

  const style = CARD_STYLES[nextItem.type] || CARD_STYLES.attraction
  const Icon = style.iconComponent

  return (
    <div
      className="mx-4 mb-4 bg-slate-800 text-white rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform shadow-lg shadow-slate-800/30"
      onClick={() => onItemClick?.(nextItem)}
    >
      <div className="flex items-center space-x-3 min-w-0">
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
          <Icon size={16} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">
            {isNext ? '下一站' : '現在前往'}
          </p>
          <p className="text-sm font-serif-tc font-bold truncate">
            {nextItem.title}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2 shrink-0 ml-3">
        {nextItem.time && (
          <span className="text-xs text-slate-300 font-serif-tc">{nextItem.time}</span>
        )}
        <ChevronRight size={16} className="text-slate-400" />
      </div>
    </div>
  )
}
