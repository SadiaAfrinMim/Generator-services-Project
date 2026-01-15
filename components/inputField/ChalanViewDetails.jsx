import { FileText,X } from "lucide-react"

export default function ChalanViewDetails({ row , InfoRow , onClose,activeRow }) {
  if (!activeRow) return null

  return (
    <div className="p-5 text-black">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-extrabold text-black">
              চালান / রশিদ বিস্তারিত
            </h3>
            <p className="text-sm font-semibold text-black/60">
              রশিদ: {row.id} • {row.date}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-black hover:bg-slate-50"
          title="বন্ধ করুন"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <InfoRow label="রশিদ নাম্বার" value={row.id} />
        <InfoRow label="তারিখ" value={row.date} />
        <InfoRow label="লেনদেনের প্রকার" value={row.type} />
        <InfoRow label="কোড" value={row.code} />
        <InfoRow label="গ্রাহক" value={row.customer} />
        <InfoRow label="মোবাইল" value={row.phone} />
        <InfoRow label="স্ট্যাটাস" value={row.status} />
        <InfoRow label="পেমেন্ট মেথড" value={row.payMethod} />
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="text-sm font-extrabold text-black mb-2">
          অ্যাকাউন্টিং লাইন
        </div>

        <div className="space-y-2 text-sm font-semibold text-black/80">
          <div className="rounded-xl bg-white border border-slate-200 px-4 py-3">
            {row.amountLines?.[0] ?? "—"}
          </div>
          <div className="rounded-xl bg-white border border-slate-200 px-4 py-3">
            {row.amountLines?.[1] ?? "—"}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl bg-white border border-slate-200 px-4 py-3">
          <span className="text-sm font-extrabold text-black">মোট পরিমাণ</span>
          <span className="text-sm font-extrabold text-black">
            {Number(row.amount || 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}