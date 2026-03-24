import { Routes, Route, NavLink } from 'react-router-dom'
import { MapPin, Briefcase } from 'lucide-react'
import Itinerary from './pages/Itinerary'
import Toolkit from './pages/Toolkit'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="relative w-full max-w-md mx-auto h-[100dvh] bg-white overflow-hidden shadow-2xl sm:rounded-3xl sm:h-[850px] sm:my-8 border border-slate-100 font-sans-tc flex flex-col">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <Routes>
          <Route path="/" element={<Itinerary />} />
          <Route path="/toolkit" element={<Toolkit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Bottom tab bar */}
      <nav className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-6 pb-[env(safe-area-inset-bottom)] z-20">
        <div className="flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-3 transition-colors ${
                isActive ? 'text-slate-800' : 'text-slate-400'
              }`
            }
          >
            <MapPin size={20} />
            <span className="text-[10px] mt-1 font-medium tracking-wide">每日行程</span>
          </NavLink>
          <NavLink
            to="/toolkit"
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-3 transition-colors ${
                isActive ? 'text-slate-800' : 'text-slate-400'
              }`
            }
          >
            <Briefcase size={20} />
            <span className="text-[10px] mt-1 font-medium tracking-wide">旅行工具</span>
          </NavLink>
        </div>
      </nav>
    </div>
  )
}
