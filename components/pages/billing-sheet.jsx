export default function BillingSheet() {
  return (
    <div className="p-4 space-y-4">
      {/* Header + Breadcrumb */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">পেমেন্ট গ্রহণ তালিকা</h1>
        <div className="text-sm text-blue-600">
          ড্যাশবোর্ড / পেমেন্ট গ্রহণ তালিকা / অ্যাড নিউ
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded shadow p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          {/* তারিখ (From) */}
          <div>
            <label className="text-sm block mb-1">তারিখ</label>
            <div className="flex gap-2">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder=""
                  className="w-full border rounded px-3 py-2 pr-10"
                />
                <span className="absolute right-3 top-2.5">📅</span>
              </div>

              {/* তারিখ (To) */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder=""
                  className="w-full border rounded px-3 py-2 pr-10"
                />
                <span className="absolute right-3 top-2.5">📅</span>
              </div>
            </div>
          </div>

          {/* রসিদ নাম্বার */}
          <div>
            <label className="text-sm block mb-1">রসিদ নাম্বার</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder=""
            />
          </div>

          {/* মূল্যপরিশোধ পদ্ধতি */}
          <div>
            <label className="text-sm block mb-1">মূল্যপরিশোধ পদ্ধতি</label>
            <select className="w-full border rounded px-3 py-2">
              <option value="">--</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>

          {/* প্রতি পৃষ্ঠা */}
          <div>
            <label className="text-sm block mb-1">প্রতি পৃষ্ঠা</label>
            <select className="w-full border rounded px-3 py-2">
              <option>50</option>
              <option>100</option>
              <option>200</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex gap-2">
            <button className="border rounded px-3 py-2">🔍</button>
          </div>
        </div>

        {/* Account + Customer row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-sm block mb-1">অ্যাকাউন্ট</label>
            <select className="w-full border rounded px-3 py-2">
              <option>All</option>
              <option>DR-প্রাপ্ত হিসাব</option>
              <option>CR-প্রাপ্ত হিসাব</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm block mb-1">গ্রাহক</label>
            <select className="w-full border rounded px-3 py-2">
              <option>All</option>
              <option>শাহিদ (আবাস)</option>
              <option>মধুসূদন সাহা</option>
            </select>
          </div>
        </div>
      </div>

      {/* Showing + Pagination */}
      <div className="bg-white rounded shadow p-3 space-y-3">
        <div className="text-sm">Showing 1 - 50 of 52477</div>

        <div className="flex gap-1 flex-wrap text-sm">
          <button className="px-2 py-1 border rounded">‹</button>
          {[1,2,3,4,5,6,7,8,9,10].map((n) => (
            <button
              key={n}
              className={`px-3 py-1 border rounded ${
                n === 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {n}
            </button>
          ))}
          <span className="px-2 py-1">...</span>
          <button className="px-3 py-1 border rounded">1049</button>
          <button className="px-3 py-1 border rounded">1050</button>
          <button className="px-2 py-1 border rounded">›</button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left">
                <th className="py-3 px-2">রসিদ</th>
                <th className="py-3 px-2">লেনদেনের প্রকার</th>
                <th className="py-3 px-2">গ্রাহক</th>
                <th className="py-3 px-2">অ্যাকাউন্ট</th>
                <th className="py-3 px-2">পরিমান</th>
                <th className="py-3 px-2">অ্যাকশন</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b bg-gray-50">
                <td className="py-3 px-2">
                  <div className="font-medium">52477</div>
                  <div className="text-blue-600 text-xs">10-Dec-2025</div>
                </td>

                <td className="py-3 px-2 space-y-1">
                  <div>Invoice</div>
                  <div>Payment</div>
                  <div>Receive</div>
                  <div className="text-blue-600 text-xs mt-2">Cash</div>
                </td>

                <td className="py-3 px-2">
                  <div className="font-medium">25091 - শাহিদ (আবাস)</div>
                  <div className="text-blue-600 text-xs">
                    Customer, 01518-971546
                  </div>
                </td>

                <td className="py-3 px-2 space-y-1">
                  <div className="text-blue-600">DR-প্রাপ্ত হিসাব [300]</div>
                  <div className="text-blue-600">CR-প্রাপ্ত হিসাব [300]</div>
                </td>

                <td className="py-3 px-2">300.00</td>

                <td className="py-3 px-2">
                  <button className="text-blue-600">✏️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
