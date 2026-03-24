import { Map, Navigation, ExternalLink } from 'lucide-react'

export default function RouteMapCard({ items }) {
  const stops = items.filter((i) => i.address)
  if (stops.length < 2) return null

  // Build Google Maps directions URL with waypoints
  const origin = encodeURIComponent(stops[0].address)
  const destination = encodeURIComponent(stops[stops.length - 1].address)
  const waypoints = stops.slice(1, -1).map((s) => encodeURIComponent(s.address)).join('|')
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${
    waypoints ? `&waypoints=${waypoints}` : ''
  }&travelmode=driving`

  // Build embed URL for the map preview (free, no API key needed)
  const embedOrigin = stops[0].address
  const embedDestination = stops[stops.length - 1].address
  const embedWaypoints = stops.slice(1, -1).map((s) => s.address).join('|')
  const embedUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${encodeURIComponent(embedOrigin)}&destination=${encodeURIComponent(embedDestination)}${
    embedWaypoints ? `&waypoints=${encodeURIComponent(embedWaypoints)}` : ''
  }&mode=driving`

  return (
    <div className="mx-4 mb-20 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
      {/* Map preview */}
      <div className="relative w-full h-48 bg-slate-100">
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="今日路線地圖"
        />
      </div>

      {/* Info bar */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <Map size={20} className="text-slate-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">今日路線全覽</p>
              <p className="text-sm font-serif-tc font-bold text-slate-800 mt-0.5">
                {stops.length} 個地點
              </p>
            </div>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl px-4 py-2.5 active:opacity-90 transition-opacity shadow-sm"
          >
            <ExternalLink size={14} />
            <span className="text-xs font-bold">Google Maps</span>
          </a>
        </div>

        {/* Stop list */}
        <div className="mt-4 flex items-center overflow-x-auto no-scrollbar px-1">
          {stops.map((stop, i) => (
            <div key={stop.id || i} className="flex items-center shrink-0">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full border-2 ${
                  i === 0
                    ? 'bg-cyan-500 border-cyan-500'
                    : i === stops.length - 1
                      ? 'bg-blue-500 border-blue-500'
                      : 'bg-white border-slate-300'
                }`} />
                <span className="text-[9px] text-slate-500 mt-1.5 max-w-[52px] text-center truncate leading-tight">
                  {stop.title.length > 5 ? stop.title.slice(0, 5) + '…' : stop.title}
                </span>
              </div>
              {i < stops.length - 1 && (
                <div className="w-5 h-px bg-slate-200 mx-0.5 mb-5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
