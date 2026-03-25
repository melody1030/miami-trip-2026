import { X, Plane, Building2, Phone, Navigation } from 'lucide-react'
import { getNavigationUrl } from '../../utils/helpers'

function formatFlightTime(isoStr) {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

function formatDate(isoStr) {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export default function ToolkitModal({ trip, isOpen, onClose }) {
  const flights = trip?.flights || []
  const accommodations = trip?.accommodations || []
  const emergencyContacts = trip?.emergencyContacts || []

  return (
    <>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2.5rem)] bg-white rounded-3xl z-40 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        } max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl`}
      >
        {/* Close button */}
        <div className="sticky top-0 z-10 flex justify-end p-3">
          <button
            onClick={onClose}
            className="p-2 bg-white/80 backdrop-blur-sm text-slate-600 rounded-full hover:bg-white active:bg-slate-100 transition-colors shadow-sm"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 pb-6 -mt-4">
          {/* Flights */}
          <Section icon={Plane} title="航班資訊">
            {flights.map((f, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-4 mb-3">
                <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">
                  {f.direction === 'outbound' ? '去程' : '回程'} {f.flightNumber}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="font-serif-tc text-xl font-bold text-slate-800">
                      {f.departure?.airport}
                    </p>
                    <p className="text-sm text-slate-500">{formatFlightTime(f.departure?.time)}</p>
                  </div>
                  <div className="flex-1 mx-4 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-1" />
                    <Plane size={16} className="text-cyan-500 -rotate-45" />
                    <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-1" />
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  </div>
                  <div className="text-center">
                    <p className="font-serif-tc text-xl font-bold text-slate-800">
                      {f.arrival?.airport}
                    </p>
                    <p className="text-sm text-slate-500">{formatFlightTime(f.arrival?.time)}</p>
                  </div>
                </div>
              </div>
            ))}
          </Section>

          {/* Accommodation */}
          <Section icon={Building2} title="住宿資訊">
            {accommodations.map((a, i) => {
              const navUrl = getNavigationUrl(a.address)
              return (
                <div key={i} className="bg-slate-50 rounded-2xl p-4 mb-3">
                  <p className="font-serif-tc text-lg font-bold text-slate-800 mb-1">{a.name}</p>
                  {a.address && (
                    <p className="text-sm text-slate-500 mb-3">{a.address}</p>
                  )}
                  <div className="flex gap-4 text-sm text-slate-600 mb-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider block">入住</span>
                      <span className="font-serif-tc">{formatDate(a.checkIn)} {formatFlightTime(a.checkIn)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider block">退房</span>
                      <span className="font-serif-tc">{formatDate(a.checkOut)} {formatFlightTime(a.checkOut)}</span>
                    </div>
                  </div>
                  {navUrl && (
                    <a
                      href={navUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full rounded-xl py-3 text-sm font-bold flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-blue-500/20 active:opacity-90 transition-opacity"
                    >
                      <Navigation size={16} />
                      <span>開啟導航</span>
                    </a>
                  )}
                </div>
              )
            })}
          </Section>

          {/* Emergency Contacts */}
          <Section icon={Phone} title="緊急聯絡">
            <div className="bg-slate-50 rounded-2xl overflow-hidden">
              {emergencyContacts.map((c, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-4 ${
                    i < emergencyContacts.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <span className="text-sm text-slate-700 font-sans-tc">{c.label}</span>
                  {c.phone ? (
                    <a
                      href={`tel:${c.phone}`}
                      className="text-sm font-bold text-cyan-600 font-serif-tc"
                    >
                      {c.phone}
                    </a>
                  ) : (
                    <span className="text-xs text-slate-300">—</span>
                  )}
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </>
  )
}

function Section({ icon: Icon, title, children }) {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <Icon size={16} className="text-slate-400" />
        <h3 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{title}</h3>
      </div>
      {children}
    </div>
  )
}
