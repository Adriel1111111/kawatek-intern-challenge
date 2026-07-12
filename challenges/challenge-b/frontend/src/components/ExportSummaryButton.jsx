import { FiFileText } from 'react-icons/fi'

function ExportSummaryButton({ onExport, isExporting }) {
  return (
    <button
      type="button"
      onClick={onExport}
      disabled={isExporting}
      aria-label="Export the current rehabilitation summary as a PDF"
      className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      <span className="inline-flex items-center gap-2">
        <FiFileText size={16} /> {isExporting ? 'Preparing PDF…' : 'Export summary'}
      </span>
    </button>
  )
}

export default ExportSummaryButton
