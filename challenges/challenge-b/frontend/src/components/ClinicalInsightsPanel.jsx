import { useMemo } from 'react'
import { FiAlertCircle, FiCpu } from 'react-icons/fi'

function ClinicalInsightsPanel({ summary, warnings, recommendations }) {
  const visibleRecommendations = useMemo(() => recommendations.slice(0, 3), [recommendations])

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[24px] border border-cyan-200/70 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-800 p-4 text-white shadow-lg shadow-slate-200/70 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">ACTIVAI Clinical Intelligence</p>
            <h4 className="mt-2 text-xl font-semibold">Overall recovery score</h4>
          </div>
          <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-cyan-100">
            {summary.status}
          </div>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <p className="text-3xl font-semibold sm:text-4xl">{summary.score} / 100</p>
            <p className="mt-2 text-sm text-cyan-100">Confidence {summary.confidence}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
              <FiCpu size={16} /> Detected trends
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {summary.trends.map((trend) => (
                <li key={trend} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {warnings.map((warning) => (
          <span
            key={warning.label}
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${warning.tone === 'danger' ? 'bg-rose-50 text-rose-700' : warning.tone === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}
          >
            {warning.label}
          </span>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {visibleRecommendations.map((item) => (
          <div key={item.title} className="rounded-[20px] border border-slate-200 bg-slate-50/80 p-4 shadow-sm shadow-slate-200/70">
            <div className="flex items-center justify-between gap-2">
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${item.priority === 'High' ? 'bg-rose-50 text-rose-700' : item.priority === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                {item.priority}
              </span>
              <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700">
                {item.category}
              </span>
            </div>

            <h5 className="mt-3 text-base font-semibold text-slate-900">{item.title}</h5>
            <p className="mt-2 text-sm leading-6 text-slate-700">{item.reason}</p>
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
              <FiAlertCircle size={15} className="text-cyan-600" />
              <span>{item.action}</span>
            </div>
          </div>
        ))}
      </div>

      {recommendations.length > 3 ? (
        <button type="button" className="w-fit rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700">
          View All Recommendations
        </button>
      ) : null}
    </div>
  )
}

export default ClinicalInsightsPanel
