import { Download } from "lucide-react"

export default function DownloadBody({ row, onDownload }) {
  if (!row) return null
  return (
    <div className="space-y-4 text-black">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="text-sm font-extrabold text-slate-900">ডাউনলোড CSV</div>
        <div className="mt-2 text-sm font-semibold text-slate-600">
          ফাইল: <span className="font-extrabold text-slate-900">product-{row.id}.csv</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onDownload}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3 text-sm font-extrabold text-white hover:opacity-90"
      >
        <Download className="h-5 w-5" />
        Download CSV
      </button>
    </div>
  )
}