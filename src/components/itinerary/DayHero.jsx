export default function DayHero({ day }) {
  if (!day.heroImage) return null

  return (
    <div className="relative w-full h-72 mt-2 px-4">
      <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-sm">
        <img
          src={day.heroImage}
          alt={day.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="font-serif-tc text-2xl font-bold text-white tracking-wide">
            {day.title}
          </h1>
        </div>
      </div>
    </div>
  )
}
