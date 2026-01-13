import { useMemo, useState } from "react"
import { Search, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import Modal from "../inputField/Modal"
import ProductServicesAdd from "../inputField/ProductServicesAdd"

const demoData = [
  {
    id: 1,
    name: "১০ টাকা এক ইউন্ডিট",
    model: "",
    code: "এরিয়া-13",
    brand: "",
    productType: "All",
    category: "All",
    barcode: "",
    salesPrice: 10.0,
    status: "Active",
    imageUrl: "",
  },
  {
    id: 2,
    name: "৮৫ টাকা এক ইউন্ডিট",
    model: "",
    code: "",
    brand: "",
    productType: "All",
    category: "All",
    barcode: "",
    salesPrice: 85.0,
    status: "Active",
    imageUrl: "",
  },
  {
    id: 3,
    name: "১৫০ টাকা এক ইউন্ডিট",
    model: "X-100",
    code: "P-150",
    brand: "ABC",
    productType: "Service",
    category: "Repair",
    barcode: "1234567890",
    salesPrice: 150.0,
    status: "Inactive",
    imageUrl: "",
  },
]

// চাইলে এগুলোও পুরো বাংলা করে দিতে পারি, তবে তোমার ডেটার সাথে মিল রাখতে ইংরেজি রেখেছি
const PRODUCT_TYPES = ["All", "Product", "Service"]
const CATEGORIES = ["All", "Repair", "Parts", "Accessories"]
const STATUSES = ["All", "Active", "Inactive"]

function PageBtn({ active, children, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={[
        "h-9 min-w-9 rounded border px-2 text-sm font-semibold transition",
        active ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
        disabled ? "opacity-50 cursor-not-allowed" : "",
      ].join(" ")}
    >
      {children}
    </button>
  )
}

export default function ProductServices() {
  // filters
  const [productType, setProductType] = useState("All")
  const [code, setCode] = useState("")
  const [productName, setProductName] = useState("")
  const [category, setCategory] = useState("All")
  const [barcode, setBarcode] = useState("")
  const [model, setModel] = useState("")
  const [brandName, setBrandName] = useState("")
  const [status, setStatus] = useState("All")
  const [pageSize, setPageSize] = useState(50)
  const [page, setPage] = useState(1)
 
  const [editOpen, setEditOpen] = useState(false)
  const [editingRow, setEditingRow] = useState(null)

  



  const openEdit = (row) => {
    setEditingRow(row)
    setEditOpen(true)
  }

  const closeEdit = () => {
    setEditOpen(false)
    setEditingRow(null)
  }


  const filtered = useMemo(() => {
    const c = code.trim().toLowerCase()
    const pn = productName.trim().toLowerCase()
    const bc = barcode.trim().toLowerCase()
    const md = model.trim().toLowerCase()
    const br = brandName.trim().toLowerCase()

    return demoData.filter((p) => {
      const okType = productType === "All" || p.productType === productType
      const okCategory = category === "All" || p.category === category
      const okStatus = status === "All" || p.status === status

      const okCode = !c || (p.code || "").toLowerCase().includes(c)
      const okName = !pn || (p.name || "").toLowerCase().includes(pn)
      const okBarcode = !bc || (p.barcode || "").toLowerCase().includes(bc)
      const okModel = !md || (p.model || "").toLowerCase().includes(md)
      const okBrand = !br || (p.brand || "").toLowerCase().includes(br)

      return okType && okCategory && okStatus && okCode && okName && okBarcode && okModel && okBrand
    })
  }, [productType, category, status, code, productName, barcode, model, brandName])

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)

  const rows = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, currentPage, pageSize])

  const from = total === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const to = Math.min(currentPage * pageSize, total)

  const pages = useMemo(() => {
    if (totalPages <= 9) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const out = [1]
    const left = Math.max(2, currentPage - 2)
    const right = Math.min(totalPages - 1, currentPage + 2)
    if (left > 2) out.push("…")
    for (let i = left; i <= right; i++) out.push(i)
    if (right < totalPages - 1) out.push("…")
    out.push(totalPages)
    return out
  }, [currentPage, totalPages])

  const reset = () => setPage(1)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-5 space-y-4">
        {/* শিরোনাম + ব্রেডক্রাম্ব */}
        <div className="flex items-start justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">পণ্য ও সেবার তালিকা</h1>

          <div className="text-sm text-slate-500">
            <span className="text-blue-600 hover:underline cursor-pointer">ড্যাশবোর্ড</span>
            <span className="mx-2">/</span>
            <span className="text-blue-600 hover:underline cursor-pointer">পণ্য ও সেবার তালিকা</span>
            <span className="mx-2">/</span>
            <span className="text-blue-600 hover:underline cursor-pointer">নতুন যোগ করুন</span>
          </div>
        </div>

        {/* ফিল্টার কার্ড */}
        <div className="rounded border border-slate-200 bg-white shadow-sm">
          <div className="p-4 space-y-3">
            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
              <div className="lg:col-span-2">
                <label className="text-sm font-semibold text-slate-700">পণ্যের ধরন</label>
                <select
                  value={productType}
                  onChange={(e) => {
                    setProductType(e.target.value)
                    reset()
                  }}
                  className="mt-1 w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                >
                  {PRODUCT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="text-sm font-semibold text-slate-700">কোড</label>
                <input
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                    reset()
                  }}
                  className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div className="lg:col-span-3">
                <label className="text-sm font-semibold text-slate-700">পণ্যের নাম</label>
                <input
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value)
                    reset()
                  }}
                  className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div className="lg:col-span-3">
                <label className="text-sm font-semibold text-slate-700">ক্যাটাগরি</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value)
                    reset()
                  }}
                  className="mt-1 w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="text-sm font-semibold text-slate-700">বারকোড</label>
                <input
                  value={barcode}
                  onChange={(e) => {
                    setBarcode(e.target.value)
                    reset()
                  }}
                  className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-2">
                <label className="text-sm font-semibold text-slate-700">মডেল</label>
                <input
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value)
                    reset()
                  }}
                  className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div className="lg:col-span-4">
                <label className="text-sm font-semibold text-slate-700">ব্র্যান্ডের নাম</label>
                <input
                  value={brandName}
                  onChange={(e) => {
                    setBrandName(e.target.value)
                    reset()
                  }}
                  className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="text-sm font-semibold text-slate-700">স্ট্যাটাস</label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value)
                    reset()
                  }}
                  className="mt-1 w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="text-sm font-semibold text-slate-700">প্রতি পেজে</label>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value))
                    reset()
                  }}
                  className="mt-1 w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                >
                  {[10, 25, 50, 100].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-2 flex lg:justify-start">
                <button
                  onClick={reset}
                  className="mt-2 lg:mt-0 inline-flex h-10 w-10 items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-50 transition"
                  title="সার্চ"
                >
                  <Search className="h-5 w-5 text-slate-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* টেবিল কার্ড */}
        <div className="rounded border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-4 text-sm text-slate-700">
            দেখাচ্ছে <span className="font-semibold">{from}</span> - <span className="font-semibold">{to}</span> /{" "}
            <span className="font-semibold">{total}</span>
          </div>

          <div className="overflow-x-auto border-t border-slate-200">
            <table className="min-w-[1100px] w-full">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="px-4 py-3 text-sm font-bold text-slate-800">পণ্য</th>
                  <th className="px-4 py-3 text-sm font-bold text-slate-800">ব্র্যান্ড</th>
                  <th className="px-4 py-3 text-sm font-bold text-slate-800">পণ্যের ধরন</th>
                  <th className="px-4 py-3 text-sm font-bold text-slate-800">বারকোড</th>
                  <th className="px-4 py-3 text-sm font-bold text-slate-800">বিক্রয় মূল্য</th>
                  <th className="px-4 py-3 text-sm font-bold text-slate-800">স্ট্যাটাস</th>
                  <th className="px-4 py-3 text-sm font-bold text-slate-800 text-center">অ্যাকশন</th>
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                      কোনো তথ্য পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  rows.map((p) => (
                    <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="px-4 py-4 align-top">
                        <div className="flex items-start gap-3">
                          <div className="h-9 w-9 rounded bg-slate-100 border border-slate-200 grid place-items-center overflow-hidden">
                            {p.imageUrl ? (
                              <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
                            ) : (
                              <span className="text-xs text-slate-400">ছবি</span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900">{p.name}</div>

                            <div className="mt-1 text-sm">
                              <div className="text-blue-600">মডেল:</div>
                              <div className="text-slate-700">{p.model || "-"}</div>
                            </div>

                            <div className="mt-1 text-sm">
                              <div className="text-blue-600">কোড:</div>
                              <div className="text-slate-700">{p.code || "-"}</div>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 align-top text-slate-700">{p.brand || "-"}</td>
                      <td className="px-4 py-4 align-top text-slate-700">{p.productType}</td>
                      <td className="px-4 py-4 align-top text-slate-700">{p.barcode || "-"}</td>
                      <td className="px-4 py-4 align-top text-slate-700">
                        {Number(p.salesPrice || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 align-top text-slate-700">{p.status}</td>

                      <td className="px-4 py-4 align-top">
                        <div className="flex items-center justify-center gap-3 text-blue-600">
                          <button title="দেখুন" className="hover:text-blue-700">
                            <Eye className="h-5 w-5" />
                          </button>
                         <button
  className="text-blue-600 hover:text-blue-700"
  title="Edit"
  onClick={() => openEdit(p)}   // এখানে p = row/item
>
  <Pencil className="h-5 w-5" />
</button>

                          <button title="ডিলিট" className="hover:text-blue-700">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-200">
            <div className="text-sm text-slate-600">
              পেজ <span className="font-semibold text-slate-900">{currentPage}</span> /{" "}
              <span className="font-semibold text-slate-900">{totalPages}</span>
            </div>

            <div className="flex items-center gap-1 flex-wrap">
              <PageBtn onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
              </PageBtn>

              {pages.map((p, idx) =>
                p === "…" ? (
                  <span key={`dots-${idx}`} className="px-2 text-slate-500">
                    …
                  </span>
                ) : (
                  <PageBtn key={p} active={p === currentPage} onClick={() => setPage(p)}>
                    {p}
                  </PageBtn>
                )
              )}

              <PageBtn
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </PageBtn>
            </div>
          </div>
        </div>
        <Modal open={editOpen} onClose={closeEdit} title="গ্রাহকের বিস্তারিত (Edit)">
          <ProductServicesAdd initialData={editingRow} onClose={closeEdit} />
        </Modal>
      </div>
    </div>
  )
}
