import { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

function SessionHistory({ sessions }) {
  const [openSession, setOpenSession] = useState(sessions[0]?.session_id ?? null)

  const toggleSession = (sessionId) => {
    setOpenSession((current) => (current === sessionId ? null : sessionId))
  }

  return (
    <div className="space-y-3">
      {sessions.map((session) => {
        const isOpen = openSession === session.session_id

        return (
          <div
            key={session.session_id}
            className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-cyan-200 hover:bg-cyan-50/40"
          >
            <button
              type="button"
              className="flex w-full flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-between"
              onClick={() => toggleSession(session.session_id)}
              aria-expanded={isOpen}
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">Session {session.session_id}</p>
                <p className="mt-1 text-sm text-slate-600">{session.date} • {session.duration_minutes} min</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span className="rounded-full bg-white px-3 py-1">Progress {session.overall_progress_percent}%</span>
                <span className="rounded-full bg-white px-3 py-1">EMG {session.emg_quality_score.toFixed(2)}</span>
                {isOpen ? <FiChevronUp className="text-slate-500" /> : <FiChevronDown className="text-slate-500" />}
              </div>
            </button>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
                {session.progressStatus}
              </span>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                {session.emgStatus}
              </span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                {session.fatigueStatus}
              </span>
            </div>

            {isOpen ? (
              <div className="mt-4 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Exercises</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {session.exercises.map((exercise) => (
                      <span key={exercise.name} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                        {exercise.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Accuracy</p>
                    <p className="mt-1 font-semibold">{session.exercises.map((exercise) => exercise.accuracy_percent).reduce((sum, value) => sum + value, 0) / session.exercises.length}%</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Fatigue</p>
                    <p className="mt-1 font-semibold">{(session.exercises.reduce((sum, exercise) => sum + exercise.fatigue_index, 0) / session.exercises.length).toFixed(2)}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Response</p>
                    <p className="mt-1 font-semibold">{Math.round(session.exercises.reduce((sum, exercise) => sum + exercise.avg_response_time_ms, 0) / session.exercises.length)} ms</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Reps</p>
                    <p className="mt-1 font-semibold">{session.exercises.reduce((sum, exercise) => sum + exercise.repetitions, 0)}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export default SessionHistory
