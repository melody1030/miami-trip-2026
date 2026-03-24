import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center pt-32 px-6">
      <h1 className="font-serif-tc text-5xl font-bold text-slate-300 mb-4">404</h1>
      <p className="text-slate-400 font-sans-tc mb-6">找不到此頁面</p>
      <Link
        to="/"
        className="text-sm font-medium text-slate-800 underline underline-offset-4"
      >
        返回行程
      </Link>
    </div>
  )
}
