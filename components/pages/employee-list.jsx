"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2 } from "lucide-react"

const employeeData = [
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

export default function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const filteredData = employeeData.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">কর্মচারী তালিকা</h1>
          <p className="text-gray-600 text-sm mt-1">মোট: {filteredData.length} জন কর্মচারী</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition">
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
              {filteredData.map((emp, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition">
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
                      <button className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded-lg transition text-red-600">
                        <Trash2 size={18} />
                      </button>
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
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm">&lt;</button>
            <button className="px-3 py-1 bg-sky-500 text-white rounded-lg text-sm">{currentPage}</button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  )
}
