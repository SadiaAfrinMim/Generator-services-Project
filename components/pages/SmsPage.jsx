import React, { useState } from "react"
import { Send, MessageSquare, Phone, CheckCircle } from "lucide-react"

export default function SmsPage() {
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (!phone || !message) {
      alert("মোবাইল নাম্বার ও মেসেজ লিখুন")
      return
    }
    alert("SMS Sent (Demo)")
    setPhone("")
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 text-black">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
            <MessageSquare className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold">SMS Management</h1>
            <p className="text-sm font-semibold text-black/60">
              গ্রাহকদের SMS পাঠান ও হিস্টোরি দেখুন
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 border border-slate-200">
            <div className="text-sm font-bold text-black/60">আজ পাঠানো</div>
            <div className="mt-2 text-2xl font-extrabold">24</div>
          </div>

          <div className="rounded-2xl bg-white p-5 border border-slate-200">
            <div className="text-sm font-bold text-black/60">মোট SMS</div>
            <div className="mt-2 text-2xl font-extrabold">1,245</div>
          </div>

          <div className="rounded-2xl bg-white p-5 border border-slate-200">
            <div className="text-sm font-bold text-black/60">SMS Balance</div>
            <div className="mt-2 text-2xl font-extrabold text-green-600">
              520
            </div>
          </div>
        </div>

        {/* Send SMS */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-extrabold">নতুন SMS পাঠান</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-bold mb-1">
                মোবাইল নাম্বার
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">
                মেসেজ
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="আপনার মেসেজ লিখুন..."
                className="w-full rounded-xl border border-slate-200 px-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSend}
              className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-extrabold text-white hover:opacity-90"
            >
              <Send className="h-5 w-5" />
              SMS পাঠান
            </button>
          </div>
        </div>

        {/* SMS History */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-5 py-4 border-b font-extrabold">
            সাম্প্রতিক SMS
          </div>

          <table className="w-full">
            <thead className="bg-slate-50 text-sm font-bold">
              <tr>
                <th className="px-5 py-3 text-left">মোবাইল</th>
                <th className="px-5 py-3 text-left">মেসেজ</th>
                <th className="px-5 py-3 text-left">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-semibold">
                    017XXXXXXXX
                  </td>
                  <td className="px-5 py-3 text-sm">
                    আপনার বিল পরিশোধ সফল হয়েছে।
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-extrabold text-green-700">
                      <CheckCircle className="h-4 w-4" />
                      Sent
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
