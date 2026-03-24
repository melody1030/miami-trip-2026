const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

export default function DaySelector({ days, selectedId, onSelect }) {
  return (
    <div className="flex justify-center space-x-5 overflow-x-auto no-scrollbar px-2 pb-2">
      {days.map((day) => {
        const isActive = day.id === selectedId
        const dateObj = new Date(day.date + 'T00:00:00')
        const dateNum = dateObj.getDate()
        const weekday = WEEKDAYS[dateObj.getDay()]

        return (
          <button
            key={day.id}
            onClick={() => onSelect(day.id)}
            className="flex flex-col items-center shrink-0 group"
          >
            <span
              className={`text-xs font-medium tracking-wider mb-1 transition-colors ${
                isActive ? 'text-slate-800' : 'text-slate-400'
              }`}
            >
              Day {day.dayNumber}
            </span>
            <div
              className={`flex flex-col items-center justify-center w-12 h-14 rounded-full transition-all ${
                isActive
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'bg-transparent text-slate-500 group-hover:bg-slate-50'
              }`}
            >
              <span className="text-[10px] uppercase font-bold tracking-widest">
                {weekday}
              </span>
              <span className="font-serif-tc text-lg font-medium">{dateNum}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
