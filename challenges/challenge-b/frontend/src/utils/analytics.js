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

const getExerciseAverages = (sessions) => {
  const exerciseMap = new Map()

  sessions.forEach((session) => {
    session.exercises.forEach((exercise) => {
      const values = exerciseMap.get(exercise.name) || []
      values.push(exercise.accuracy_percent)
      exerciseMap.set(exercise.name, values)
    })
  })

  return Array.from(exerciseMap.entries()).map(([name, values]) => ({
    name,
    averageAccuracy: average(values),
    frequency: values.length,
  }))
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
  const exerciseAverages = getExerciseAverages(sessions)

  const progressImprovement = latestProgress - earliestProgress
  const emgImprovement = latestEmg - earliestEmg

  const strongestExercise = [...exerciseAverages].sort((a, b) => b.averageAccuracy - a.averageAccuracy)[0]
  const weakestExercise = [...exerciseAverages].sort((a, b) => a.averageAccuracy - b.averageAccuracy)[0]
  const responseTrend = averageResponseTime < 450 ? 'improving' : 'stable'
  const fatigueTrend = averageFatigueIndex < 0.4 ? 'low' : averageFatigueIndex < 0.6 ? 'moderate' : 'high'
  const consistency = averageProgress >= 50 ? 'consistent' : 'building'

  const progressDifferenceLabel = progressImprovement >= 0 ? `up ${Math.abs(progressImprovement)}%` : `down ${Math.abs(progressImprovement)}%`
  const responseTimeDifference = averageResponseTime - average(sessions.flatMap((session) => session.exercises).map((exercise) => exercise.avg_response_time_ms))
  const resolvedResponseTrend = responseTimeDifference < 0 ? 'decreasing' : 'holding steady'

  const sessionCards = sessions.map((session) => {
    const sessionAverageFatigue = average(session.exercises.map((exercise) => exercise.fatigue_index))

    return {
      ...session,
      progressStatus: getProgressStatus(session.overall_progress_percent),
      emgStatus: getEmgStatus(session.emg_quality_score),
      fatigueStatus: getFatigueStatus(sessionAverageFatigue),
    }
  })

  const recommendations = [
    {
      priority: 'High',
      category: 'Recovery',
      title: 'Maintain current recovery cadence',
      reason: progressImprovement > 0
        ? `Progress has improved by ${Math.abs(progressImprovement)}% between the first and latest sessions.`
        : 'Progress requires a steadier training pattern to build momentum.',
      benefit: 'Preserves the recovery trend while reinforcing measurable gains.',
      action: 'Continue the current progression plan and monitor weekly milestones.',
    },
    {
      priority: averageEmg > 0.85 ? 'Medium' : 'High',
      category: 'EMG',
      title: averageEmg > 0.85 ? 'Reinforce signal stability' : 'Support EMG signal consistency',
      reason: averageEmg > 0.85
        ? `Average EMG quality is strong at ${Math.round(averageEmg * 100)}%.`
        : `Average EMG quality is ${Math.round(averageEmg * 100)}%, leaving room for steadier signal quality.`,
      benefit: 'Improves signal reliability and session readiness.',
      action: 'Keep rest intervals consistent and avoid overloading the final reps.',
    },
    {
      priority: averageFatigueIndex > 0.5 ? 'High' : 'Medium',
      category: 'Fatigue',
      title: averageFatigueIndex > 0.5 ? 'Reduce fatigue accumulation' : 'Maintain fatigue within a healthy range',
      reason: `Average fatigue is ${fatigueTrend} at ${roundTo(averageFatigueIndex, 2)} across the recorded exercises.`,
      benefit: 'Helps preserve endurance and improve exercise quality over time.',
      action: 'Adjust workload slightly if fatigue rises during the final set.',
    },
    {
      priority: averageResponseTime > 450 ? 'Medium' : 'Low',
      category: 'Performance',
      title: averageResponseTime > 450 ? 'Sharpen response timing' : 'Sustain efficient response timing',
      reason: `Average response time is ${Math.round(averageResponseTime)}ms, and the trend is ${resolvedResponseTrend}.`,
      benefit: 'Improves responsiveness and execution precision.',
      action: 'Focus on smoother, deliberate movement during the first three repetitions.',
    },
    {
      priority: strongestExercise && weakestExercise && strongestExercise.averageAccuracy - weakestExercise.averageAccuracy > 10 ? 'Medium' : 'Low',
      category: 'Exercise',
      title: 'Balance exercise focus',
      reason: strongestExercise && weakestExercise
        ? `${strongestExercise.name} is strongest at ${Math.round(strongestExercise.averageAccuracy)}%, while ${weakestExercise.name} trails at ${Math.round(weakestExercise.averageAccuracy)}%.`
        : 'Exercise accuracy is being tracked across the full therapy plan.',
      benefit: 'Improves overall movement balance across the rehabilitation program.',
      action: 'Allocate extra attention to the weaker exercise during the next block.',
    },
  ]

  const recoveryScore = roundTo(
    Math.min(95, 78 + progressImprovement * 0.4 + emgImprovement * 22 + (averageEmg > 0.8 ? 5 : 0) + (averageFatigueIndex < 0.5 ? 4 : 0)),
    0,
  )

  const warnings = []
  if (averageFatigueIndex > 0.5) warnings.push({ label: 'High Fatigue', tone: 'danger' })
  if (averageResponseTime > 500) warnings.push({ label: 'Response Slowing', tone: 'danger' })
  if (averageEmg < 0.75) warnings.push({ label: 'Weak EMG', tone: 'danger' })
  if (recoveryScore >= 85) warnings.push({ label: 'Excellent Recovery', tone: 'success' })
  if (consistency === 'building') warnings.push({ label: 'Needs Review', tone: 'warning' })

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
    exerciseAverages,
    strongestExercise,
    weakestExercise,
    recoveryScore,
    warnings,
    insights: [
      `Progress has improved by ${Math.abs(progressImprovement)}% since rehabilitation started.`,
      latestEmg >= earliestEmg ? 'EMG quality has improved steadily.' : 'EMG quality needs continued attention.',
      averageFatigueIndex < 0.4 ? 'Average fatigue remains low.' : averageFatigueIndex < 0.6 ? 'Average fatigue is moderate.' : 'Average fatigue remains elevated.',
      `Response time is ${resolvedResponseTrend}.`,
      strongestExercise ? `${strongestExercise.name} accuracy is consistently strongest.` : 'Exercise accuracy is being monitored closely.',
    ],
    recommendations,
    summary: {
      score: recoveryScore,
      status: recoveryScore >= 85 ? 'Excellent Progress' : recoveryScore >= 70 ? 'Steady Improvement' : 'Needs Review',
      confidence: `${Math.round(Math.min(99, 90 + recoveryScore / 10))}%`,
      trends: [
        latestEmg >= earliestEmg ? 'Improving EMG' : 'EMG requires attention',
        averageFatigueIndex < 0.5 ? 'Stable recovery' : 'Fatigue monitoring needed',
        averageFatigueIndex < 0.5 ? 'Lower fatigue' : 'Higher fatigue',
        averageResponseTime < 450 ? 'Better response time' : 'Response time trending steady',
      ],
    },
  }
}
