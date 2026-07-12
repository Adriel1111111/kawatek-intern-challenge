function PatientProfileCard({ patient }) {
  const safePatient = patient ?? {}
  const name = safePatient.name || 'Patient profile'
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((piece) => piece[0])
    .join('')

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-800 p-6 text-white shadow-lg shadow-slate-200/80">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-lg font-semibold">
            {initials || 'P'}
          </div>
          <div>
            <p className="text-sm font-medium text-cyan-100">Care profile</p>
            <h2 className="mt-1 text-2xl font-semibold">{name}</h2>
            <p className="mt-2 text-sm text-slate-200">
              {safePatient.age ?? 'Age unavailable'} years old • {safePatient.device ?? 'Device unavailable'}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm">
          <p className="text-cyan-100">Primary therapist</p>
          <p className="mt-1 font-semibold">{safePatient.therapist ?? 'Therapist pending'}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <div className="rounded-2xl bg-white/10 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Patient ID</p>
          <p className="mt-1 font-semibold">{safePatient.id ?? 'Unavailable'}</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Age</p>
          <p className="mt-1 font-semibold">{safePatient.age ?? 'N/A'}</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Device</p>
          <p className="mt-1 font-semibold">{safePatient.device ?? 'N/A'}</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Started</p>
          <p className="mt-1 font-semibold">{safePatient.start_date ?? 'Pending'}</p>
        </div>
      </div>
    </section>
  )
}

export default PatientProfileCard
