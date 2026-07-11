function MetricCard({ title, value, subtitle, tone }) {
  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/70">
      <div className={`mb-4 h-2 w-16 rounded-full bg-gradient-to-r ${tone}`} />
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
    </div>
  )
}

export default MetricCard
