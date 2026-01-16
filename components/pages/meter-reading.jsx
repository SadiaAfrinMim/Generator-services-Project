import { useMemo, useState } from "react"
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Modal from "../inputField/Modal"
import UpdateMeterReading from "../inputField/UpdateMeterReading"

const seedReadings = [
  {
    id: 1,
    date: "27/12/2025",
    meterNo: "691308",
    customerName: "শিপন স্যার ৪র্থ",
    phone: "01740-641165",
    accountNo: "25124",
    prev: 16,
    current: 19,
  },
  {
    id: 2,
    date: "27/12/2025",
    meterNo: "89542",
    customerName: "মধুমঙ্গলসায়",
    phone: "01712269047",
    accountNo: "11086",
    prev: 2375,
    current: 2379,
  },
  {
    id: 3,
    date: "27/12/2025",
    meterNo: "580248",
    customerName: "ছাইফ মেডিসিন শপ",
    phone: "01711-123456",
    accountNo: "24147",
    prev: 122,
    current: 126,
  },
  {
    id: 4,
    date: "28/12/2025",
    meterNo: "991203",
    customerName: "নুর স্টোর",
    phone: "01819-000111",
    accountNo: "77121",
    prev: 500,
    current: 512,
  },
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
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
        disabled ? "opacity-50 cursor-not-allowed" : "",
      ].join(" ")}
    >
      {children}
    </button>
  )
}

function DiffBadge({ diff }) {
  const high = diff >= 10
  return (
    <span
      className={[
        "inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-bold ring-1",
        high ? "bg-amber-50 text-amber-700 ring-amber-200" : "bg-slate-50 text-slate-700 ring-slate-200",
      ].join(" ")}
    >
      {diff}
    </span>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-sm font-extrabold text-slate-900">{label}</div>
      <div className="text-sm font-semibold text-slate-700 text-right break-words">{value ?? "—"}</div>
    </div>
  )
}

function ViewReading({ row }) {
  if (!row) return null
  const diff = Number(row.current) - Number(row.prev)

  return (
    <div className="space-y-4 text-black">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-extrabold text-slate-900">মিটার: {row.meterNo}</div>
            <div className="mt-1 text-sm font-semibold text-slate-600">
              {row.customerName} • {row.phone}
            </div>
          </div>
          <div className="shrink-0">
            <DiffBadge diff={diff} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InfoRow label="তারিখ" value={row.date} />
        <InfoRow label="হিসাব নাম্বার" value={row.accountNo} />
        <InfoRow label="পূর্বের রিডিং" value={Number(row.prev).toLocaleString()} />
        <InfoRow label="বর্তমান রিডিং" value={Number(row.current).toLocaleString()} />
        <InfoRow label="পার্থক্য" value={diff} />
      </div>
    </div>
  )
}

