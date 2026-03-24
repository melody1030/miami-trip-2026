import { Briefcase } from 'lucide-react'

export default function Toolkit() {
  return (
    <div className="pt-14 px-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-slate-100 p-2.5 rounded-full">
          <Briefcase size={20} className="text-slate-700" />
        </div>
        <h1 className="font-serif-tc text-2xl font-bold text-slate-800">
          旅行工具
        </h1>
      </div>
      <p className="text-slate-400 font-sans-tc">即將推出...</p>
    </div>
  )
}
