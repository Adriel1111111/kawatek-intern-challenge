const roundTo = (value, digits = 0) => Number.parseFloat(value.toFixed(digits))

const average = (values) => {
  if (!values.length) return 0
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

export const getProgressStatus = (value) => {
  if (value <= 30) return 'Early Recovery'
  if (value <= 60) return 'Improving'
  if (value <= 80) return 'On Track'
  return 'Excellent'
}

export const getEmgStatus = (value) => {
  if (value < 0.75) return 'Weak Signal'
  if (value <= 0.85) return 'Stable'
  return 'Excellent'
}

export const getFatigueStatus = (value) => {
  if (value > 0.6) return 'High Fatigue'
  if (value >= 0.4) return 'Moderate'
  return 'Low'
}

export const computeDashboardAnalytics = (patientData) => {
  const sessions = patientData.sessions.map((session) => ({
    ...session,
    exercises: session.exercises.map((exercise) => ({ ...exercise })),
  }))

  const allExercises = sessions.flatMap((session) => session.exercises)
  const totalSessions = sessions.length
  const latestSession = sessions[sessions.length - 1]
  const earliestSession = sessions[0]

  const latestProgress = latestSession?.overall_progress_percent ?? 0
  const earliestProgress = earliestSession?.overall_progress_percent ?? latestProgress
  const averageProgress = roundTo(average(sessions.map((session) => session.overall_progress_percent)), 0)

  const latestEmg = latestSession?.emg_quality_score ?? 0
  const earliestEmg = earliestSession?.emg_quality_score ?? latestEmg
  const averageEmg = average(sessions.map((session) => session.emg_quality_score))

  const averageExerciseAccuracy = average(allExercises.map((exercise) => exercise.accuracy_percent))
  const averageFatigueIndex = average(allExercises.map((exercise) => exercise.fatigue_index))
  const averageResponseTime = average(allExercises.map((exercise) => exercise.avg_response_time_ms))
  const totalTherapyDuration = sessions.reduce((sum, session) => sum + session.duration_minutes, 0)

  const progressImprovement = latestProgress - earliestProgress
  const emgImprovement = latestEmg - earliestEmg

  const strongestExercise = allExercises.reduce((best, current) => {
    const bestAverage = best?.accuracy_percent ?? -Infinity
    return current.accuracy_percent > bestAverage ? current : best
  }, null)

  const progressDifferenceLabel = progressImprovement >= 0 ? `up ${Math.abs(progressImprovement)}%` : `down ${Math.abs(progressImprovement)}%`
  const responseTimeDifference = averageResponseTime - average(allExercises.map((exercise) => exercise.avg_response_time_ms))
  const responseTrend = responseTimeDifference < 0 ? 'decreasing' : 'holding steady'

  const sessionCards = sessions.map((session) => {
    const sessionAverageFatigue = average(session.exercises.map((exercise) => exercise.fatigue_index))

    return {
      ...session,
      progressStatus: getProgressStatus(session.overall_progress_percent),
      emgStatus: getEmgStatus(session.emg_quality_score),
      fatigueStatus: getFatigueStatus(sessionAverageFatigue),
    }
  })

  return {
    patient: patientData.patient,
    sessions: sessionCards,
    metrics: [
      {
        title: 'Total sessions',
        value: totalSessions,
        subtitle: 'Completed over the last 3 weeks',
        tone: 'from-cyan-500 to-blue-500',
      },
      {
        title: 'Latest progress',
        value: `${latestProgress}%`,
        subtitle: `Progress ${progressDifferenceLabel} from the first session`,
        tone: 'from-emerald-500 to-teal-500',
      },
      {
        title: 'Average EMG',
        value: `${Math.round(averageEmg * 100)}%`,
        subtitle: 'Across all completed sessions',
        tone: 'from-violet-500 to-fuchsia-500',
      },
      {
        title: 'Therapy time',
        value: `${totalTherapyDuration} min`,
        subtitle: 'Total recorded training duration',
        tone: 'from-amber-500 to-orange-500',
      },
    ],
    latestProgress,
    averageProgress,
    latestEmg,
    averageEmg,
    averageExerciseAccuracy,
    averageFatigueIndex,
    averageResponseTime,
    totalTherapyDuration,
    latestSession,
    earliestSession,
    progressImprovement,
    emgImprovement,
    insights: [
      `Progress has improved by ${Math.abs(progressImprovement)}% since rehabilitation started.`,
      latestEmg >= earliestEmg ? 'EMG quality has improved steadily.' : 'EMG quality needs continued attention.',
      averageFatigueIndex < 0.4 ? 'Average fatigue remains low.' : averageFatigueIndex < 0.6 ? 'Average fatigue is moderate.' : 'Average fatigue remains elevated.',
      `Response time is ${responseTrend}.`,
      strongestExercise ? `${strongestExercise.name} accuracy is consistently strongest.` : 'Exercise accuracy is being monitored closely.',
    ],
  }
}
