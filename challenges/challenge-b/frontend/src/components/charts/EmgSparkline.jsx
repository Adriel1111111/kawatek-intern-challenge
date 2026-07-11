import { Line } from 'react-chartjs-2'
import { chartColors } from './chartSetup'

function EmgSparkline({ sessions }) {
  const data = {
    labels: sessions.map((session) => session.session_id),
    datasets: [
      {
        data: sessions.map((session) => session.emg_quality_score),
        borderColor: chartColors.good,
        backgroundColor: 'rgba(34, 197, 85, 0.16)',
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        min: 0,
        max: 1,
      },
    },
    elements: {
      line: {
        borderCapStyle: 'round',
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  }

  return <Line data={data} options={options} />
}

export default EmgSparkline
