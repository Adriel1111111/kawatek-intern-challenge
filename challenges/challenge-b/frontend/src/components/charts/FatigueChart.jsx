import { Line } from 'react-chartjs-2'
import { chartColors } from './chartSetup'

function FatigueChart({ sessions }) {
  const labels = sessions.map((session) => session.date)
  const fatigueData = sessions.map((session) => {
    const averageFatigue = session.exercises.reduce((sum, exercise) => sum + exercise.fatigue_index, 0) / session.exercises.length
    return averageFatigue
  })

  const data = {
    labels,
    datasets: [
      {
        label: 'Avg fatigue',
        data: fatigueData,
        borderColor: chartColors.warning,
        backgroundColor: 'rgba(245, 158, 11, 0.16)',
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 5,
      },
      {
        label: 'Safe range',
        data: labels.map(() => 0.6),
        borderColor: chartColors.safe,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
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
          label: (context) => `${(context.parsed.y * 100).toFixed(0)}% fatigue`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          callback: (value) => `${(value * 100).toFixed(0)}%`,
        },
      },
    },
  }

  return <Line data={data} options={options} />
}

export default FatigueChart
