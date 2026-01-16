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
import CustomerDetailsForm from "../inputField/CustomerDetailsForm"
import CustomerAddForm from "../inputField/CustomerAddForm"
import CustomerViewDetails from "../inputField/CustomerViewDetails"

// Demo data (তুমি API থেকে আনলে এটাকে replace করবে)
const customerData = [
  {
    id: 1,
    name: '৯৮" ফ্রেন্ডস্ সোসাইটি',
    address: "অফিস, রোড নং ২, মিরপুর",
    account: "24178",
    meter: "14427",
    minBill: 90,
    due: 300,
    lastReading: 555,
    lastMonth: "December 2025",
    contact: "01711-983015",
    status: "সক্রিয়",
  },
  {
    id: 2,
    name: "হারুন (ছিপ-বর্শির) দোকান",
    address: "দোকান, শাহবাগ",
    account: "23207",
    meter: "985230",
    minBill: 90,
    due: 300,
    lastReading: 197,
    lastMonth: "December 2025",
    contact: "0171-xxxx",
    status: "সক্রিয়",
  },
  {
    id: 3,
    name: "আরাবী এন্টারপ্রাইজ",
    address: "আগ্রাবাদ",
    account: "24228",
    meter: "142567",
    minBill: 120,
    due: 0,
    lastReading: 780,
    lastMonth: "November 2025",
    contact: "0172-xxxx",
    status: "সক্রিয়",
  },
  {
    id: 4,
    name: "নজরুল ইসলাম",
    address: "শিববাড়ি",
    account: "25114",
    meter: "234567",
    minBill: 80,
    due: 100,
    lastReading: 215,
    lastMonth: "October 2025",
    contact: "0174-xxxx",
    status: "নিষ্ক্রিয়",
  },
  {
    id: 5,
    name: "ভিক্টোরিয়া ট্রান্সপোর্ট",
    address: "নিউ মার্কেট",
    account: "21196",
    meter: "345678",
    minBill: 100,
    due: 0,
    lastReading: 910,
    lastMonth: "December 2025",
    contact: "0175-xxxx",
    status: "সক্রিয়",
  },
]

const AREAS = ["Select", "ঢাকা", "চট্টগ্রাম", "খুলনা", "রাজশাহী"]
const STATUSES = ["সব গুলো", "সক্রিয়", "নিষ্ক্রিয়"]

function StatusText({ status }) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-3 py-1 text-xs font-bold",
        status === "সক্রিয়"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-200 text-slate-700",
      ].join(" ")}
    >
      {status}
    </span>
  )
}

function PageBtn({ active, children, onClick, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "h-9 min-w-9 rounded border px-2 text-sm font-semibold transition",
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
        disabled ? "opacity-50 cursor-not-allowed" : "",
      ].join(" ")}
    >
      {children}
    </button>
  )
}

/* =========================
   Local modals content
========================= */

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-sm font-extrabold text-slate-900">{label}</div>
      <div className="text-sm font-semibold text-slate-700 text-right">
        {value ?? "—"}
      </div>
    </div>
  )
}





