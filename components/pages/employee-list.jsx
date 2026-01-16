import { useMemo, useState } from "react"
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Printer,
  Download,
  X,
} from "lucide-react"
import EmployeeView from "../inputField/EmployeeView"
import EmployeeForm from "../inputField/EmployeeForm"
import DeleteConfirm from "../inputField/DeleteConfirm"
import PrintView from "../inputField/PrintView"
import DownloadView from "../inputField/DownloadView"

/* =========================
   Demo Data
========================= */
const initialEmployees = [
  {
    id: 1,
    name: "মোহাম্মদ আলী",
    designation: "কম্পিউটার অপারেটর",
    department: "আইটি",
    contact: "01799-080793",
    email: "ali@tech.com",
    status: "সক্রিয়",
  },
  {
    id: 2,
    name: "এআলএম আল্লামগীর হোসেইন",
    designation: "সিনিয়র লাইন ম্যান",
    department: "অপারেশন",
    contact: "01719-071741",
    email: "alamgir@tech.com",
    status: "সক্রিয়",
  },
  {
    id: 3,
    name: "মোঃ এ. করিম",
    designation: "সিনিয়র লাইন ম্যান",
    department: "অপারেশন",
    contact: "01712-350717",
    email: "karim@tech.com",
    status: "সক্রিয়",
  },
  {
    id: 4,
    name: "ফাতেমা খান",
    designation: "অ্যাকাউন্ট ম্যানেজার",
    department: "অ্যাকাউন্টিং",
    contact: "01798-123456",
    email: "fatema@tech.com",
    status: "সক্রিয়",
  },
  {
    id: 5,
    name: "রহিম আহমদ",
    designation: "বিক্রয় প্রতিনিধি",
    department: "বিক্রয়",
    contact: "01755-654321",
    email: "rahim@tech.com",
    status: "সক্রিয়",
  },
]

/* =========================
   Reusable Modal (No external component needed)
========================= */
function Modal({ open, title, onClose, children, size = "md" }) {
  if (!open) return null

  const maxW =
    size === "lg"
      ? "max-w-3xl"
      : size === "xl"
      ? "max-w-5xl"
      : "max-w-xl"

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="Close modal overlay"
      />
      {/* dialog */}
      <div className="relative mx-auto mt-10 w-[92%]">
        <div className={`mx-auto ${maxW} rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden`}>
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-sky-50 to-cyan-50">
            <h3 className="text-base md:text-lg font-extrabold text-slate-900">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 transition"
              title="বন্ধ করুন"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  )
}

/* =========================
   Small UI helpers
========================= */
const Field = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
    <div className="text-sm font-extrabold text-slate-900">{label}</div>
    <div className="text-sm font-semibold text-slate-700 text-right">
      {value ?? "—"}
    </div>
  </div>
)

