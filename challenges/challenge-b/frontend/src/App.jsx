import { useMemo } from 'react'
import Header from './components/Header'
import PatientProfileCard from './components/PatientProfileCard'
import MetricCard from './components/MetricCard'
import PanelCard from './components/PanelCard'
import SessionHistory from './components/SessionHistory'
import patientData from './data/patient_sessions.json'

function App() {
  const { patient, sessions } = patientData

  const metrics = useMemo(() => {
    const totalSessions = sessions.length
    const avgAccuracy = Math.round(
      sessions.reduce((sum, session) => sum + session.overall_progress_percent, 0) / totalSessions,
    )
    const latest = sessions[sessions.length - 1]
    const latestProgress = latest?.overall_progress_percent ?? 0
    const latestEmg = latest?.emg_quality_score ?? 0

    return [
      { title: 'Total sessions', value: totalSessions, subtitle: 'Completed over the last 3 weeks', tone: 'from-cyan-500 to-blue-500' },
      { title: 'Average progress', value: `${avgAccuracy}%`, subtitle: 'Across all tracked sessions', tone: 'from-emerald-500 to-teal-500' },
      { title: 'Latest EMG score', value: `${(latestEmg * 100).toFixed(0)}%`, subtitle: 'Readiness signal from the latest session', tone: 'from-violet-500 to-fuchsia-500' },
      { title: 'Current milestone', value: `${latestProgress}%`, subtitle: 'Overall rehabilitation progress', tone: 'from-amber-500 to-orange-500' },
    ]
  }, [sessions])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#f8fbff,_#f4f7fb_55%,_#eef4fb)] px-4 py-5 text-slate-800 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Header patient={patient} />

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <PatientProfileCard patient={patient} />
          <PanelCard title="Care focus" subtitle="Planned recovery milestones for the week" action="Next review">
            <div className="space-y-3">
              {[
                'Increase power grip stability during morning sessions',
                'Maintain steady response timing under fatigue',
                'Review comfort and fit of the prosthetic interface',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-500" />
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </PanelCard>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <PanelCard title="Progress overview" subtitle="Temporal trend placeholder for charts" action="Planned">
            <div className="flex min-h-[220px] items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center text-sm text-slate-500">
              Chart area coming soon.
            </div>
          </PanelCard>

          <PanelCard title="Latest recommendations" subtitle="Clinical guidance placeholder" action="AI-ready">
            <div className="space-y-3">
              {[
                'Increase resistance gradually to support cleaner grip transitions.',
                'Keep session load steady to reduce fatigue spikes during late reps.',
                'Continue with guided rest intervals between difficult exercises.',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </PanelCard>
        </div>

        <PanelCard title="Session history" subtitle="Recent therapy sessions and recovery milestones" action="Live data">
          <SessionHistory sessions={sessions} />
        </PanelCard>
      </div>
    </div>
  )
}

export default App
