
export default function CustomerAddForm({ value, onChange, onClose, onSubmit,STATUSES}) {
  const set = (k, v) => onChange((p) => ({ ...p, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    if (!value.name || !value.account || !value.meter) {
      alert("গ্রাহক নাম, হিসাব নম্বর, মিটার নম্বর আবশ্যক।")
      return
    }
    onSubmit()
  }

  return (
    <form onSubmit={submit} className="space-y-4 p-6 text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">গ্রাহক নাম *</label>
          <input
            value={value.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="যেমন: রহমান ট্রেডার্স"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">স্ট্যাটাস</label>
          <select
            value={value.status}
            onChange={(e) => set("status", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-200"
          >
            {STATUSES.filter((s) => s !== "সব গুলো").map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-extrabold text-slate-900 mb-1">ঠিকানা</label>
          <input
            value={value.address}
            onChange={(e) => set("address", e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="ঠিকানা"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">হিসাব নম্বর *</label>
          <input
            value={value.account}
            onChange={(e) => set("account", e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="24178"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">মিটার নম্বর *</label>
          <input
            value={value.meter}
            onChange={(e) => set("meter", e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="14427"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">সর্বনিম্ন বিল</label>
          <input
            type="number"
            value={value.minBill}
            onChange={(e) => set("minBill", e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">বকেয়া</label>
          <input
            type="number"
            value={value.due}
            onChange={(e) => set("due", e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">সর্বশেষ রিডিং</label>
          <input
            type="number"
            value={value.lastReading}
            onChange={(e) => set("lastReading", e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">সর্বশেষ মাস</label>
          <input
            value={value.lastMonth}
            onChange={(e) => set("lastMonth", e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="December 2025"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-extrabold text-slate-900 mb-1">যোগাযোগ</label>
          <input
            value={value.contact}
            onChange={(e) => set("contact", e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="01XXXXXXXXX"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end pt-1">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
        >
          বাতিল
        </button>
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3 text-sm font-extrabold text-white hover:opacity-90"
        >
          সংরক্ষণ করুন
        </button>
      </div>
    </form>
  )
}
