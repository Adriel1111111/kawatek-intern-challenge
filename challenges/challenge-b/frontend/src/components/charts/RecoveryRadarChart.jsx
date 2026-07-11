import { Radar } from 'react-chartjs-2'
import { chartColors } from './chartSetup'

function RecoveryRadarChart({ sessions }) {
  const exerciseNames = ['Power Grip Training', 'Pinch Control', 'Lateral Grip', 'Point Control']
  const averages = exerciseNames.map((name) => {
    const matches = sessions.flatMap((session) => session.exercises).filter((exercise) => exercise.name === name)
    const total = matches.reduce((sum, exercise) => sum + exercise.accuracy_percent, 0)
    return matches.length ? total / matches.length : 0
  })

  const data = {
    labels: exerciseNames,
    datasets: [
      {
        label: 'Average accuracy',
        data: averages,
        backgroundColor: 'rgba(15, 118, 110, 0.18)',
        borderColor: chartColors.primary,
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          display: false,
        },
      },
    },
  }

  return <Radar data={data} options={options} />
}

export default RecoveryRadarChart
