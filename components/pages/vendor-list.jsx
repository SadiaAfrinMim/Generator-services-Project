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

const vendorSeed = [
  { id: 1, name: "টেক আইটি বি ডি লিমিটেড", phone: "01717055765", email: "abir@tech365.com", status: "Active" },
  { id: 2, name: "রহিম ট্রেডার্স", phone: "01812000000", email: "rahim@traders.com", status: "Active" },
  { id: 3, name: "সালমান এন্টারপ্রাইজ", phone: "01933000000", email: "salman@enterprise.com", status: "Inactive" },
]

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

function StatusPill({ status }) {
  const active = status === "Active"
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1",
        active ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-rose-50 text-rose-700 ring-rose-200",
      ].join(" ")}
    >
      {status}
    </span>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-sm font-extrabold text-slate-900">{label}</div>
      <div className="text-sm font-semibold text-slate-700 text-right">{value ?? "—"}</div>
    </div>
  )
}

function VendorView({ row }) {
  if (!row) return null
  return (
    <div className="space-y-3 text-black">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
        <div className="text-lg font-extrabold text-slate-900">{row.name}</div>
        <div className="mt-1 text-sm font-semibold text-slate-600">{row.email}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InfoRow label="বিক্রেতার নাম" value={row.name} />
        <InfoRow label="ফোন" value={row.phone} />
        <InfoRow label="ইমেইল" value={row.email} />
        <InfoRow label="স্ট্যাটাস" value={row.status} />
      </div>
    </div>
  )
}

function VendorForm({ initial, onClose, onSave, mode = "add" }) {
  const [form, setForm] = useState(
    initial ?? { name: "", phone: "", email: "", status: "Active" }
  )

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      alert("নাম এবং ফোন অবশ্যই দিতে হবে।")
      return
    }
    onSave(form)
  }

  return (
    <form onSubmit={submit} className="space-y-4 text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="md:col-span-2">
          <label className="block text-sm font-extrabold text-slate-900 mb-1">বিক্রেতার নাম *</label>
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="যেমন: রহমান ট্রেডার্স"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">ফোন *</label>
          <input
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="01XXXXXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1">ইমেইল</label>
          <input
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="example@mail.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-extrabold text-slate-900 mb-1">স্ট্যাটাস</label>
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
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
          type="submit"
          className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3 text-sm font-extrabold text-white hover:opacity-90"
        >
          {mode === "add" ? "Add Vendor" : "Update Vendor"}
        </button>
      </div>
    </form>
  )
}

