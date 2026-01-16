export default function EmployeeView({ row, Field }) {
  if (!row) return null
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 text-white flex items-center justify-center font-extrabold">
            {row?.name?.charAt(0) || "E"}
          </div>
          <div className="min-w-0">
            <div className="text-lg font-extrabold text-slate-900 truncate">
              {row.name}
            </div>
            <div className="text-sm font-semibold text-slate-600">
              ID: {row.id} • {row.status}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="পদ" value={row.designation} />
        <Field label="বিভাগ" value={row.department} />
        <Field label="মোবাইল" value={row.contact} />
        <Field label="ইমেইল" value={row.email} />
      </div>
    </div>
  )
}