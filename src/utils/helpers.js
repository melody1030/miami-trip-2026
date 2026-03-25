export function getNavigationUrl(address) {
  if (!address) return null
  const encoded = encodeURIComponent(address)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  return isIOS
    ? `maps://maps.apple.com/?daddr=${encoded}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encoded}`
}

export function parseTime(timeStr) {
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

export function to24hr(timeStr) {
  const mins = parseTime(timeStr)
  if (mins === null) return timeStr || ''
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${h}:${String(m).padStart(2, '0')}`
}
