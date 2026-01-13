import { useMemo, useState } from "react"

export default function ProductServicesAdd({ onSave }) {
  // ====== Demo options (তুমি API/DB থেকে আনতে পারো) ======
  const typeOptions = ["Select One", "পণ্য", "সেবা"]
  const categoryOptions = ["Select One", "জেনারেটর", "পার্টস", "সার্ভিস চার্জ", "অন্যান্য"]
  const warrantyTypeOptions = ["Select One", "দিন", "মাস", "বছর"]
  const incomeAccountOptions = ["বিক্রয়", "সেবা আয়", "অন্যান্য"]

  // ====== Form state ======
  const [form, setForm] = useState({
    type: "Select One",
    code: "জেনার-13",
    name: "১০ টাকা এক ইউনিট",
    category: "Select One",
    barcode: "",
    sellToCustomer: true,

    saleRate: "10",
    srp: "",
    warranty: "0",
    warrantyType: "Select One",
    taxRate: "",
    incomeAccount: "বিক্রয়",

    purchaseFromVendor: false,
    description: "",
  })

  const [file, setFile] = useState(null)

  const previewUrl = useMemo(() => {
    if (!file) return ""
    return URL.createObjectURL(file)
  }, [file])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }))
  }

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = { ...form, image: file }
    onSave?.(payload)
    // চাইলে reset করতে পারো
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1200px] px-4 py-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-lg font-bold text-slate-900">হালনাগাদ পণ্য এবং সেবা</h1>

          <div className="text-sm text-slate-500">
            <span className="text-blue-600 hover:underline cursor-pointer">ড্যাশবোর্ড</span>
            <span className="mx-2">/</span>
            <span className="text-blue-600 hover:underline cursor-pointer">পণ্য এবং সেবাতালিকা</span>
            <span className="mx-2">/</span>
            <span className="text-blue-600">অ্যাড নিউ</span>
          </div>
        </div>

        {/* Main card */}
        <form onSubmit={handleSubmit} className="mt-3 rounded border border-slate-200 bg-white shadow-sm">
          <div className="p-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              {/* Left form */}
              <div className="lg:col-span-9">
                {/* Row 1 */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div>
                    <label className="text-sm font-semibold text-slate-700">পণ্য এবং সেবা টাইপ*</label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="mt-1 h-9 w-full rounded border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400"
                    >
                      {typeOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">কোড</label>
                    <input
                      name="code"
                      value={form.code}
                      onChange={handleChange}
                      className="mt-1 h-9 w-full rounded border border-slate-200 px-3 text-sm outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">নাম</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="mt-1 h-9 w-full rounded border border-slate-200 px-3 text-sm outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-slate-700">বিভাগ</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="mt-1 h-9 w-full rounded border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400"
                    >
                      {categoryOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">বারকোড</label>
                    <input
                      name="barcode"
                      value={form.barcode}
                      onChange={handleChange}
                      placeholder="Enter..."
                      className="mt-1 h-9 w-full rounded border border-slate-200 px-3 text-sm outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                {/* Checkbox: sell to customer */}
                <div className="mt-3 flex items-center gap-2">
                  <input
                    id="sellToCustomer"
                    type="checkbox"
                    name="sellToCustomer"
                    checked={form.sellToCustomer}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  <label htmlFor="sellToCustomer" className="text-sm text-slate-700">
                    আমি এই পণ্য/সেবা আমার গ্রাহকের কাছে বিক্রি করি
                  </label>
                </div>
              </div>

              {/* Right image upload */}
              <div className="lg:col-span-3">
                <div className="h-full rounded border border-slate-200 bg-white">
                  <div className="h-28 w-full bg-slate-50 border-b border-slate-200 grid place-items-center">
                    {previewUrl ? (
                      <img src={previewUrl} alt="preview" className="h-24 w-24 rounded object-cover" />
                    ) : (
                      <div className="h-16 w-16 rounded bg-slate-200" />
                    )}
                  </div>

                  <div className="p-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFile}
                      className="block w-full text-sm text-slate-600 file:mr-3 file:rounded file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Blue section: Price and sales info */}
            <div className="mt-4 rounded border border-slate-200 overflow-hidden">
              <div className="bg-blue-600 px-4 py-2 text-sm font-bold text-white">মূল্য এবং বিক্রয় তথ্য</div>

              <div className="p-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
                  <div className="md:col-span-1">
                    <label className="text-sm font-semibold text-slate-700">বিক্রয় মূল্য/হার</label>
                    <input
                      name="saleRate"
                      value={form.saleRate}
                      onChange={handleChange}
                      className="mt-1 h-9 w-full rounded border border-slate-200 px-3 text-sm outline-none focus:border-blue-400"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-sm font-semibold text-slate-700">এস আর পি</label>
                    <input
                      name="srp"
                      value={form.srp}
                      onChange={handleChange}
                      placeholder="Enter..."
                      className="mt-1 h-9 w-full rounded border border-slate-200 px-3 text-sm outline-none focus:border-blue-400"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-sm font-semibold text-slate-700">Warranty</label>
                    <input
                      name="warranty"
                      value={form.warranty}
                      onChange={handleChange}
                      className="mt-1 h-9 w-full rounded border border-slate-200 px-3 text-sm outline-none focus:border-blue-400"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-sm font-semibold text-slate-700">&nbsp;</label>
                    <select
                      name="warrantyType"
                      value={form.warrantyType}
                      onChange={handleChange}
                      className="mt-1 h-9 w-full rounded border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400"
                    >
                      {warrantyTypeOptions.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-sm font-semibold text-slate-700">করেরহার(%)</label>
                    <input
                      name="taxRate"
                      value={form.taxRate}
                      onChange={handleChange}
                      placeholder="Enter..."
                      className="mt-1 h-9 w-full rounded border border-slate-200 px-3 text-sm outline-none focus:border-blue-400"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-sm font-semibold text-slate-700">আয় হিসাব</label>
                    <select
                      name="incomeAccount"
                      value={form.incomeAccount}
                      onChange={handleChange}
                      className="mt-1 h-9 w-full rounded border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400"
                    >
                      {incomeAccountOptions.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase from vendor */}
            <div className="mt-4 flex items-center gap-2">
              <input
                id="purchaseFromVendor"
                type="checkbox"
                name="purchaseFromVendor"
                checked={form.purchaseFromVendor}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300"
              />
              <label htmlFor="purchaseFromVendor" className="text-sm text-slate-700">
                I Purchase This Product/Service From A Vendor
              </label>
            </div>

            {/* Description */}
            <div className="mt-3">
              <label className="text-sm font-semibold text-slate-700">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="mt-1 h-28 w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
              />
            </div>

            {/* Save button */}
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="rounded bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