function ActionBtn({ title, onClick, children, color = "slate" }) {
  const map = {
    slate: "hover:bg-slate-50 text-slate-800",
    blue: "hover:bg-blue-50 text-blue-700",
    emerald: "hover:bg-emerald-50 text-emerald-700",
    red: "hover:bg-red-50 text-red-700",
  }
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition ${map[color] || map.slate}`}
    >
      {children}
    </button>
  )
}




/* =========================
   Main Page
========================= */
export default function EmployeeList() {
  const [rows, setRows] = useState(initialEmployees)

  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // active row for actions
  const [activeRow, setActiveRow] = useState(null)

  // modal states
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

  const filteredData = useMemo(() => {
    const t = searchTerm.toLowerCase()
    return rows.filter(
      (emp) =>
        emp.name.toLowerCase().includes(t) ||
        emp.designation.toLowerCase().includes(t),
    )
  }, [rows, searchTerm])

  // Pagination (simple demo)
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage))
  const pageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  // Add
  const onAdd = (form) => {
    const nextId = (rows?.[0]?.id ?? 0) + 1
    const newRow = { id: nextId, ...form }
    setRows((prev) => [newRow, ...prev])
    closeAll()
  }

  // Edit
  const onEdit = (form) => {
    if (!activeRow) return
    setRows((prev) =>
      prev.map((r) => (r.id === activeRow.id ? { ...r, ...form } : r)),
    )
    closeAll()
  }

  // Delete
  const onDelete = () => {
    if (!activeRow) return
    setRows((prev) => prev.filter((r) => r.id !== activeRow.id))
    closeAll()
  }

  // Print
  const onPrint = () => window.print()

  // Download CSV
  const onDownload = () => {
    if (!activeRow) return

    const headers = ["ID", "Name", "Designation", "Department", "Contact", "Email", "Status"]
    const values = [
      activeRow.id,
      activeRow.name,
      activeRow.designation,
      activeRow.department,
      activeRow.contact,
      activeRow.email,
      activeRow.status,
    ]

    const csv =
      `${headers.join(",")}\n` +
      `${values.map((v) => `"${String(v ?? "").replaceAll('"', '""')}"`).join(",")}\n`

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `employee-${activeRow.id}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">কর্মচারী তালিকা</h1>
          <p className="text-gray-600 text-sm mt-1">
            মোট: {filteredData.length} জন কর্মচারী
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
        >
          <Plus size={20} />
          নতুন কর্মচারী যোগ করুন
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="নাম বা পদে অনুসন্ধান করুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500"
            />
          </div>

          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 bg-white">
            <option>সব বিভাগ</option>
            <option>আইটি</option>
            <option>বিক্রয়</option>
            <option>অপারেশন</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-sky-50 to-cyan-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">নাম</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">পদ ও বিভাগ</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">যোগাযোগ</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">অবস্থা</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">ক্রিয়া</th>
              </tr>
            </thead>

            <tbody>
              {pageData.map((emp) => (
                <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{emp.name}</p>
                        <p className="text-sm text-gray-600">{emp.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{emp.designation}</p>
                      <p className="text-sm text-gray-600">{emp.department}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-gray-900 font-medium">{emp.contact}</p>
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {emp.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <ActionBtn title="View" color="blue" onClick={() => openWithRow(emp, setViewOpen)}>
                        <Eye size={18} />
                      </ActionBtn>

                      <ActionBtn title="Edit" color="emerald" onClick={() => openWithRow(emp, setEditOpen)}>
                        <Edit size={18} />
                      </ActionBtn>

                      <ActionBtn title="Delete" color="red" onClick={() => openWithRow(emp, setDeleteOpen)}>
                        <Trash2 size={18} />
                      </ActionBtn>

                      <ActionBtn title="Print" onClick={() => openWithRow(emp, setPrintOpen)}>
                        <Printer size={18} />
                      </ActionBtn>

                      <ActionBtn title="Download" onClick={() => openWithRow(emp, setDownloadOpen)}>
                        <Download size={18} />
                      </ActionBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <p className="text-sm text-gray-600">প্রতি পৃষ্ঠায় দেখাচ্ছে: {itemsPerPage}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm"
            >
              &lt;
            </button>
            <button className="px-3 py-1 bg-sky-500 text-white rounded-lg text-sm">
              {currentPage}
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* =========================
          MODALS
      ========================= */}

      {/* ADD */}
      <Modal open={addOpen} title="নতুন কর্মচারী যোগ করুন" onClose={closeAll} size="lg">
        <EmployeeForm mode="add" onCancel={closeAll} onSubmit={onAdd} />
      </Modal>

      {/* VIEW */}
      <Modal open={viewOpen} title="কর্মচারী বিস্তারিত" onClose={closeAll} size="lg">
        <EmployeeView row={activeRow} Field = {Field}/>
      </Modal>

      {/* EDIT */}
      <Modal open={editOpen} title="কর্মচারী তথ্য (Edit)" onClose={closeAll} size="lg">
        <EmployeeForm mode="edit" initial={activeRow} onCancel={closeAll} onSubmit={onEdit} />
      </Modal>

      {/* DELETE */}
      <Modal open={deleteOpen} title="ডিলিট কনফার্ম" onClose={closeAll}>
        <DeleteConfirm row={activeRow} onCancel={closeAll} onConfirm={onDelete} />
      </Modal>

      {/* PRINT */}
      <Modal open={printOpen} title="প্রিন্ট" onClose={closeAll} size="lg">
        <PrintView row={activeRow} onPrint={onPrint} Field={Field} />
      </Modal>

      {/* DOWNLOAD */}
      <Modal open={downloadOpen} title="ডাউনলোড" onClose={closeAll} size="lg">
        <DownloadView row={activeRow} onDownload={onDownload} />
      </Modal>
    </div>
  )
}
