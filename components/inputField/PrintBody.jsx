export default function PrintBody({ row, onPrint }) {
  if (!row) return null
  return (
    <div className="space-y-4 text-black">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="text-sm font-extrabold text-slate-900">প্রিন্ট প্রিভিউ</div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoRow label="পণ্য" value={row.name} />
          <InfoRow label="কোড" value={row.code || "-"} />
          <InfoRow label="মডেল" value={row.model || "-"} />
          <InfoRow label="ব্র্যান্ড" value={row.brand || "-"} />
          <InfoRow label="বারকোড" value={row.barcode || "-"} />
          <InfoRow label="বিক্রয় মূল্য" value={Number(row.salesPrice || 0).toFixed(2)} />
        </div>
      </div>

      <button
        type="button"
        onClick={onPrint}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white hover:bg-black"
      >
        <Printer className="h-5 w-5" />
        Print (window.print)
      </button>
    </div>
  )
}