import { useState } from "react"

export default function EmployeeForm({ mode = "add", initial, onCancel, onSubmit }) {
  const [form, setForm] = useState(
    initial || {
      name: "",
      designation: "",
      department: "",
      contact: "",
      email: "",
      status: "সক্রিয়",
    },
  )

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.designation || !form.department) {
      alert("নাম, পদ এবং বিভাগ আবশ্যক।")
      return
    }
    onSubmit(form)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">
            নাম *
          </label>
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="কর্মচারীর নাম"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">
            স্ট্যাটাস
          </label>
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-sky-200"
          >
            <option value="সক্রিয়">সক্রিয়</option>
            <option value="নিষ্ক্রিয়">নিষ্ক্রিয়</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">
            পদ *
          </label>
          <input
            value={form.designation}
            onChange={(e) => set("designation", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="যেমন: কম্পিউটার অপারেটর"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">
            বিভাগ *
          </label>
          <input
            value={form.department}
            onChange={(e) => set("department", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="যেমন: আইটি"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">
            মোবাইল
          </label>
          <input
            value={form.contact}
            onChange={(e) => set("contact", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="01XXXXXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">
            ইমেইল
          </label>
          <input
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="name@email.com"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
        >
          বাতিল
        </button>
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 px-5 py-3 text-sm font-extrabold text-white hover:opacity-90"
        >
          {mode === "add" ? "সংরক্ষণ করুন" : "আপডেট করুন"}
        </button>
      </div>
    </form>
  )
}