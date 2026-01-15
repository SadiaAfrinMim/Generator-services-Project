import React, { useMemo, useState } from "react"
import {
  Eye,
  Pencil,
  Search,
  ChevronLeft,
  ChevronRight,
  Home,
  Printer,
  Download,
  Plus,
  X,
  FileText,
} from "lucide-react"

import CustomerDetailsForm from "../inputField/CustomerDetailsForm"
import ChalanNewAddField from "../inputField/ChalanNewAddField"
import ChalanViewDetails from "../inputField/ChalanViewDetails"
import ChalanPrintView from "../inputField/ChalanPrintView"


import Modal from "../inputField/Modal"

/* =========================
   Small UI helpers (View/Print/Download Components)
   ========================= */

const InfoRow = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
    <div className="text-sm font-extrabold text-black">{label}</div>
    <div className="text-sm font-semibold text-black/80 text-right">
      {value ?? "—"}
    </div>
  </div>
)





function ChalanDownloadView({ row, onClose, onDownload }) {
  if (!row) return null

  return (
    <div className="p-5 text-black">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-black">ডাউনলোড</h3>
          <p className="text-sm font-semibold text-black/60">
            CSV ফাইল ডাউনলোড হবে।
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-black hover:bg-slate-50"
          title="বন্ধ করুন"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="text-sm font-extrabold text-black">Selected Receipt</div>
        <div className="mt-2 text-sm font-semibold text-black/70">
          রশিদ: <span className="font-extrabold text-black">{row.id}</span> • {row.date}
        </div>
        <div className="mt-1 text-sm font-semibold text-black/70">
          গ্রাহক: <span className="font-extrabold text-black">{row.customer}</span>
        </div>
        <div className="mt-1 text-sm font-semibold text-black/70">
          পরিমাণ:{" "}
          <span className="font-extrabold text-black">
            {Number(row.amount || 0).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-black hover:bg-slate-50"
        >
          বন্ধ করুন
        </button>

        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3 text-sm font-extrabold text-white hover:opacity-90"
        >
          <Download className="h-5 w-5" />
          Download CSV
        </button>
      </div>
    </div>
  )
}

/* =========================
   Main Component
   ========================= */

export default function Sales() {
  // Filters
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [receiptNo, setReceiptNo] = useState("")
  const [payMethod, setPayMethod] = useState("")
  const [perPage, setPerPage] = useState("50")
  const [account, setAccount] = useState("All")
  const [customer, setCustomer] = useState("All")

  // Pagination demo
  const total = 52023
  const [page, setPage] = useState(1)

  // Action Modals
  const [viewOpen, setViewOpen] = useState(false)
  const [printOpen, setPrintOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [activeRow, setActiveRow] = useState(null)

  const openView = (row) => { setActiveRow(row); setViewOpen(true) }
  const closeView = () => { setViewOpen(false); setActiveRow(null) }

  const openPrint = (row) => { setActiveRow(row); setPrintOpen(true) }
  const closePrint = () => { setPrintOpen(false); setActiveRow(null) }

  const openDownload = (row) => { setActiveRow(row); setDownloadOpen(true) }
  const closeDownload = () => { setDownloadOpen(false); setActiveRow(null) }

  // Edit/Add Modals
  const [editOpen, setEditOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [editingRow, setEditingRow] = useState(null)

  const openEdit = (row) => { setEditingRow(row); setEditOpen(true) }
  const closeEdit = () => { setEditOpen(false); setEditingRow(null) }

  const openAdd = () => setAddOpen(true)
  const closeAdd = () => setAddOpen(false)

  // Add Form
  const [addForm, setAddForm] = useState({
    date: "",
    customer: "",
    phone: "",
    receipt: "",
    type: "Invoice",
    drLine: "",
    crLine: "",
    amount: "",
    status: "Posted",
    payMethod: "",
  })

  const onAddChange = (key, val) => setAddForm((p) => ({ ...p, [key]: val }))

  // Demo rows
  const [rows, setRows] = useState([
    {
      id: 52023,
      date: "27-Dec-2025",
      type: "Invoice",
      code: "SGINV25120052023",
      customer: "25124 - শিপন সরকার ৪র্থ",
      phone: "01740-641165",
      amountLines: ["DR-গ্রাহক হিসাব [300]", "CR-বিক্রয় [300]"],
      amount: 300.0,
      status: "Posted",
      payMethod: "Cash",
    },
    {
      id: 52022,
      date: "27-Dec-2025",
      type: "Invoice",
      code: "SGINV25120052022",
      customer: "11086 - মধুসূদন সাহা",
      phone: "01712-269047",
      amountLines: ["DR-গ্রাহক হিসাব [360]", "CR-বিক্রয় [360]"],
      amount: 360.0,
      status: "Posted",
      payMethod: "Bank",
    },
  ])

  // Filter
  const filtered = useMemo(() => {
    const rno = receiptNo.trim()
    return rows.filter((r) => {
      if (rno && !String(r.id).includes(rno)) return false
      if (account !== "All" && !r.customer.includes(account)) return false
      if (customer !== "All" && !r.customer.includes(customer)) return false
      if (payMethod && r.payMethod !== payMethod) return false
      return true
    })
  }, [rows, receiptNo, account, customer, payMethod])

  const PageBtn = ({ active, children, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 min-w-9 rounded-md border px-3 text-sm font-bold transition ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-black border-slate-200 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  )

  // Add submit
  const submitAdd = (e) => {
    e.preventDefault()

    if (!addForm.date || !addForm.customer || !addForm.amount) {
      alert("তারিখ, গ্রাহক এবং পরিমাণ অবশ্যই দিতে হবে।")
      return
    }

    const topId = rows?.[0]?.id ?? 52023
    const nextId = topId + 1
    const amt = Number(addForm.amount || 0)

    const newRow = {
      id: nextId,
      date: addForm.date,
      type: addForm.type,
      code: addForm.receipt || `SGINV${nextId}`,
      customer: addForm.customer,
      phone: addForm.phone || "—",
      amountLines: [
        addForm.drLine || `DR-গ্রাহক হিসাব [${amt}]`,
        addForm.crLine || `CR-বিক্রয় [${amt}]`,
      ],
      amount: amt,
      status: addForm.status || "Posted",
      payMethod: addForm.payMethod || "Cash",
    }

    setRows((prev) => [newRow, ...prev])

    setAddForm({
      date: "",
      customer: "",
      phone: "",
      receipt: "",
      type: "Invoice",
      drLine: "",
      crLine: "",
      amount: "",
      status: "Posted",
      payMethod: "",
    })

    closeAdd()
  }

  // Print (simple)
  const handlePrint = () => window.print()

  // Download CSV
  const handleDownload = () => {
    if (!activeRow) return

    const headers = ["ReceiptID","Date","Type","Code","Customer","Phone","Amount","Status","PayMethod"]
    const values = [
      activeRow.id,
      activeRow.date,
      activeRow.type,
      activeRow.code,
      activeRow.customer,
      activeRow.phone,
      activeRow.amount,
      activeRow.status,
      activeRow.payMethod,
    ]

    const csv =
      `${headers.join(",")}\n` +
      `${values.map(v => `"${String(v ?? "").replaceAll('"','""')}"`).join(",")}\n`

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `receipt-${activeRow.id}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 text-black">
      <div className="mx-auto max-w-7xl">
        {/* Title + Breadcrumb + Add Button */}
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-lg md:text-xl font-extrabold text-black">
                চালানের তালিকা
              </h1>

              <div className="mt-1 flex items-center justify-start gap-2 text-sm font-bold">
                <span className="inline-flex items-center gap-1 text-blue-600">
                  <Home className="h-4 w-4" />
                  ড্যাশবোর্ড
                </span>
                <span className="text-slate-400">/</span>
                <span className="text-blue-600">চালানের তালিকা</span>
                <span className="text-slate-400">/</span>
                <span className="text-black">আউটলেট</span>
              </div>
            </div>

            <button
              type="button"
              onClick={openAdd}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm hover:opacity-90 transition"
            >
              <Plus className="h-5 w-5" />
              নতুন চালান যোগ করুন
            </button>
          </div>
        </div>

        {/* Filters panel */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
              <div className="md:col-span-3">
                <label className="block text-sm font-bold text-black mb-1">
                  তারিখ
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-bold text-black mb-1">
                  রশিদ নাম্বার
                </label>
                <input
                  value={receiptNo}
                  onChange={(e) => setReceiptNo(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-bold text-black mb-1">
                  মূল্যপরিশোধ পদ্ধতি
                </label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">-</option>
                  <option value="Cash">ক্যাশ</option>
                  <option value="Bank">ব্যাংক</option>
                  <option value="Mobile">মোবাইল ব্যাংকিং</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-bold text-black mb-1">
                  প্রতি পৃষ্ঠা
                </label>
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-bold text-black mb-1">
                  অ্যাকাউন্ট
                </label>
                <select
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="All">All</option>
                  <option value="25124">25124</option>
                  <option value="11086">11086</option>
                </select>
              </div>

              <div className="md:col-span-5">
                <label className="block text-sm font-bold text-black mb-1">
                  গ্রাহক
                </label>
                <select
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="All">All</option>
                  <option value="শিপন">শিপন সরকার ৪র্থ</option>
                  <option value="মধুসূদন">মধুসূদন সাহা</option>
                </select>
              </div>

              <div className="md:col-span-1 flex items-end">
                <button
                  type="button"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-black shadow-sm hover:bg-slate-50 transition"
                  title="খুঁজুন"
                >
                  <Search className="h-5 w-5 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination info */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm font-bold text-black">
              Showing <span className="font-extrabold">1</span> -{" "}
              <span className="font-extrabold">{perPage}</span> of{" "}
              <span className="font-extrabold">{total}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                className="h-9 w-9 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition flex items-center justify-center"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                title="পূর্ববর্তী"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                <PageBtn key={n} active={page === n} onClick={() => setPage(n)}>
                  {n}
                </PageBtn>
              ))}

              <span className="px-2 text-sm font-extrabold text-black">...</span>

              <PageBtn active={false} onClick={() => setPage(1040)}>
                1040
              </PageBtn>
              <PageBtn active={false} onClick={() => setPage(1041)}>
                1041
              </PageBtn>

              <button
                type="button"
                className="h-9 w-9 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition flex items-center justify-center"
                onClick={() => setPage((p) => p + 1)}
                title="পরবর্তী"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[1050px] w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm font-extrabold text-black">
                  <th className="px-5 py-4">রশিদ</th>
                  <th className="px-5 py-4">লেনদেনের প্রকার</th>
                  <th className="px-5 py-4">গ্রাহক</th>
                  <th className="px-5 py-4">অ্যাকাউন্ট</th>
                  <th className="px-5 py-4">পরিমাণ</th>
                  <th className="px-5 py-4">স্ট্যাটাস</th>
                  <th className="px-5 py-4 text-center">অ্যাকশন</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-10 text-center text-sm font-semibold text-black"
                    >
                      কোনো ডাটা পাওয়া যায়নি।
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-4">
                        <div className="font-extrabold text-black">{r.id}</div>
                        <div className="mt-1 text-xs font-semibold text-blue-600">
                          {r.date}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-bold text-black">{r.type}</div>
                        <div className="mt-1 text-xs font-semibold text-blue-600">
                          {r.code}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-bold text-black">{r.customer}</div>
                        <div className="mt-1 text-xs font-semibold text-blue-600">
                          {r.phone}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="space-y-1 text-sm font-bold text-black">
                          <div>{r.amountLines[0]}</div>
                          <div>{r.amountLines[1]}</div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-extrabold text-black">
                          {r.amount.toFixed(2)}
                        </div>
                        <div className="mt-1 text-xs font-bold text-red-600">
                          {r.amount.toFixed(2)}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-bold text-blue-600">{r.status}</div>
                        <div className="mt-1 text-xs font-semibold text-blue-600">
                          {r.date}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => openView(r)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-black hover:bg-slate-50 transition"
                            title="দেখুন"
                          >
                            <Eye className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => openEdit(r)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-black hover:bg-slate-50 transition"
                            title="এডিট"
                          >
                            <Pencil className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => openPrint(r)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-black hover:bg-slate-50 transition"
                            title="প্রিন্ট"
                          >
                            <Printer className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => openDownload(r)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-black hover:bg-slate-50 transition"
                            title="ডাউনলোড"
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

        {/* EDIT MODAL */}
        <Modal open={editOpen} onClose={closeEdit} title="গ্রাহকের বিস্তারিত (Edit)">
          <CustomerDetailsForm initialData={editingRow} onClose={closeEdit} />
        </Modal>

        {/* ADD NEW MODAL */}
        <Modal
          open={addOpen}
          onClose={closeAdd}
          title="নতুন চালান / রশিদ যোগ করুন"
          size="lg"
        >
          <ChalanNewAddField
            addForm={addForm}
            onAddChange={onAddChange}
            submitAdd={submitAdd}
            closeAdd={closeAdd}
          />
        </Modal>

        <Modal open={viewOpen} onClose={closeView} title="চালান / রশিদ বিস্তারিত" size="lg">
  <ChalanViewDetails row={activeRow} activeRow={activeRow} InfoRow={InfoRow} onClose={closeView} />
</Modal>


        {/* VIEW MODAL */}
        <Modal open={printOpen} onClose={closePrint} title="প্রিন্ট" size="lg">
  <ChalanViewDetails row={activeRow} onClose={closePrint}  InfoRow={InfoRow} />
</Modal>

        {/* PRINT MODAL */}
        <Modal open={printOpen} onClose={closePrint} title="প্রিন্ট" size="lg">
          <ChalanPrintView row={activeRow} onClose={closePrint} onPrint={handlePrint} InfoRow={InfoRow}  />
        </Modal>

        {/* DOWNLOAD MODAL */}
        <Modal open={downloadOpen} onClose={closeDownload} title="ডাউনলোড" size="lg">
          <ChalanDownloadView row={activeRow} onClose={closeDownload} onDownload={handleDownload} />
        </Modal>
      </div>
    </div>
  )
}
