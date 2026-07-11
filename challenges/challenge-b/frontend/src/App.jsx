import { useMemo } from 'react'
import { FiActivity, FiClock, FiHeart, FiTrendingUp } from 'react-icons/fi'
import Header from './components/Header'
import PatientProfileCard from './components/PatientProfileCard'
import MetricCard from './components/MetricCard'
import PanelCard from './components/PanelCard'
import SessionHistory from './components/SessionHistory'
import ProgressChart from './components/charts/ProgressChart'
import ExercisePerformanceChart from './components/charts/ExercisePerformanceChart'
import FatigueChart from './components/charts/FatigueChart'
import EmgSparkline from './components/charts/EmgSparkline'
import RecoveryRadarChart from './components/charts/RecoveryRadarChart'
import patientData from './data/patient_sessions.json'
import { computeDashboardAnalytics, getEmgStatus, getFatigueStatus, getProgressStatus } from './utils/analytics'

function App() {
  const analytics = useMemo(() => computeDashboardAnalytics(patientData), [])
  const {
    patient,
    sessions,
    metrics,
    insights,
    averageProgress,
    averageEmg,
    averageExerciseAccuracy,
    averageFatigueIndex,
    averageResponseTime,
    progressImprovement,
    latestSession,
    earliestSession,
    totalTherapyDuration,
  } = analytics

  const summary = {
    phase: getProgressStatus(latestSession?.overall_progress_percent ?? 0),
    durationLabel: `${totalTherapyDuration} min recorded`,
    progressLabel: `${averageProgress}% avg progress`,
    emgLabel: `${Math.round((averageEmg || 0) * 100)}% avg`,
  }

  const enrichedMetrics = metrics.map((metric, index) => {
    const trendType = index === 1 || index === 2 ? 'positive' : 'positive'
    const iconMap = [FiActivity, FiTrendingUp, FiHeart, FiClock]

    return {
      ...metric,
      icon: iconMap[index],
      trend: index === 0 ? 'Live dataset' : index === 1 ? `▲ ${Math.abs(progressImprovement)}%` : index === 2 ? `▲ ${Math.round(((averageEmg || 0) - 0.75) * 100)} pts` : `▲ ${totalTherapyDuration} min`,
      trendType,
    }
  })

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#f8fbff,_#f4f7fb_55%,_#eef4fb)] px-4 py-5 text-slate-800 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Header patient={patient} summary={summary} />

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <PatientProfileCard patient={patient} />
          <PanelCard title="Care focus" subtitle="Current recovery snapshot from the latest dataset" action="Next review">
            <div className="space-y-3">
              {[
                `Progress improved by ${Math.abs(progressImprovement)}% from ${earliestSession?.date ?? 'the first session'} to ${latestSession?.date ?? 'the latest session'}.`,
                `EMG quality improved from ${(earliestSession?.emg_quality_score ?? 0).toFixed(2)} to ${(latestSession?.emg_quality_score ?? 0).toFixed(2)} across the recorded sessions.`,
                `Average exercise accuracy is ${averageExerciseAccuracy.toFixed(0)}%, with fatigue at ${averageFatigueIndex.toFixed(2)} and response time averaging ${Math.round(averageResponseTime)}ms.`,
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
          {enrichedMetrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <PanelCard title="Progress overview" subtitle="Recovery progression and exercise accuracy" action="Live chart">
            <div className="h-[270px] w-full">
              <ProgressChart sessions={sessions} />
            </div>
          </PanelCard>

          <PanelCard title="Latest recommendations" subtitle="Temporary analytics insights" action="AI-ready">
            <div className="space-y-3">
              {insights.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </PanelCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <PanelCard title="Exercise performance" subtitle="Average accuracy by exercise type" action="Sorted">
            <div className="h-[260px] w-full">
              <ExercisePerformanceChart sessions={sessions} />
            </div>
          </PanelCard>

          <PanelCard title="Fatigue trend" subtitle="Session-level fatigue and safe range" action="Clinical view">
            <div className="h-[260px] w-full">
              <FatigueChart sessions={sessions} />
            </div>
          </PanelCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          <PanelCard title="EMG quality" subtitle="Compact trend over sessions" action="Sparkline">
            <div className="h-[120px] w-full">
              <EmgSparkline sessions={sessions} />
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Current signal quality</p>
              <p className="mt-1">{getEmgStatus(latestSession?.emg_quality_score || 0)} • {(latestSession?.emg_quality_score || 0).toFixed(2)}</p>
            </div>
          </PanelCard>

          <PanelCard title="Recovery radar" subtitle="Average exercise accuracy by movement class" action="Bonus">
            <div className="h-[260px] w-full">
              <RecoveryRadarChart sessions={sessions} />
            </div>
          </PanelCard>
        </div>

        <PanelCard title="Session history" subtitle="Recent therapy sessions and recovery milestones" action="Expandable">
          <SessionHistory sessions={sessions} />
        </PanelCard>
      </div>
    </div>
  )
}

export default App