function DeleteConfirm({ row, onClose, onConfirm }) {
  if (!row) return null
  return (
    <div className="space-y-4 p-6 text-black">
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
    <div className="space-y-4 p-6 text-black">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="text-sm font-extrabold text-slate-900">প্রিন্ট প্রিভিউ</div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoRow label="গ্রাহক" value={row.name} />
          <InfoRow label="হিসাব" value={row.account} />
          <InfoRow label="মিটার" value={row.meter} />
          <InfoRow label="যোগাযোগ" value={row.contact} />
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
          <span className="font-extrabold text-slate-900">customer-{row.id}.csv</span>
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

/* =========================
   Page
========================= */

export default function CustomerList() {
  // ✅ now rows are stateful (Add/Edit/Delete will work)
  const [rows, setRows] = useState(customerData)

  // Filter fields
  const [customerQ, setCustomerQ] = useState("")
  const [accountQ, setAccountQ] = useState("")
  const [meterQ, setMeterQ] = useState("")
  const [phoneQ, setPhoneQ] = useState("")
  const [area, setArea] = useState("Select")
  const [status, setStatus] = useState("সব গুলো")

  // Pagination controls
  const [pageSize, setPageSize] = useState(50)
  const [page, setPage] = useState(1)
  const resetToFirstPage = () => setPage(1)

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

  // ✅ Add form state
  const [addForm, setAddForm] = useState({
    name: "",
    address: "",
    account: "",
    meter: "",
    minBill: 0,
    due: 0,
    lastReading: 0,
    lastMonth: "",
    contact: "",
    status: "সক্রিয়",
  })

  const filtered = useMemo(() => {
    const cq = customerQ.trim()
    const aq = accountQ.trim()
    const mq = meterQ.trim()
    const pq = phoneQ.trim()

    return rows.filter((c) => {
      const okCustomer = !cq || c.name.includes(cq) || (c.address ?? "").includes(cq)
      const okAccount = !aq || String(c.account).includes(aq)
      const okMeter = !mq || String(c.meter).includes(mq)
      const okPhone = !pq || String(c.contact).includes(pq)

      const okArea = area === "Select" || (c.address ?? "").includes(area)
      const okStatus = status === "সব গুলো" || c.status === status

      return okCustomer && okAccount && okMeter && okPhone && okArea && okStatus
    })
  }, [rows, customerQ, accountQ, meterQ, phoneQ, area, status])

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)

  const pageRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, currentPage, pageSize])

  const from = total === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const to = Math.min(currentPage * pageSize, total)

  const pages = useMemo(() => {
    if (totalPages <= 12) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const out = [1]
    const left = Math.max(2, currentPage - 2)
    const right = Math.min(totalPages - 1, currentPage + 2)
    if (left > 2) out.push("…")
    for (let i = left; i <= right; i++) out.push(i)
    if (right < totalPages - 1) out.push("…")
    out.push(totalPages)
    return out
  }, [currentPage, totalPages])

  // ✅ Add
  const submitAdd = () => {
    const nextId = (rows?.[0]?.id ?? 0) + 1
    const newRow = {
      id: nextId,
      ...addForm,
      minBill: Number(addForm.minBill || 0),
      due: Number(addForm.due || 0),
      lastReading: Number(addForm.lastReading || 0),
    }
    setRows((prev) => [newRow, ...prev])

    // reset
    setAddForm({
      name: "",
      address: "",
      account: "",
      meter: "",
      minBill: 0,
      due: 0,
      lastReading: 0,
      lastMonth: "",
      contact: "",
      status: "সক্রিয়",
    })
    closeAll()
  }

  // ✅ Edit (use your existing CustomerDetailsForm)
  const submitEdit = (updated) => {
    if (!activeRow) return
    setRows((prev) => prev.map((r) => (r.id === activeRow.id ? { ...r, ...updated } : r)))
    closeAll()
  }

  // ✅ Delete
  const confirmDelete = () => {
    if (!activeRow) return
    setRows((prev) => prev.filter((r) => r.id !== activeRow.id))
    closeAll()
  }

  // ✅ Print
  const handlePrint = () => window.print()

  // ✅ Download CSV
  const handleDownload = () => {
    if (!activeRow) return

    const headers = [
      "id",
      "name",
      "address",
      "account",
      "meter",
      "minBill",
      "due",
      "lastReading",
      "lastMonth",
      "contact",
      "status",
    ]
    const values = headers.map((k) => activeRow?.[k] ?? "")

    const csv =
      `${headers.join(",")}\n` +
      `${values.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",")}\n`

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `customer-${activeRow.id}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-5 space-y-4">
        {/* Title + breadcrumb + add button */}
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">গ্রাহক তালিকা</h1>
            <div className="mt-1 text-sm text-slate-500">
              <span className="text-blue-600 hover:underline cursor-pointer">ড্যাশবোর্ড</span>
              <span className="mx-2">/</span>
              <span className="text-blue-600 hover:underline cursor-pointer">গ্রাহক তালিকা</span>
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
            নতুন গ্রাহক যোগ করুন
          </button>
        </div>

        {/* Filter Card */}
        <div className="rounded border border-slate-200 bg-white shadow-sm">
          <div className="p-4 space-y-3">
            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">গ্রাহক</label>
                <input
                  value={customerQ}
                  onChange={(e) => setCustomerQ(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">হিসাব নম্বর</label>
                <input
                  value={accountQ}
                  onChange={(e) => setAccountQ(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">মিটার নম্বর</label>
                <input
                  value={meterQ}
                  onChange={(e) => setMeterQ(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">যোগাযোগ নম্বর</label>
                <input
                  value={phoneQ}
                  onChange={(e) => setPhoneQ(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-2">
                <label className="text-sm font-semibold text-slate-700">প্রতি পৃষ্ঠা</label>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value))
                    resetToFirstPage()
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

              <div className="lg:col-span-4">
                <label className="text-sm font-semibold text-slate-700">এরিয়া</label>
                <select
                  value={area}
                  onChange={(e) => {
                    setArea(e.target.value)
                    resetToFirstPage()
                  }}
                  className="mt-1 w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                >
                  {AREAS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-3">
                <label className="text-sm font-semibold text-slate-700">স্ট্যাটাস</label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value)
                    resetToFirstPage()
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

              <div className="lg:col-span-3 flex lg:justify-start">
                <button
                  type="button"
                  onClick={resetToFirstPage}
                  className="mt-2 lg:mt-0 inline-flex h-10 w-10 items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-50 transition"
                  title="Search"
                >
                  <Search className="h-5 w-5 text-slate-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="rounded border border-slate-200 bg-white shadow-sm">
          <div className="p-4 space-y-2">
            <div className="text-sm text-slate-700">
              <span className="font-semibold">Showing</span>{" "}
              <span className="font-semibold">
                {from} - {to}
              </span>{" "}
              of <span className="font-semibold">{total}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
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

          <div className="overflow-x-auto border-t border-slate-200">
            <table className="min-w-[1200px] w-full">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-3 text-base font-bold text-slate-800 border-b border-slate-200">গ্রাহক</th>
                  <th className="px-4 py-3 text-base font-bold text-slate-800 border-b border-slate-200">হিসাব নম্বর</th>
                  <th className="px-4 py-3 text-base font-bold text-slate-800 border-b border-slate-200">মিটার নম্বর</th>
                  <th className="px-4 py-3 text-base font-bold text-slate-800 border-b border-slate-200">দূর. & সর্বনিম্ন বিল</th>
                  <th className="px-4 py-3 text-base font-bold text-slate-800 border-b border-slate-200">সর্বশেষ মিটার রিডিং & মাস</th>
                  <th className="px-4 py-3 text-base font-bold text-slate-800 border-b border-slate-200">যোগাযোগ</th>
                  <th className="px-4 py-3 text-base font-bold text-slate-800 border-b border-slate-200">স্ট্যাটাস</th>
                  <th className="px-4 py-3 text-base font-bold text-slate-800 border-b border-slate-200 text-center">
                    অ্যাকশন
                  </th>
                </tr>
              </thead>

              <tbody>
                {pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-slate-500">
                      কোনো ডেটা পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  pageRows.map((c) => (
                    <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="px-4 py-4 align-top">
                        <div className="font-semibold text-slate-900">{c.name}</div>
                        <div className="mt-1 text-sm text-blue-600 hover:underline cursor-pointer">{c.address}</div>
                      </td>

                      <td className="px-4 py-4 align-top text-slate-900">{c.account}</td>
                      <td className="px-4 py-4 align-top text-slate-900">{c.meter}</td>

                      <td className="px-4 py-4 align-top">
                        <div className="text-slate-900">{c.minBill}</div>
                        <div className="mt-1 text-sm text-blue-600 hover:underline cursor-pointer">{c.due}</div>
                      </td>

                      <td className="px-4 py-4 align-top">
                        <div className="text-slate-900">{c.lastReading}</div>
                        <div className="mt-1 text-sm text-blue-600 hover:underline cursor-pointer">{c.lastMonth}</div>
                      </td>

                      <td className="px-4 py-4 align-top text-slate-900">{c.contact}</td>

                      <td className="px-4 py-4 align-top">
                        <StatusText status={c.status} />
                      </td>

                      <td className="px-4 py-4 align-top">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700"
                            title="View"
                            onClick={() => openWithRow(c, setViewOpen)}
                          >
                            <Eye className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700"
                            title="Edit"
                            onClick={() => openWithRow(c, setEditOpen)}
                          >
                            <Pencil className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700"
                            title="Delete"
                            onClick={() => openWithRow(c, setDeleteOpen)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700"
                            title="Print"
                            onClick={() => openWithRow(c, setPrintOpen)}
                          >
                            <Printer className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700"
                            title="Download"
                            onClick={() => openWithRow(c, setDownloadOpen)}
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
        </div>

        {/* =========================
            MODALS
        ========================= */}

        {/* ADD NEW */}
        <Modal open={addOpen} onClose={closeAll} title="নতুন গ্রাহক যোগ করুন" size="lg">
          <CustomerAddForm
            value={addForm}
            onChange={setAddForm}
            onClose={closeAll}
            onSubmit={submitAdd}
           STATUSES={STATUSES}
          />
        </Modal>

        {/* VIEW */}
        <Modal open={viewOpen} onClose={closeAll} title="গ্রাহকের বিস্তারিত" size="lg">
          <CustomerViewDetails row={activeRow} InfoRow={InfoRow} />
        </Modal>

        {/* EDIT (তোমার existing form) */}
        <Modal open={editOpen} onClose={closeAll} title="গ্রাহকের বিস্তারিত (Edit)" size="lg">
          
          <CustomerDetailsForm
            initialData={activeRow}
            onClose={closeAll}
            onSave={(updatedRow) => submitEdit(updatedRow)}
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
