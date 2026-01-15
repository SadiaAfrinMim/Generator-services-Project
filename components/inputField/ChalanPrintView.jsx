import { Printer, X } from "lucide-react"

export default function ChalanPrintView({ row, onClose, onPrint, InfoRow }) {
  if (!row) return null

  return (
    <div className="p-5 text-black">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-black">প্রিন্ট প্রিভিউ</h3>
          <p className="text-sm font-semibold text-black/60">
            “Print” চাপলে window.print() হবে।
          </p>
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

      {/* Print preview area */}
      <div id="print-area" className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-extrabold text-black">চালান / রশিদ</div>
            <div className="text-sm font-semibold text-black/60">
              রশিদ: {row.id} • তারিখ: {row.date}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-extrabold text-black">
              স্ট্যাটাস: {row.status}
            </div>
            <div className="text-sm font-semibold text-black/60">
              পেমেন্ট: {row.payMethod}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <InfoRow label="গ্রাহক" value={row.customer} />
          <InfoRow label="মোবাইল" value={row.phone} />
          <InfoRow label="প্রকার" value={row.type} />
          <InfoRow label="কোড" value={row.code} />
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 p-4">
          <div className="text-sm font-extrabold text-black mb-2">লাইন</div>

          <div className="space-y-2 text-sm font-semibold text-black/80">
            <div className="rounded-xl bg-white border border-slate-200 px-4 py-3">
              {row.amountLines?.[0] ?? "—"}
            </div>
            <div className="rounded-xl bg-white border border-slate-200 px-4 py-3">
              {row.amountLines?.[1] ?? "—"}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-white border border-slate-200 px-4 py-3">
            <span className="text-sm font-extrabold text-black">মোট</span>
            <span className="text-sm font-extrabold text-black">
              {Number(row.amount || 0).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-6 text-center text-xs font-semibold text-black/60">
          ধন্যবাদ • এটি একটি কম্পিউটার জেনারেটেড রশিদ
        </div>
      </div>

      <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-black hover:bg-slate-50"
        >
          বন্ধ করুন
        </button>

        <button
          type="button"
          onClick={onPrint}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-extrabold text-white hover:opacity-90"
        >
          <Printer className="h-5 w-5" />
          Print
        </button>
      </div>
    </div>
  )
}