"use client"

import { useState } from "react"
import { Search, Download, Eye } from "lucide-react"

const invoiceData = [
  {
    id: "52023",
    date: "27-Dec-2025",
    invoiceNo: "SGINV25120052023",
    customer: "শিপন সাহা (৪র্থ)",
    amount: "300.00",
    status: "পোস্ট করা",
    type: "চালান",
  },
  {
    id: "52022",
    date: "27-Dec-2025",
    invoiceNo: "SGINV25120052022",
    customer: "মধুসুধন সাহা",
    amount: "360.00",
    status: "পোস্ট করা",
    type: "চালান",
  },
  {
    id: "52021",
    date: "26-Dec-2025",
    invoiceNo: "SGINV25120052021",
    customer: "রহিম হোসেইন",
    amount: "450.00",
    status: "খসড়া",
    type: "চালান",
  },
  {
    id: "52020",
    date: "25-Dec-2025",
    invoiceNo: "SGINV25120052020",
    customer: "ফাতেমা বেগম",
    amount: "280.00",
    status: "পোস্ট করা",
    type: "চালান",
  },
]

export default function InvoiceList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("সব")

  const filteredData = invoiceData.filter(
    (invoice) =>
      (invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "সব" || invoice.status === filterStatus),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">চালান তালিকা</h1>
          <p className="text-gray-600 text-sm mt-1">মোট: {filteredData.length} টি চালান</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition">
          <Download size={20} />
          নতুন চালান তৈরি করুন
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="গ্রাহক বা চালান খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 bg-white"
          >
            <option>সব অবস্থা</option>
            <option>পোস্ট করা</option>
            <option>খসড়া</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 bg-white">
            <option>সব অ্যাকাউন্ট</option>
            <option>বিক্রয় অ্যাকাউন্ট</option>
            <option>পাওনা হিসাব</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-sky-50 to-cyan-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">তারিখ</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">চালান নম্বর</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">গ্রাহক</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">পরিমাণ</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">অবস্থা</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">ক্রিয়া</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((invoice, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-900 font-medium">{invoice.date}</td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 font-semibold">{invoice.invoiceNo}</p>
                    <p className="text-xs text-gray-600 mt-1">{invoice.type}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{invoice.customer}</td>
                  <td className="px-6 py-4 font-bold text-sky-600">৳ {invoice.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        invoice.status === "পোস্ট করা" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 hover:bg-green-100 rounded-lg transition text-green-600">
                        <Download size={18} />
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
          <p className="text-sm text-gray-600">প্রতি পৃষ্ঠায় দেখাচ্ছে: 50</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm">&lt;</button>
            <button className="px-3 py-1 bg-sky-500 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  )
}