function DeleteConfirm({ row, onClose, onConfirm }) {
  if (!row) return null
  return (
    <div className="space-y-4 text-black">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
        <div className="text-base font-extrabold text-red-700">ডিলিট কনফার্ম</div>
        <div className="mt-1 text-sm font-semibold text-red-700/80">
          আপনি কি নিশ্চিত? <span className="font-extrabold">{row.customerName}</span> এর মিটার (
          <span className="font-extrabold">{row.meterNo}</span>) রিডিং ডিলিট হবে।
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

export default function MeterReading() {
  // ✅ data state
  const [data, setData] = useState(seedReadings)

  // Filters
  const [meterQ, setMeterQ] = useState("")
  const [customerQ, setCustomerQ] = useState("")
  const [accountQ, setAccountQ] = useState("")
  const [pageSize, setPageSize] = useState(50)
  const [page, setPage] = useState(1)

  // ✅ modals
  const [activeRow, setActiveRow] = useState(null)
  const [addOpen, setAddOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const closeAll = () => {
    setAddOpen(false)
    setViewOpen(false)
    setEditOpen(false)
    setDeleteOpen(false)
    setActiveRow(null)
  }

  const openWithRow = (row, setter) => {
    setActiveRow(row)
    setter(true)
  }

  const resetToFirst = () => setPage(1)

  const filtered = useMemo(() => {
    const m = meterQ.trim().toLowerCase()
    const c = customerQ.trim().toLowerCase()
    const a = accountQ.trim().toLowerCase()

    return data.filter((r) => {
      const okMeter = !m || String(r.meterNo).toLowerCase().includes(m)
      const okCustomer =
        !c ||
        String(r.customerName).toLowerCase().includes(c) ||
        String(r.phone).toLowerCase().includes(c)
      const okAccount = !a || String(r.accountNo).toLowerCase().includes(a)
      return okMeter && okCustomer && okAccount
    })
  }, [data, meterQ, customerQ, accountQ])

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

  // ✅ ADD save (expects payload from UpdateMeterReading)
  const handleAddSave = (payload) => {
    const nextId = Math.max(0, ...data.map((x) => x.id)) + 1
    setData((prev) => [{ id: nextId, ...payload }, ...prev])
    closeAll()
  }

  // ✅ EDIT save
  const handleEditSave = (payload) => {
    if (!activeRow) return
    setData((prev) => prev.map((x) => (x.id === activeRow.id ? { ...x, ...payload } : x)))
    closeAll()
  }

  // ✅ DELETE
  const confirmDelete = () => {
    if (!activeRow) return
    setData((prev) => prev.filter((x) => x.id !== activeRow.id))
    closeAll()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" />
        <div className="absolute top-40 -right-24 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-200/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
              মিটার রিডিং তালিকা
            </h1>
            <p className="mt-1 text-sm text-slate-600">সমস্ত মিটার রিডিং এর সম্পূর্ণ তথ্য এবং ব্যবস্থাপনা</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2.5 text-sm font-extrabold text-white hover:opacity-90"
            >
              <Plus className="h-5 w-5" />
              অ্যাড নিউ
            </button>

            <div className="text-sm text-slate-500 flex items-center">
              <span className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-colors">
                ড্যাশবোর্ড
              </span>
              <span className="mx-2">/</span>
              <span className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-colors">
                মিটার রিডিং তালিকা
              </span>
            </div>
          </div>
        </div>

        {/* Filter Card */}
        <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-lg shadow-lg shadow-blue-100/50">
          <div className="p-5 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              ফিল্টার অপশন
            </h2>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold text-slate-700 mb-2">মিটার নাম্বার</label>
                <input
                  value={meterQ}
                  onChange={(e) => {
                    setMeterQ(e.target.value)
                    resetToFirst()
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="মিটার নাম্বার লিখুন"
                />
              </div>

              <div className="lg:col-span-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">গ্রাহক</label>
                <input
                  value={customerQ}
                  onChange={(e) => {
                    setCustomerQ(e.target.value)
                    resetToFirst()
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="গ্রাহকের নাম বা ফোন"
                />
              </div>

              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold text-slate-700 mb-2">হিসাব নাম্বার</label>
                <input
                  value={accountQ}
                  onChange={(e) => {
                    setAccountQ(e.target.value)
                    resetToFirst()
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="হিসাব নাম্বার লিখুন"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">প্রতি পেইজ</label>
                <div className="flex items-center gap-2">
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value))
                      resetToFirst()
                    }}
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                  >
                    {[10, 25, 50, 100].map((n) => (
                      <option key={n} value={n}>
                        {n} রেকর্ড
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={resetToFirst}
                    className="h-12 w-12 rounded-xl border border-blue-600 bg-gradient-to-r from-blue-600 to-cyan-600 text-white grid place-items-center shadow-md hover:shadow-lg active:scale-95"
                    title="Search"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Showing + Pagination row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2">
          <div className="text-sm text-slate-700 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-slate-200">
            <span className="font-semibold text-slate-900">Showing</span>{" "}
            <span className="font-bold text-blue-700">
              {from} - {to}
            </span>{" "}
            of <span className="font-bold text-slate-900">{total}</span> records
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <PageBtn onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" />
            </PageBtn>

            {pages.map((p, idx) =>
              p === "…" ? (
                <span key={`dots-${idx}`} className="px-3 py-2 text-slate-500 font-semibold">
                  …
                </span>
              ) : (
                <PageBtn key={p} active={p === currentPage} onClick={() => setPage(p)}>
                  {p}
                </PageBtn>
              )
            )}

            <PageBtn onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </PageBtn>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-lg shadow-lg shadow-blue-100/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">তারিখ</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">মিটার নাম্বার</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">গ্রাহক</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">হিসাব নাম্বার</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">পূর্বের</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">বর্তমান</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">Diff</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-slate-800">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                      কোনো ডেটা পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => {
                    const diff = Number(r.current) - Number(r.prev)
                    return (
                      <tr
                        key={r.id}
                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 transition-all duration-200"
                      >
                        <td className="px-6 py-4 text-slate-700 font-medium">{r.date}</td>

                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900 bg-slate-100 rounded-lg px-3 py-2 inline-block">
                            {r.meterNo}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-900">{r.customerName}</div>
                          <div className="mt-1 text-sm text-blue-600">{r.phone}</div>
                        </td>

                        <td className="px-6 py-4 text-slate-900 font-medium">{r.accountNo}</td>
                        <td className="px-6 py-4 text-slate-900 font-bold">{Number(r.prev).toLocaleString()}</td>
                        <td className="px-6 py-4 text-slate-900 font-bold">{Number(r.current).toLocaleString()}</td>

                        <td className="px-6 py-4">
                          <DiffBadge diff={diff} />
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              title="View"
                              onClick={() => openWithRow(r, setViewOpen)}
                              className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                            >
                              <Eye className="h-5 w-5" />
                            </button>

                            <button
                              type="button"
                              title="Edit"
                              onClick={() => openWithRow(r, setEditOpen)}
                              className="p-2 rounded-full bg-cyan-50 text-cyan-600 hover:bg-cyan-100 transition"
                            >
                              <Pencil className="h-5 w-5" />
                            </button>

                            <button
                              type="button"
                              title="Delete"
                              onClick={() => openWithRow(r, setDeleteOpen)}
                              className="p-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ✅ MODALS */}

        {/* ADD NEW */}
        <Modal open={addOpen} onClose={closeAll} title="নতুন মিটার রিডিং যোগ করুন">
          <UpdateMeterReading
            initialData={null}
            onClose={closeAll}
            onSave={(payload) => handleAddSave(payload)}
          />
        </Modal>

        {/* VIEW */}
        <Modal open={viewOpen} onClose={closeAll} title="মিটার রিডিং বিস্তারিত">
          <ViewReading row={activeRow} />
        </Modal>

        {/* EDIT */}
        <Modal open={editOpen} onClose={closeAll} title="মিটার রিডিং এডিট করুন">
          <UpdateMeterReading
            initialData={activeRow}
            onClose={closeAll}
            onSave={(payload) => handleEditSave(payload)}
          />
        </Modal>

        {/* DELETE */}
        <Modal open={deleteOpen} onClose={closeAll} title="ডিলিট">
          <DeleteConfirm row={activeRow} onClose={closeAll} onConfirm={confirmDelete} />
        </Modal>
      </div>
    </div>
  )
}
