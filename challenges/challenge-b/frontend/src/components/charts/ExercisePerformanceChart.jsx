import { Bar } from 'react-chartjs-2'
import { chartColors } from './chartSetup'

function ExercisePerformanceChart({ sessions }) {
  const exerciseMap = new Map()

  sessions.forEach((session) => {
    session.exercises.forEach((exercise) => {
      const current = exerciseMap.get(exercise.name) || []
      current.push(exercise.accuracy_percent)
      exerciseMap.set(exercise.name, current)
    })
  })

  const labels = Array.from(exerciseMap.keys()).sort((a, b) => {
    const aAvg = average(exerciseMap.get(a))
    const bAvg = average(exerciseMap.get(b))
    return bAvg - aAvg
  })

  const data = {
    labels,
    datasets: [
      {
        label: 'Avg accuracy',
        data: labels.map((label) => average(exerciseMap.get(label))),
        backgroundColor: labels.map((_, index) => {
          const colors = [chartColors.primary, chartColors.secondary, chartColors.accent, chartColors.warning, chartColors.good]
          return colors[index % colors.length]
        }),
        borderRadius: 10,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.x.toFixed(0)}% accuracy`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  }

  return <Bar data={data} options={options} />
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

export default ExercisePerformanceChart
