import { Navigation } from 'lucide-react'
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
    nextItem = timedItems[timedItems.length - 1]
    isNext = false
  }

  return (
    <div
      className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[calc(28rem-2rem)] z-20 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform shadow-lg shadow-blue-500/30"
      onClick={() => onItemClick?.(nextItem)}
    >
      <div className="flex items-center space-x-3 min-w-0">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <Navigation size={18} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-white/80 font-bold tracking-wider">
            {isNext ? '現在前往' : '現在前往'}
          </p>
          <p className="text-sm font-serif-tc font-bold truncate">
            {nextItem.title}
          </p>
        </div>
      </div>
      {nextItem.time && (
        <div className="text-right shrink-0 ml-3">
          <p className="text-[10px] text-white/80 font-bold tracking-wider">預計抵達</p>
          <p className="text-base font-serif-tc font-bold">{nextItem.time}</p>
        </div>
      )}
    </div>
  )
}
