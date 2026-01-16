export default function CustomerViewDetails({ row, InfoRow }) {
  if (!row) return null
  return (
    <div className="space-3 m-4 text-black">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white p-4 to-slate-50 p-4">
        <div className="text-lg font-extrabold text-slate-900">{row.name}</div>
        <div className="mt-1 text-sm font-semibold text-slate-600">{row.address}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InfoRow label="হিসাব নম্বর" value={row.account} />
        <InfoRow label="মিটার নম্বর" value={row.meter} />
        <InfoRow label="সর্বনিম্ন বিল" value={row.minBill} />
        <InfoRow label="বকেয়া" value={row.due} />
        <InfoRow label="সর্বশেষ রিডিং" value={row.lastReading} />
        <InfoRow label="সর্বশেষ মাস" value={row.lastMonth} />
        <InfoRow label="যোগাযোগ" value={row.contact} />
        <InfoRow label="স্ট্যাটাস" value={row.status} />
      </div>
    </div>
  )
}