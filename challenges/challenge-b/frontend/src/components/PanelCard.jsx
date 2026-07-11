function PanelCard({ title, subtitle, action, children }) {
  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/70 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
        </div>
        {action ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{action}</span> : null}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

export default PanelCard
