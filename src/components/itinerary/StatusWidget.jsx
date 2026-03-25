import { useState, useEffect } from 'react'
import { Navigation, CheckCircle } from 'lucide-react'

function parseTime(timeStr) {
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

function to24hr(timeStr) {
  const mins = parseTime(timeStr)
  if (mins === null) return timeStr
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${h}:${String(m).padStart(2, '0')}`
}

export default function StatusWidget({ items, onItemClick }) {
  const [now, setNow] = useState(new Date())

  // Update every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(timer)
  }, [])

  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const timedItems = items
    .filter((i) => parseTime(i.time) !== null)
    .sort((a, b) => parseTime(a.time) - parseTime(b.time))

  if (timedItems.length === 0) return null

  // Find where we are in the schedule
  // "current" = the item whose time has passed but the next one hasn't started
  // "next" = the upcoming item
  let currentItem = null
  let nextItem = null

  for (let i = 0; i < timedItems.length; i++) {
    const itemMins = parseTime(timedItems[i].time)
    const nextMins = i < timedItems.length - 1 ? parseTime(timedItems[i + 1].time) : null

    if (currentMinutes >= itemMins && (nextMins === null || currentMinutes < nextMins)) {
      currentItem = timedItems[i]
      nextItem = i < timedItems.length - 1 ? timedItems[i + 1] : null
      break
    }
  }

  // Before first item — show first item as next
  if (!currentItem && currentMinutes < parseTime(timedItems[0].time)) {
    nextItem = timedItems[0]
  }

  // All items done
  const allDone = currentItem && !nextItem && currentMinutes > parseTime(currentItem.time) + 60

  if (allDone) {
    return (
      <div className="absolute bottom-6 left-4 right-4 z-20 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl px-4 py-3 flex items-center justify-center shadow-lg shadow-teal-500/30">
        <CheckCircle size={18} className="mr-2" />
        <span className="text-sm font-serif-tc font-bold">今日行程結束</span>
      </div>
    )
  }

  // Determine what to show
  const displayItem = nextItem || currentItem
  const label = nextItem ? '現在前往' : '目前在'
  const timeLabel = nextItem ? '預計抵達' : '抵達時間'

  return (
    <div
      className="absolute bottom-6 left-4 right-4 z-20 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform shadow-lg shadow-blue-500/30"
      onClick={() => onItemClick?.(displayItem)}
    >
      <div className="flex items-center space-x-3 min-w-0">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <Navigation size={18} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-white/80 font-bold tracking-wider">
            {label}
          </p>
          <p className="text-sm font-serif-tc font-bold truncate">
            {displayItem.title}
          </p>
        </div>
      </div>
      {displayItem.time && (
        <div className="text-right shrink-0 ml-3">
          <p className="text-[10px] text-white/80 font-bold tracking-wider">{timeLabel}</p>
          <p className="text-base font-serif-tc font-bold">{to24hr(displayItem.time)}</p>
        </div>
      )}
    </div>
  )
}
