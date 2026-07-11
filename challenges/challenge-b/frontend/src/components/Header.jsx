import { FiActivity, FiClock, FiFileText } from 'react-icons/fi'

function Header({ patient, summary }) {
  return (
    <header className="rounded-[28px] border border-slate-200/80 bg-white/80 p-5 shadow-sm shadow-slate-200/70 backdrop-blur sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">ActivAI care console</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Rehabilitation dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            A calm, clinical view of therapy progress, readiness, and upcoming milestones.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Patient</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{patient.id}</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <FiActivity size={16} className="text-cyan-600" />
            <span>{summary.phase}</span>
          </div>
          <button className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            <span className="inline-flex items-center gap-2">
              <FiFileText size={16} /> Export summary
            </span>
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
          <span className="mr-2 inline-flex items-center"><FiClock size={12} /></span>
          {summary.durationLabel}
        </span>
        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          {summary.progressLabel}
        </span>
        <span className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
          EMG {summary.emgLabel}
        </span>
      </div>
    </header>
  )
}

export default Header
