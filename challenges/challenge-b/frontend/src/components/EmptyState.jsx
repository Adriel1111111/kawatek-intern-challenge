function EmptyState({ title, message }) {
  return (
    <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center text-sm text-slate-700">
      <p className="text-base font-semibold text-slate-900">{title}</p>
      <p className="mt-2">{message}</p>
    </div>
  )
}

export default EmptyState
