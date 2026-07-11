import { Line } from 'react-chartjs-2'
import { chartColors } from './chartSetup'

function ProgressChart({ sessions }) {
  const labels = sessions.map((session) => session.date)
  const progressData = sessions.map((session) => session.overall_progress_percent)
  const accuracyData = sessions.map((session) => {
    const averageAccuracy = session.exercises.reduce((sum, exercise) => sum + exercise.accuracy_percent, 0) / session.exercises.length
    return averageAccuracy
  })

  const data = {
    labels,
    datasets: [
      {
        label: 'Rehab progress',
        data: progressData,
        borderColor: chartColors.primary,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart
          if (!chartArea) return chartColors.primary
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, 'rgba(15, 118, 110, 0.28)')
          gradient.addColorStop(1, 'rgba(15, 118, 110, 0.02)')
          return gradient
        },
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 5,
      },
      {
        label: 'Avg accuracy',
        data: accuracyData,
        borderColor: chartColors.secondary,
        backgroundColor: 'transparent',
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  }

  return <Line data={data} options={options} />
}

export default ProgressChart
