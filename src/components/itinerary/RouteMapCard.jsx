import { Map, Navigation } from 'lucide-react'

export default function RouteMapCard({ items }) {
  // Get all items with addresses
  const stops = items.filter((i) => i.address)
  if (stops.length < 2) return null

  // Build Google Maps directions URL with waypoints
  const origin = encodeURIComponent(stops[0].address)
  const destination = encodeURIComponent(stops[stops.length - 1].address)
  const waypoints = stops.slice(1, -1).map((s) => encodeURIComponent(s.address)).join('|')
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${
    waypoints ? `&waypoints=${waypoints}` : ''
  }&travelmode=driving`

  return (
    <div className="mx-4 mb-4 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Map size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold tracking-wider uppercase">今日路線</p>
            <p className="text-sm font-serif-tc font-bold mt-0.5">
              {stops.length} 個地點
            </p>
          </div>
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1.5 bg-white/15 hover:bg-white/20 active:bg-white/25 rounded-xl px-4 py-2.5 transition-colors"
        >
          <Navigation size={14} />
          <span className="text-xs font-bold">查看路線</span>
        </a>
      </div>

      {/* Stop dots */}
      <div className="flex items-center mt-4 px-1 overflow-x-auto no-scrollbar">
        {stops.map((stop, i) => (
          <div key={stop.id || i} className="flex items-center shrink-0">
            <div className="flex flex-col items-center">
              <div className={`w-2.5 h-2.5 rounded-full ${
                i === 0 ? 'bg-cyan-400' : i === stops.length - 1 ? 'bg-blue-400' : 'bg-white/40'
              }`} />
              <span className="text-[9px] text-slate-400 mt-1 max-w-[50px] text-center truncate">
                {stop.title.length > 4 ? stop.title.slice(0, 4) + '…' : stop.title}
              </span>
            </div>
            {i < stops.length - 1 && (
              <div className="w-6 h-px bg-white/20 mx-1 mb-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
