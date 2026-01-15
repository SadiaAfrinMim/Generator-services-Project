import { Plus, X } from "lucide-react";

export default function ChalanNewAddField({ addForm, onAddChange, submitAdd, closeAdd }) {
  return (
    <form onSubmit={submitAdd}>
       <div className="p-5">
            <form onSubmit={submitAdd} className="space-y-4">
              {/* Top small note */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-black">
                  প্রয়োজনীয় তথ্য দিয়ে <span className="font-extrabold">সংরক্ষণ</span> করুন।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-sm font-bold text-black mb-1">
                    তারিখ *
                  </label>
                  <input
                    type="date"
                    value={addForm.date}
                    onChange={(e) => onAddChange("date", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Receipt code */}
                <div>
                  <label className="block text-sm font-bold text-black mb-1">
                    রশিদ কোড (ঐচ্ছিক)
                  </label>
                  <input
                    value={addForm.receipt}
                    onChange={(e) => onAddChange("receipt", e.target.value)}
                    placeholder="যেমন: SGINV251200xxxxx"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Customer */}
                <div>
                  <label className="block text-sm font-bold text-black mb-1">
                    গ্রাহক *
                  </label>
                  <input
                    value={addForm.customer}
                    onChange={(e) => onAddChange("customer", e.target.value)}
                    placeholder="যেমন: 25124 - শিপন সরকার ৪র্থ"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-black mb-1">
                    ফোন
                  </label>
                  <input
                    value={addForm.phone}
                    onChange={(e) => onAddChange("phone", e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-bold text-black mb-1">
                    লেনদেনের প্রকার
                  </label>
                  <select
                    value={addForm.type}
                    onChange={(e) => onAddChange("type", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="Invoice">Invoice</option>
                    <option value="Chalan">Chalan</option>
                    <option value="Receipt">Receipt</option>
                  </select>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-bold text-black mb-1">
                    পরিমাণ *
                  </label>
                  <input
                    type="number"
                    value={addForm.amount}
                    onChange={(e) => onAddChange("amount", e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* DR */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-black mb-1">
                    DR লাইন (ঐচ্ছিক)
                  </label>
                  <input
                    value={addForm.drLine}
                    onChange={(e) => onAddChange("drLine", e.target.value)}
                    placeholder="যেমন: DR-গ্রাহক হিসাব [300]"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* CR */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-black mb-1">
                    CR লাইন (ঐচ্ছিক)
                  </label>
                  <input
                    value={addForm.crLine}
                    onChange={(e) => onAddChange("crLine", e.target.value)}
                    placeholder="যেমন: CR-বিক্রয় [300]"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-2 pt-4 md:flex-row md:items-center md:justify-end">
                <button
                  type="button"
                  onClick={closeAdd}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-black hover:bg-slate-50 transition"
                >
                  <X className="h-5 w-5" />
                  বাতিল
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm hover:opacity-90 transition"
                >
                  <Plus className="h-5 w-5" />
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
      <button type="submit">সংরক্ষণ</button>
      <button type="button" onClick={closeAdd}>বাতিল</button>
    </form>
  )
}
