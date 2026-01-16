import { Printer } from "lucide-react"

export default function PrintView({ row, onPrint, Field }) {
  if (!row) return null
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="text-sm font-extrabold text-slate-900">প্রিন্ট প্রিভিউ</div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="নাম" value={row.name} />
          <Field label="পদ" value={row.designation} />
          <Field label="বিভাগ" value={row.department} />
          <Field label="মোবাইল" value={row.contact} />
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