function DeleteConfirm({ row, onClose, onConfirm }) {
  if (!row) return null
  return (
    <div className="space-y-4 text-black">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
        <div className="text-base font-extrabold text-red-700">ডিলিট কনফার্ম</div>
        <div className="mt-1 text-sm font-semibold text-red-700/80">
          <span className="font-extrabold">{row.name}</span> কে ডিলিট করলে আর ফেরত আনা যাবে না।
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

function PrintView({ row, onPrint }) {
  if (!row) return null
  return (
    <div className="space-y-4 text-black">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="text-sm font-extrabold text-slate-900">প্রিন্ট প্রিভিউ</div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoRow label="বিক্রেতা" value={row.name} />
          <InfoRow label="ফোন" value={row.phone} />
          <InfoRow label="ইমেইল" value={row.email} />
          <InfoRow label="স্ট্যাটাস" value={row.status} />
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

function DownloadView({ row, onDownload }) {
  if (!row) return null
  return (
    <div className="space-y-4 text-black">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="text-sm font-extrabold text-slate-900">ডাউনলোড</div>
        <div className="mt-2 text-sm font-semibold text-slate-600">
          CSV ফাইল ডাউনলোড হবে:{" "}
          <span className="font-extrabold text-slate-900">vendor-{row.id}.csv</span>
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

export default function VendorList() {
  // ✅ stateful rows (Add/Edit/Delete reflect হবে)
  const [data, setData] = useState(vendorSeed)

  const [pageSize, setPageSize] = useState(10)
  const [query, setQuery] = useState("")
  const [searchType, setSearchType] = useState("All")
  const [page, setPage] = useState(1)

  // ✅ active row + modals
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

  // ✅ Add form initial
  const [addFormInit, setAddFormInit] = useState({ name: "", phone: "", email: "", status: "Active" })

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return data

    return data.filter((v) => {
      const name = (v.name || "").toLowerCase()
      const phone = (v.phone || "").toLowerCase()
      const email = (v.email || "").toLowerCase()

      if (searchType === "Name") return name.includes(q)
      if (searchType === "Phone") return phone.includes(q)
      if (searchType === "Email") return email.includes(q)

      return `${name} ${phone} ${email}`.includes(q)
    })
  }, [data, query, searchType])

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
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const out = [1]
    const left = Math.max(2, currentPage - 1)
    const right = Math.min(totalPages - 1, currentPage + 1)
    if (left > 2) out.push("…")
    for (let i = left; i <= right; i++) out.push(i)
    if (right < totalPages - 1) out.push("…")
    out.push(totalPages)
    return out
  }, [currentPage, totalPages])

  const reset = () => setPage(1)

  // ✅ ADD
  const submitAdd = (payload) => {
    const nextId = (data?.[0]?.id ?? 0) + 1
    setData((prev) => [{ id: nextId, ...payload }, ...prev])

    setAddFormInit({ name: "", phone: "", email: "", status: "Active" })
    closeAll()
  }

  // ✅ EDIT
  const submitEdit = (payload) => {
    if (!activeRow) return
    setData((prev) => prev.map((r) => (r.id === activeRow.id ? { ...r, ...payload } : r)))
    closeAll()
  }

  // ✅ DELETE
  const confirmDelete = () => {
    if (!activeRow) return
    setData((prev) => prev.filter((r) => r.id !== activeRow.id))
    closeAll()
  }

  // ✅ PRINT
  const handlePrint = () => window.print()

  // ✅ DOWNLOAD CSV
  const handleDownload = () => {
    if (!activeRow) return
    const headers = ["id", "name", "phone", "email", "status"]
    const values = headers.map((k) => activeRow?.[k] ?? "")
    const csv =
      `${headers.join(",")}\n` +
      `${values.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",")}\n`

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `vendor-${activeRow.id}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">বিক্রেতার তালিকা</h1>
            <div className="text-sm text-slate-500 mt-1">
              <span className="text-blue-600 hover:underline cursor-pointer">ড্যাশবোর্ড</span>
              <span className="mx-2">/</span>
              <span className="text-blue-600 hover:underline cursor-pointer">বিক্রেতার তালিকা</span>
              <span className="mx-2">/</span>
              <span className="text-slate-500">অ্যাড নিউ</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3 text-sm font-extrabold text-white hover:opacity-90 transition"
          >
            <Plus className="h-5 w-5" />
            নতুন বিক্রেতা যোগ করুন
          </button>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm">
          <div className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-slate-700">Per Page</label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  reset()
                }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400"
              >
                {[10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex w-full md:w-auto items-center gap-2">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  reset()
                }}
                placeholder="Search"
                className="h-10 w-full md:w-64 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400"
              />

              <select
                value={searchType}
                onChange={(e) => {
                  setSearchType(e.target.value)
                  reset()
                }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400"
              >
                <option value="All">Search - All</option>
                <option value="Name">Name</option>
                <option value="Phone">Phone</option>
                <option value="Email">Email</option>
              </select>

              <button
                type="button"
                onClick={reset}
                className="h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition grid place-items-center"
                title="Search"
              >
                <Search className="h-5 w-5 text-slate-700" />
              </button>
            </div>
          </div>

          <div className="px-4 pb-4 text-sm text-slate-600">
            Showing <span className="font-bold text-slate-900">{from}</span> -{" "}
            <span className="font-bold text-slate-900">{to}</span> of{" "}
            <span className="font-bold text-slate-900">{total}</span>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-5 py-4 text-left text-base font-extrabold text-slate-800">বিক্রেতার নাম</th>
                  <th className="px-5 py-4 text-left text-base font-extrabold text-slate-800">যোগাযোগ</th>
                  <th className="px-5 py-4 text-left text-base font-extrabold text-slate-800">কে এম</th>
                  <th className="px-5 py-4 text-left text-base font-extrabold text-slate-800">স্ট্যাটাস</th>
                  <th className="px-5 py-4 text-center text-base font-extrabold text-slate-800">অ্যাকশন</th>
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-slate-500">
                      কোনো ডেটা পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  rows.map((v) => (
                    <tr key={v.id} className="border-b border-slate-100 hover:bg-slate-50/70 transition">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-900">{v.name}</div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="text-slate-900">{v.phone}</div>
                        <a className="text-sm text-blue-600 hover:underline" href={`mailto:${v.email}`}>
                          {v.email}
                        </a>
                      </td>

                      <td className="px-5 py-4 text-slate-900">—</td>

                      <td className="px-5 py-4">
                        <StatusPill status={v.status} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700"
                            title="View"
                            onClick={() => openWithRow(v, setViewOpen)}
                          >
                            <Eye className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700"
                            title="Edit"
                            onClick={() => openWithRow(v, setEditOpen)}
                          >
                            <Pencil className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700"
                            title="Delete"
                            onClick={() => openWithRow(v, setDeleteOpen)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700"
                            title="Print"
                            onClick={() => openWithRow(v, setPrintOpen)}
                          >
                            <Printer className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700"
                            title="Download"
                            onClick={() => openWithRow(v, setDownloadOpen)}
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
              Page <span className="font-bold text-slate-900">{currentPage}</span> /{" "}
              <span className="font-bold text-slate-900">{totalPages}</span>
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
                ),
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

        {/* ===================== MODALS ===================== */}

        {/* ADD NEW */}
        <Modal open={addOpen} onClose={closeAll} title="নতুন বিক্রেতা যোগ করুন" size="lg">
          <VendorForm
            initial={addFormInit}
            onClose={closeAll}
            onSave={(payload) => submitAdd(payload)}
            mode="add"
          />
        </Modal>

        {/* VIEW */}
        <Modal open={viewOpen} onClose={closeAll} title="বিক্রেতার বিস্তারিত" size="lg">
          <VendorView row={activeRow} />
        </Modal>

        {/* EDIT */}
        <Modal open={editOpen} onClose={closeAll} title="বিক্রেতার বিস্তারিত (Edit)" size="lg">
          <VendorForm
            initial={activeRow}
            onClose={closeAll}
            onSave={(payload) => submitEdit(payload)}
            mode="edit"
          />
        </Modal>

        {/* DELETE */}
        <Modal open={deleteOpen} onClose={closeAll} title="ডিলিট" size="md">
          <DeleteConfirm row={activeRow} onClose={closeAll} onConfirm={confirmDelete} />
        </Modal>

        {/* PRINT */}
        <Modal open={printOpen} onClose={closeAll} title="প্রিন্ট" size="lg">
          <PrintView row={activeRow} onPrint={handlePrint} />
        </Modal>

        {/* DOWNLOAD */}
        <Modal open={downloadOpen} onClose={closeAll} title="ডাউনলোড" size="lg">
          <DownloadView row={activeRow} onDownload={handleDownload} />
        </Modal>
      </div>
    </div>
  )
}
