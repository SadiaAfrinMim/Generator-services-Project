import { useMemo, useState } from "react"
import { Search, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import Modal from "../inputField/Modal"
import CustomerDetailsForm from "../inputField/CustomerDetailsForm"

const vendorData = [
  { id: 1, name: "টেক আইটি বি ডি লিমিটেড", phone: "01717055765", email: "abir@tech365.com", status: "Active" },
  { id: 2, name: "রহিম ট্রেডার্স", phone: "01812000000", email: "rahim@traders.com", status: "Active" },
  { id: 3, name: "সালমান এন্টারপ্রাইজ", phone: "01933000000", email: "salman@enterprise.com", status: "Inactive" },
]

function PageBtn({ active, children, onClick, disabled }) {
  return (
    <button
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

export default function VendorList() {
  const [pageSize, setPageSize] = useState(10)
  const [query, setQuery] = useState("")
  const [searchType, setSearchType] = useState("All")
  const [page, setPage] = useState(1)

  // ✅ Modal state এখানে থাকবে
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
    const q = query.trim().toLowerCase()
    if (!q) return vendorData

    return vendorData.filter((v) => {
      const name = (v.name || "").toLowerCase()
      const phone = (v.phone || "").toLowerCase()
      const email = (v.email || "").toLowerCase()

      if (searchType === "Name") return name.includes(q)
      if (searchType === "Phone") return phone.includes(q)
      if (searchType === "Email") return email.includes(q)

      return `${name} ${phone} ${email}`.includes(q)
    })
  }, [query, searchType])

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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 space-y-4">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-extrabold text-slate-900">বিক্রেতার তালিকা</h1>

          <div className="text-sm text-slate-500">
            <span className="text-blue-600 hover:underline cursor-pointer">ড্যাশবোর্ড</span>
            <span className="mx-2">/</span>
            <span className="text-blue-600 hover:underline cursor-pointer">বিক্রেতার তালিকা</span>
            <span className="mx-2">/</span>
            <span className="text-slate-500">অ্যাড নিউ</span>
          </div>
        </div>

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
                          <button className="text-blue-600 hover:text-blue-700" title="View">
                            <Eye className="h-5 w-5" />
                          </button>

                          {/* ✅ এখানে v পাঠালাম */}
                          <button
                            className="text-blue-600 hover:text-blue-700"
                            title="Edit"
                            onClick={() => openEdit(v)}
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

              <PageBtn onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </PageBtn>
            </div>
          </div>
        </div>

        {/* ✅ Modal (return এর ভিতরে) */}
        <Modal open={editOpen} onClose={closeEdit} title="বিক্রেতার বিস্তারিত (Edit)">
          <CustomerDetailsForm initialData={editingRow} onClose={closeEdit} />
        </Modal>
      </div>
    </div>
  )
}
