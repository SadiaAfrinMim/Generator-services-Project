import { useMemo, useState } from "react"
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Printer,
  Download,
} from "lucide-react"
import Modal from "../inputField/Modal"
import ProductServicesAdd from "../inputField/ProductServicesAdd"
import ViewModalBody from "../inputField/ViewModalBody"

const seedData = [
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

const PRODUCT_TYPES = ["All", "Product", "Service"]
const CATEGORIES = ["All", "Repair", "Parts", "Accessories"]
const STATUSES = ["All", "Active", "Inactive"]

function PageBtn({ active, children, onClick, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "h-9 min-w-9 rounded-lg border px-2 text-sm font-semibold transition",
        active
          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-transparent shadow-sm"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
        disabled ? "opacity-50 cursor-not-allowed" : "",
      ].join(" ")}
    >
      {children}
    </button>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-sm font-extrabold text-slate-900">{label}</div>
      <div className="text-sm font-semibold text-slate-700 text-right break-words">
        {value ?? "—"}
      </div>
    </div>
  )
}

function StatusPill({ status }) {
  const active = status === "Active"
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1",
        active
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-rose-50 text-rose-700 ring-rose-200",
      ].join(" ")}
    >
      {status}
    </span>
  )
}

function DeleteConfirm({ row, onClose, onConfirm }) {
  if (!row) return null
  return (
    <div className="space-y-4 p-6 text-black">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
        <div className="text-base font-extrabold text-red-700">ডিলিট কনফার্ম</div>
        <div className="mt-1 text-sm font-semibold text-red-700/80">
          <span className="font-extrabold">{row.name}</span> ডিলিট করলে আর ফেরত
          আনা যাবে না।
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={onClose}
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

function PrintBody({ row, onPrint }) {
  if (!row) return null
  return (
    <div className="space-y-4 p-6 text-black">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="text-base font-extrabold text-slate-900">{row.name}</div>
        <div className="mt-1 text-sm text-slate-700">কোড: {row.code || "-"}</div>
        <div className="text-sm text-slate-700">মডেল: {row.model || "-"}</div>
        <div className="text-sm text-slate-700">ব্র্যান্ড: {row.brand || "-"}</div>
        <div className="text-sm text-slate-700">
          মূল্য: {Number(row.salesPrice || 0).toFixed(2)}
        </div>
        <div className="mt-2">
          <StatusPill status={row.status} />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onPrint}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-700"
        >
          <Printer className="h-5 w-5" />
          প্রিন্ট করুন
        </button>
      </div>
    </div>
  )
}

function DownloadBody({ row, onDownload }) {
  if (!row) return null
  return (
    <div className="space-y-4 p-6 text-black">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="text-base font-extrabold text-slate-900">{row.name}</div>
        <div className="mt-1 text-sm text-slate-700">CSV ফাইল হিসেবে ডাউনলোড হবে</div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-emerald-700"
        >
          <Download className="h-5 w-5" />
          ডাউনলোড করুন
        </button>
      </div>
    </div>
  )
}

export default function ProductServices() {
  const [data, setData] = useState(seedData)

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

  // modals
  const [activeRow, setActiveRow] = useState(null)
  const [addOpen, setAddOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [printOpen, setPrintOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)

  const closeAll = () => {
    setAddOpen(false)
    setViewOpen(false)
    setEditOpen(false)
    setDeleteOpen(false)
    setPrintOpen(false)
    setDownloadOpen(false)
    setActiveRow(null)
  }

  const openWithRow = (row, setter) => {
    setActiveRow(row)
    setter(true)
  }

  const reset = () => setPage(1)

  const filtered = useMemo(() => {
    const c = code.trim().toLowerCase()
    const pn = productName.trim().toLowerCase()
    const bc = barcode.trim().toLowerCase()
    const md = model.trim().toLowerCase()
    const br = brandName.trim().toLowerCase()

    return data.filter((p) => {
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
  }, [data, productType, category, status, code, productName, barcode, model, brandName])

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

  // ADD
  const handleAddSave = (payload) => {
    const nextId = Math.max(0, ...data.map((d) => d.id)) + 1
    setData((prev) => [{ id: nextId, ...payload }, ...prev])
    closeAll()
  }

  // EDIT
  const handleEditSave = (payload) => {
    if (!activeRow) return
    setData((prev) => prev.map((x) => (x.id === activeRow.id ? { ...x, ...payload } : x)))
    closeAll()
  }

  // DELETE
  const confirmDelete = () => {
    if (!activeRow) return
    setData((prev) => prev.filter((x) => x.id !== activeRow.id))
    closeAll()
  }

  // PRINT
  const handlePrint = () => window.print()

  // DOWNLOAD CSV
  const handleDownload = () => {
    if (!activeRow) return
    const headers = ["id", "name", "model", "code", "brand", "productType", "category", "barcode", "salesPrice", "status"]
    const values = headers.map((k) => activeRow?.[k] ?? "")
    const csv =
      `${headers.join(",")}\n` +
      `${values.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",")}\n`

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `product-${activeRow.id}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-5 space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">পণ্য ও সেবার তালিকা</h1>

          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2.5 text-sm font-extrabold text-white hover:opacity-90"
          >
            <Plus className="h-5 w-5" />
            নতুন যোগ করুন
          </button>
        </div>

        {/* Filters */}
        <div className="rounded border border-slate-200 bg-white shadow-sm">
          <div className="p-4 space-y-3">
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
                  type="button"
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

        {/* Table */}
        <div className="rounded border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-4 text-sm text-slate-700">
            দেখাচ্ছে <span className="font-semibold">{from}</span> -{" "}
            <span className="font-semibold">{to}</span> /{" "}
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
                  <th className="px-4 py-3 text-sm font-bold text-slate-800 text-center">
                    অ্যাকশন
                  </th>
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
                    <tr
                      key={p.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="px-4 py-4 align-top">
                        <div className="flex items-start gap-3">
                          <div className="h-9 w-9 rounded bg-slate-100 border border-slate-200 grid place-items-center overflow-hidden">
                            {p.imageUrl ? (
                              <img
                                src={p.imageUrl}
                                alt={p.name}
                                className="h-full w-full object-cover"
                              />
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
                      <td className="px-4 py-4 align-top">
                        <StatusPill status={p.status} />
                      </td>

                      <td className="px-4 py-4 align-top">
                        <div className="flex items-center justify-center gap-3 text-blue-600 flex-wrap">
                          <button
                            type="button"
                            title="দেখুন"
                            className="hover:text-blue-700"
                            onClick={() => openWithRow(p, setViewOpen)}
                          >
                            <Eye className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            className="hover:text-blue-700"
                            title="Edit"
                            onClick={() => openWithRow(p, setEditOpen)}
                          >
                            <Pencil className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            title="ডিলিট"
                            className="hover:text-blue-700"
                            onClick={() => openWithRow(p, setDeleteOpen)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            title="Print"
                            className="hover:text-blue-700"
                            onClick={() => openWithRow(p, setPrintOpen)}
                          >
                            <Printer className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            title="Download"
                            className="hover:text-blue-700"
                            onClick={() => openWithRow(p, setDownloadOpen)}
                          >
                            <Download className="h-5 w-5" />
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
              পেজ <span className="font-semibold text-slate-900">{currentPage}</span>{" "}
              / <span className="font-semibold text-slate-900">{totalPages}</span>
            </div>

            <div className="flex items-center gap-1 flex-wrap">
              <PageBtn
                onClick={() => setPage((x) => Math.max(1, x - 1))}
                disabled={currentPage === 1}
              >
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
                ),
              )}

              <PageBtn
                onClick={() => setPage((x) => Math.min(totalPages, x + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </PageBtn>
            </div>
          </div>
        </div>

        {/* ===================== MODALS ===================== */}

        {/* ADD NEW */}
        <Modal open={addOpen} onClose={closeAll} title="নতুন পণ্য/সেবা যোগ করুন">
          <ProductServicesAdd initialData={null} onClose={closeAll} onSave={handleAddSave} />
        </Modal>

        {/* VIEW (✅ props fixed) */}
        <Modal open={viewOpen} onClose={closeAll} title="পণ্যের বিস্তারিত">
          <ViewModalBody row={activeRow} StatusPill={StatusPill} InfoRow={InfoRow} />
        </Modal>

        {/* EDIT */}
        <Modal open={editOpen} onClose={closeAll} title="পণ্য/সেবা এডিট করুন">
          <ProductServicesAdd initialData={activeRow} onClose={closeAll} onSave={handleEditSave} />
        </Modal>

        {/* DELETE */}
        <Modal open={deleteOpen} onClose={closeAll} title="ডিলিট">
          <DeleteConfirm row={activeRow} onClose={closeAll} onConfirm={confirmDelete} />
        </Modal>

        {/* PRINT */}
        <Modal open={printOpen} onClose={closeAll} title="প্রিন্ট">
          <PrintBody row={activeRow} onPrint={handlePrint} />
        </Modal>

        {/* DOWNLOAD */}
        <Modal open={downloadOpen} onClose={closeAll} title="ডাউনলোড">
          <DownloadBody row={activeRow} onDownload={handleDownload} />
        </Modal>
      </div>
    </div>
  )
}
