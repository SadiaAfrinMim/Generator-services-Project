import { useMemo, useState } from "react"
import { Search, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

import Modal from "../inputField/Modal"
import CustomerDetailsForm from "../inputField/CustomerDetailsForm"

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
  return <span className="text-slate-900">{status}</span>
}

function PageBtn({ active, children, onClick, disabled }) {
  return (
    <button
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

export default function CustomerList() {
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

  // ✅ Modal state
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
    const cq = customerQ.trim()
    const aq = accountQ.trim()
    const mq = meterQ.trim()
    const pq = phoneQ.trim()

    return customerData.filter((c) => {
      const okCustomer = !cq || c.name.includes(cq) || (c.address ?? "").includes(cq)
      const okAccount = !aq || String(c.account).includes(aq)
      const okMeter = !mq || String(c.meter).includes(mq)
      const okPhone = !pq || String(c.contact).includes(pq)

      const okArea = area === "Select" || (c.address ?? "").includes(area)
      const okStatus = status === "সব গুলো" || c.status === status

      return okCustomer && okAccount && okMeter && okPhone && okArea && okStatus
    })
  }, [customerQ, accountQ, meterQ, phoneQ, area, status])

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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-5 space-y-4">
        {/* Title + breadcrumb */}
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-bold text-slate-900">গ্রাহক তালিকা</h1>

          <div className="text-sm text-slate-500">
            <span className="text-blue-600 hover:underline cursor-pointer">ড্যাশবোর্ড</span>
            <span className="mx-2">/</span>
            <span className="text-blue-600 hover:underline cursor-pointer">গ্রাহক তালিকা</span>
            <span className="mx-2">/</span>
            <span className="text-slate-500">অ্যাড নিউ</span>
          </div>
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
                  <th className="px-4 py-3 text-base font-bold text-slate-800 border-b border-slate-200 text-center">অ্যাকশন</th>
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
                    <tr key={c.id} className="border-b border-slate-100">
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
                          <button className="text-blue-600 hover:text-blue-700" title="View">
                            <Eye className="h-5 w-5" />
                          </button>

                          {/* ✅ একটাই Edit button + c পাঠালাম */}
                          <button
                            className="text-blue-600 hover:text-blue-700"
                            title="Edit"
                            onClick={() => openEdit(c)}
                          >
                            <Pencil className="h-5 w-5" />
                          </button>

                          <button className="text-blue-600 hover:text-blue-700" title="Delete">
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
        </div>

        {/* ✅ Modal MUST be inside return */}
        <Modal open={editOpen} onClose={closeEdit} title="গ্রাহকের বিস্তারিত (Edit)">
          <CustomerDetailsForm initialData={editingRow} onClose={closeEdit} />
        </Modal>
      </div>
    </div>
  )
}
