import { FiActivity, FiClock, FiHeart, FiTrendingUp } from 'react-icons/fi'
import ProgressChart from './charts/ProgressChart'
import RecoveryRadarChart from './charts/RecoveryRadarChart'

function ExportReportContent({ patient, metrics, summary, warnings, recommendations, sessions, latestSession, averageProgress, averageEmg, averageFatigueIndex, averageResponseTime, totalTherapyDuration }) {
  return (
    <div className="w-[900px] bg-white p-8 text-slate-800">
      <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">ActivAI care console</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">Rehabilitation summary report</h2>
        <p className="mt-2 text-sm text-slate-600">Professional export prepared from the latest rehabilitation dataset.</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[24px] border border-slate-200 bg-slate-900 p-6 text-white">
          <p className="text-sm font-medium text-cyan-200">Patient overview</p>
          <h3 className="mt-2 text-2xl font-semibold">{patient.name}</h3>
          <p className="mt-3 text-sm text-slate-300">{patient.age} years old • {patient.device} • Therapist {patient.therapist}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Patient ID</p>
              <p className="mt-1 font-semibold">{patient.id}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Started</p>
              <p className="mt-1 font-semibold">{patient.start_date}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">AI clinical intelligence</p>
          <div className="mt-3 rounded-2xl bg-cyan-50 p-4">
            <p className="text-4xl font-semibold text-slate-900">{summary.score}/100</p>
            <p className="mt-2 text-sm text-slate-700">{summary.status} • Confidence {summary.confidence}</p>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {summary.trends.map((trend) => (
              <li key={trend} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-500" />
                <span>{trend}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.title} className="rounded-[20px] border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-slate-500">{metric.title}</p>
              <div className="rounded-full bg-slate-100 p-2 text-slate-600">
                {metric.title.includes('sessions') ? <FiActivity size={15} /> : metric.title.includes('progress') ? <FiTrendingUp size={15} /> : metric.title.includes('EMG') ? <FiHeart size={15} /> : <FiClock size={15} />}
              </div>
            </div>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-600">{metric.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Progress trend</p>
          <div className="mt-3 h-[220px] w-full">
            <ProgressChart sessions={sessions} />
          </div>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Recovery radar</p>
          <div className="mt-3 h-[220px] w-full">
            <RecoveryRadarChart sessions={sessions} />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Clinical highlights</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Average progress</p>
            <p className="mt-1 font-semibold text-slate-900">{averageProgress}%</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Avg EMG</p>
            <p className="mt-1 font-semibold text-slate-900">{Math.round(averageEmg * 100)}%</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Therapy time</p>
            <p className="mt-1 font-semibold text-slate-900">{totalTherapyDuration} min</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Latest recommendations</p>
        <div className="mt-4 space-y-3">
          {recommendations.slice(0, 3).map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <span className="rounded-full bg-cyan-50 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700">{item.priority}</span>
              </div>
              <p className="mt-2 text-sm text-slate-700">{item.reason}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Latest session snapshot</p>
        <p className="mt-2 text-sm text-slate-700">
          {latestSession?.date ?? 'No session recorded yet'} • Progress {latestSession?.overall_progress_percent ?? 0}% • EMG {latestSession?.emg_quality_score?.toFixed(2) ?? '0.00'}
        </p>
      </div>
    </div>
  )
}

export default ExportReportContent
