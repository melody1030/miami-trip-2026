import { Routes, Route } from 'react-router-dom'
import Itinerary from './pages/Itinerary'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="relative w-full max-w-md mx-auto h-[100dvh] bg-white overflow-hidden shadow-2xl sm:rounded-3xl sm:h-[850px] sm:my-8 border border-slate-100 font-sans-tc flex flex-col">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <Routes>
          <Route path="/" element={<Itinerary />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}
