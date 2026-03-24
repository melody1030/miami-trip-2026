export function getNavigationUrl(address) {
  if (!address) return null
  const encoded = encodeURIComponent(address)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  return isIOS
    ? `maps://maps.apple.com/?daddr=${encoded}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encoded}`
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('zh-TW', {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  })
}

export function generateItemId() {
  return `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
