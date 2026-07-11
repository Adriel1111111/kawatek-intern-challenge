function Header({ patient }) {
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
          <button className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Export summary
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
