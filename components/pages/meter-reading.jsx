import { useMemo, useState } from "react"
import { Search, Eye, Pencil, ChevronLeft, ChevronRight } from "lucide-react"
import Modal from "../inputField/Modal"
import UpdateMeterReading from "../inputField/UpdateMeterReading"

/**
 * MeterReading()
 * - Screenshot এর মতো layout: title + breadcrumb
 * - Top filter card: Meter No, Customer, Account No, Per Page + Search btn
 * - Showing row + Pagination row
 * - Table columns: Date, Meter No, Customer, Account No, Prev, Current, Diff, Action
 * - Responsive + eyecatchy (soft gradient bg + clean card)
 */

const demoReadings = [
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
  // difference টা বেশি হলে একটু highlight
  const high = diff >= 10
  return (
    <span
      className={[
        "inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-bold ring-1",
        high
          ? "bg-amber-50 text-amber-700 ring-amber-200"
          : "bg-slate-50 text-slate-700 ring-slate-200",
      ].join(" ")}
    >
      {diff}
    </span>
  )
}

export default function MeterReading() {
  // Filters (screenshot অনুযায়ী)
  const [meterQ, setMeterQ] = useState("")
  const [customerQ, setCustomerQ] = useState("")
  const [accountQ, setAccountQ] = useState("")
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
    const m = meterQ.trim().toLowerCase()
    const c = customerQ.trim().toLowerCase()
    const a = accountQ.trim().toLowerCase()

    return demoReadings.filter((r) => {
      const okMeter = !m || String(r.meterNo).toLowerCase().includes(m)
      const okCustomer =
        !c ||
        String(r.customerName).toLowerCase().includes(c) ||
        String(r.phone).toLowerCase().includes(c)
      const okAccount = !a || String(r.accountNo).toLowerCase().includes(a)
      return okMeter && okCustomer && okAccount
    })
  }, [meterQ, customerQ, accountQ])

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
    // like screenshot: 1 2 3 ... last-1 last
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

  const resetToFirst = () => setPage(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* soft blobs to make it eyecatchy */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" />
        <div className="absolute top-40 -right-24 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-200/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Title + breadcrumb */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
              মিটার রিডিং তালিকা
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              সমস্ত মিটার রিডিং এর সম্পূর্ণ তথ্য এবং ব্যবস্থাপনা
            </p>
          </div>

          <div className="text-sm text-slate-500 flex items-center">
            <span className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-colors">
              ড্যাশবোর্ড
            </span>
            <span className="mx-2">/</span>
            <span className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-colors">
              মিটার রিডিং তালিকা
            </span>
            <span className="mx-2">/</span>
            <span className="text-slate-400">অ্যাড নিউ</span>
          </div>
        </div>

        {/* Filter Card */}
        <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-lg shadow-lg shadow-blue-100/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/70">
          <div className="p-5 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              ফিল্টার অপশন
            </h2>
            
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  মিটার নাম্বার
                </label>
                <div className="relative">
                  <input
                    value={meterQ}
                    onChange={(e) => {
                      setMeterQ(e.target.value)
                      resetToFirst()
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                    placeholder="মিটার নাম্বার লিখুন"
                  />
                </div>
              </div>

              <div className="lg:col-span-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  গ্রাহক
                </label>
                <div className="relative">
                  <input
                    value={customerQ}
                    onChange={(e) => {
                      setCustomerQ(e.target.value)
                      resetToFirst()
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                    placeholder="গ্রাহকের নাম বা ফোন"
                  />
                </div>
              </div>

              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  হিসাব নাম্বার
                </label>
                <div className="relative">
                  <input
                    value={accountQ}
                    onChange={(e) => {
                      setAccountQ(e.target.value)
                      resetToFirst()
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                    placeholder="হিসাব নাম্বার লিখুন"
                  />
                </div>
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  প্রতি পেইজ
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value))
                        resetToFirst()
                      }}
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all appearance-none"
                    >
                      {[10, 25, 50, 100].map((n) => (
                        <option key={n} value={n}>
                          {n} রেকর্ড
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <button
                    onClick={resetToFirst}
                    className="h-12 w-12 rounded-xl border border-blue-600 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 grid place-items-center shadow-md hover:shadow-lg active:scale-95"
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
            <PageBtn
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
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

        {/* Table Card */}
        <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-lg shadow-lg shadow-blue-100/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/70">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">
                    তারিখ
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">
                    মিটার নাম্বার
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">
                    গ্রাহক
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">
                    হিসাব নাম্বার
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">
                    পূর্বের রিডিং
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">
                    বর্তমান রিডিং
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">
                    রিডিং পার্থক্য
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
                          <Search className="h-8 w-8 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-slate-700">কোনো ডেটা পাওয়া যায়নি</p>
                          <p className="text-sm text-slate-500 mt-1">অনুগ্রহ করে ভিন্ন ফিল্টার চেষ্টা করুন</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => {
                    const diff = Number(r.current) - Number(r.prev)
                    return (
                      <tr 
                        key={r.id} 
                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 transition-all duration-200 group"
                      >
                        <td className="px-6 py-4">
                          <div className="text-slate-700 font-medium">{r.date}</div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900 bg-slate-100/80 group-hover:bg-white rounded-lg px-3 py-2 inline-block">
                            {r.meterNo}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-slate-900">{r.customerName}</div>
                            <div className="mt-1 text-sm text-blue-600 hover:text-blue-700 cursor-pointer transition-colors flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                              {r.phone}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-slate-900 font-medium">{r.accountNo}</div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="text-slate-900 font-bold text-lg">{r.prev.toLocaleString()}</div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="text-slate-900 font-bold text-lg">{r.current.toLocaleString()}</div>
                        </td>

                        <td className="px-6 py-4">
                          <DiffBadge diff={diff} />
                          {diff >= 10 && (
                            <div className="mt-1 text-xs text-amber-600 font-medium">
                              উচ্চ পার্থক্য
                            </div>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-3">
                            <button 
                              title="View" 
                              className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 hover:scale-110"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => openEdit(r)}
                              className="p-2 rounded-full bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 transition-all duration-300 hover:scale-110"
                              title="Edit"
                            >
                              <Pencil className="h-5 w-5" />
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

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-xs text-slate-500 px-4 py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200 inline-block">
            <span className="font-medium">টিপ:</span> Mobile/ছোট স্ক্রিনে টেবিলটি horizontally scroll হবে (↔) — সম্পূর্ণ responsive ডিজাইন
          </p>
        </div>

        {/* Edit Modal */}
        <Modal open={editOpen} onClose={closeEdit} title="মিটার রিডিং এডিট করুন">
          <UpdateMeterReading 
            initialData={editingRow} 
            onClose={closeEdit} 
            onSave={(updatedData) => {
              console.log("Updated data:", updatedData)
              closeEdit()
            }}
          />
        </Modal>
      </div>

      
    </div>
  )
}