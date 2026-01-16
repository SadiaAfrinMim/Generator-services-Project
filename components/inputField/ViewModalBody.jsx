export default function ViewModalBody({ row, StatusPill,InfoRow }) {
  if (!row) return null
  return (
    <div className="space-y-3 text-black">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden grid place-items-center">
            {row.imageUrl ? (
              <img src={row.imageUrl} alt={row.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs text-slate-400">No Img</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-lg font-extrabold text-slate-900 truncate">{row.name}</div>
            <div className="mt-1 text-sm font-semibold text-slate-600">
              {row.productType} • {row.category}
            </div>
          </div>
          <div className="shrink-0">
            <StatusPill status={row.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InfoRow label="কোড" value={row.code || "-"} />
        <InfoRow label="মডেল" value={row.model || "-"} />
        <InfoRow label="ব্র্যান্ড" value={row.brand || "-"} />
        <InfoRow label="বারকোড" value={row.barcode || "-"} />
        <InfoRow label="বিক্রয় মূল্য" value={Number(row.salesPrice || 0).toFixed(2)} />
        <InfoRow label="পণ্যের ধরন" value={row.productType} />
        <InfoRow label="ক্যাটাগরি" value={row.category} />
        <InfoRow label="স্ট্যাটাস" value={row.status} />
      </div>
    </div>
  )
}
