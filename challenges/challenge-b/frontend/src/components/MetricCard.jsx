import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi'

function MetricCard({ title, value, subtitle, tone, trend, trendType, icon: Icon }) {
  const isPositive = trendType === 'positive'

  return (
    <div className="group rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/70 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className={`mb-4 h-2 w-16 rounded-full bg-gradient-to-r ${tone}`} />
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={`rounded-full p-2 ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {isPositive ? <FiArrowUpRight size={16} /> : <FiArrowDownRight size={16} />}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        {Icon ? <Icon className="text-slate-500" size={18} /> : null}
        <p className="text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm">
        <span className={`font-semibold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>{trend}</span>
        <span className="text-slate-600">{subtitle}</span>
      </div>
    </div>
  )
}

export default MetricCard
