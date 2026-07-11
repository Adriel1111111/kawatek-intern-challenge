function SessionHistory({ sessions }) {
  return (
    <div className="space-y-3">
      {sessions.map((session) => (
        <div
          key={session.session_id}
          className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-cyan-200 hover:bg-cyan-50/40"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Session {session.session_id}</p>
              <p className="mt-1 text-sm text-slate-600">{session.date} • {session.duration_minutes} min</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-white px-3 py-1">Progress {session.overall_progress_percent}%</span>
              <span className="rounded-full bg-white px-3 py-1">EMG {session.emg_quality_score.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {session.exercises.map((exercise) => (
              <span key={exercise.name} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {exercise.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SessionHistory
