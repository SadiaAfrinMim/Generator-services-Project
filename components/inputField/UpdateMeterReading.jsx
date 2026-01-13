import { useMemo, useState } from "react"
import { Search } from "lucide-react"

export default function UpdateMeterReading() {
  // ===== top search fields =====
  const [meterNo, setMeterNo] = useState("691308")
  const [accountNo, setAccountNo] = useState("25124")

  // ===== demo fetched customer info (search করলে তুমি API থেকে সেট করবে) =====
  const [info, setInfo] = useState({
    customerName: "শিপন স্যার ৪৮'",
    accountNo: "25124",
    prevReadingDateText: "27/12/2025",
    typeText: "মিটার গ্রাহক",
    prevReading: 16,
  })

  // ===== form fields =====
  const [currentReading, setCurrentReading] = useState(19)
  const [readingDate, setReadingDate] = useState("2025-12-27")

  // auto diff
  const diff = useMemo(() => {
    const prev = Number(info.prevReading || 0)
    const cur = Number(currentReading || 0)
    return cur - prev
  }, [info.prevReading, currentReading])

  const handleSearch = () => {
    // এখানে API call দিয়ে meterNo/accountNo অনুযায়ী info সেট করবা
    // setInfo(...)
    // demo: কিছুই করলাম না
    console.log("search", { meterNo, accountNo })
  }

  const handleSave = (e) => {
    e.preventDefault()
    const payload = {
      meterNo,
      accountNo,
      prevReading: Number(info.prevReading),
      currentReading: Number(currentReading),
      diff,
      readingDate,
    }
    console.log("save", payload)
    // API POST/PUT এখানে
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1200px] px-4 py-4">
        {/* page title + breadcrumb (optional) */}
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-lg font-bold text-slate-900">আপডেট মিটার রিডিং</h1>
          <div className="text-sm text-slate-500">
            <span className="text-blue-600 hover:underline cursor-pointer">ড্যাশবোর্ড</span>
            <span className="mx-2">/</span>
            <span className="text-blue-600 hover:underline cursor-pointer">মিটাররিডিং-তালিকা</span>
            <span className="mx-2">/</span>
            <span className="text-blue-600">অ্যাড নিউ</span>
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-3">
          {/* top bar search box */}
          <div className="rounded border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 gap-3 p-3 md:grid-cols-12 md:items-center">
              <div className="md:col-span-3">
                <label className="text-sm font-semibold text-slate-700">মিটার নাম্বার</label>
                <input
                  value={meterNo}
                  onChange={(e) => setMeterNo(e.target.value)}
                  className="mt-1 h-9 w-full rounded border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div className="md:col-span-3">
                <label className="text-sm font-semibold text-slate-700">হিসাব নাম্বার</label>
                <input
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  className="mt-1 h-9 w-full rounded border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div className="md:col-span-1 md:pt-6">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="h-9 w-9 rounded border border-slate-200 bg-white hover:bg-slate-50 grid place-items-center"
                  title="Search"
                >
                  <Search className="h-4 w-4 text-slate-700" />
                </button>
              </div>

              <div className="md:col-span-5" />
            </div>
          </div>

          {/* info row */}
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-4 text-sm">
            <div className="text-slate-800">
              <span className="font-semibold">গ্রাহক নাম:</span>{" "}
              <span className="text-slate-900">{info.customerName}</span>
            </div>

            <div className="text-slate-800">
              <span className="font-semibold">হিসাব নাম্বার:</span>{" "}
              <span className="text-slate-900">{info.accountNo}</span>
            </div>

            <div className="text-slate-800">
              <span className="font-semibold">পূর্বেররিডিং তারিখ:</span>{" "}
              <span className="text-slate-900">{info.prevReadingDateText}</span>
            </div>

            <div className="text-slate-800">
              <span className="font-semibold">প্রকার:</span>{" "}
              <span className="text-slate-900">{info.typeText}</span>
            </div>
          </div>

          {/* reading inputs */}
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">পূর্বেররিডিং</label>
              <input
                value={info.prevReading}
                readOnly
                className="mt-1 h-9 w-full rounded border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">
                বর্তমানরিডিং <span className="text-rose-600">*</span>
              </label>
              <input
                value={currentReading}
                onChange={(e) => setCurrentReading(e.target.value)}
                className="mt-1 h-9 w-full rounded border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">রিডিং পার্থক্য</label>
              <input
                value={diff}
                readOnly
                className="mt-1 h-9 w-full rounded border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">রিডিং তারিখ</label>
              <input
                type="date"
                value={readingDate}
                onChange={(e) => setReadingDate(e.target.value)}
                className="mt-1 h-9 w-full rounded border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400"
              />
            </div>

            <div className="md:col-span-4 flex md:justify-end">
              <button
                type="submit"
                className="mt-2 md:mt-0 rounded bg-blue-600 px-6 py-2 text-sm font-bold text-white hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
