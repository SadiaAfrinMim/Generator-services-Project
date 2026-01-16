export default function DeleteConfirm({ row, onCancel, onConfirm }) {
  if (!row) return null
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
        <div className="text-base font-extrabold text-red-700">
          আপনি কি নিশ্চিত?
        </div>
        <div className="mt-1 text-sm font-semibold text-red-700/80">
          <span className="font-extrabold">{row.name}</span> কে ডিলিট করলে আর ফেরত
          আনা যাবে না।
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
        >
          বাতিল
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-xl bg-red-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-red-700"
        >
          ডিলিট করুন
        </button>
      </div>
    </div>
  )
}