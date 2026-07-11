import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
)

export const chartColors = {
  primary: '#0f766e',
  secondary: '#38bdf8',
  accent: '#8b5cf6',
  danger: '#f97316',
  safe: '#cbd5e1',
  good: '#22c55e',
  warning: '#f59e0b',
}
