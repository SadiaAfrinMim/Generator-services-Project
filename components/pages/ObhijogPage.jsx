import React, { useMemo, useState } from "react"

export default function ObhijogPage() {
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selected, setSelected] = useState(null)

  // Demo data (তুমি চাইলে API/DB থেকে replace করবে)
  const [rows, setRows] = useState([
    {
      id: 1,
      bisoy: "পানি চাপ কম",
      details: "বাসা নম্বর ১২/বি তে গত ৩ দিন ধরে পানির চাপ কম।",
      status: "Pending",
      received: true,
      access: "Granted",
      workOnSolution: false,
      solved: false,
      createdAt: "2026-01-15",
    },
    {
      id: 2,
      bisoy: "মিটার রিডিং ভুল",
      details: "এই মাসে রিডিং বেশি দেখাচ্ছে, পুনরায় যাচাই দরকার।",
      status: "Working",
      received: true,
      access: "Granted",
      workOnSolution: true,
      solved: false,
      createdAt: "2026-01-14",
    },
    {
      id: 3,
      bisoy: "বিল অতিরিক্ত এসেছে",
      details: "গত মাসের তুলনায় দ্বিগুণ বিল এসেছে—ডিটেইলস চেক করুন।",
      status: "Solved",
      received: true,
      access: "Limited",
      workOnSolution: true,
      solved: true,
      createdAt: "2026-01-10",
    },
    {
      id: 4,
      bisoy: "লাইন লিকেজ",
      details: "গেইটের সামনে পাইপে লিকেজ, পানি নষ্ট হচ্ছে।",
      status: "Pending",
      received: false,
      access: "Denied",
      workOnSolution: false,
      solved: false,
      createdAt: "2026-01-09",
    },
  ])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    // আগে status filter, পরে search filter
    const statusFiltered = rows.filter((r) => {
      if (statusFilter === "All") return true
      return r.status === statusFilter
    })

    // search: serial (filtered order), id, bisoy, details
    return statusFiltered.filter((r, idx) => {
      if (!q) return true
      const serial = String(idx + 1)
      return (
        serial.includes(q) ||
        String(r.id).includes(q) ||
        r.bisoy.toLowerCase().includes(q) ||
        r.details.toLowerCase().includes(q)
      )
    })
  }, [rows, query, statusFilter])

  const statusBadge = (status) => {
    const base =
      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1"
    if (status === "Pending")
      return (
        <span className={`${base} bg-amber-50 text-amber-700 ring-amber-200`}>
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Pending
        </span>
      )
    if (status === "Working")
      return (
        <span className={`${base} bg-sky-50 text-sky-700 ring-sky-200`}>
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
          Working
        </span>
      )
    return (
      <span className={`${base} bg-emerald-50 text-emerald-700 ring-emerald-200`}>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Solved
      </span>
    )
  }

  const chip = (ok, yesText = "Yes", noText = "No") => {
    const base =
      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1"
    return ok ? (
      <span className={`${base} bg-emerald-50 text-emerald-700 ring-emerald-200`}>
        {yesText}
      </span>
    ) : (
      <span className={`${base} bg-rose-50 text-rose-700 ring-rose-200`}>
        {noText}
      </span>
    )
  }

  const accessChip = (val) => {
    const base =
      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1"
    if (val === "Granted")
      return (
        <span className={`${base} bg-indigo-50 text-indigo-700 ring-indigo-200`}>
          Granted
        </span>
      )
    if (val === "Limited")
      return (
        <span className={`${base} bg-violet-50 text-violet-700 ring-violet-200`}>
          Limited
        </span>
      )
    return (
      <span className={`${base} bg-zinc-100 text-zinc-700 ring-zinc-200`}>
        Denied
      </span>
    )
  }

  const updateRow = (id, patch) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  const markReceived = (r) => {
    updateRow(r.id, { received: !r.received })
    if (selected?.id === r.id) {
      setSelected((p) => ({ ...p, received: !p.received }))
    }
  }

  const toggleWork = (r) => {
    const next = !r.workOnSolution
    const nextStatus = r.solved ? "Solved" : next ? "Working" : "Pending"

    updateRow(r.id, {
      workOnSolution: next,
      status: nextStatus,
    })

    if (selected?.id === r.id) {
      setSelected((p) => ({ ...p, workOnSolution: next, status: nextStatus }))
    }
  }

  const markSolved = (r) => {
    const next = !r.solved
    const nextStatus = next ? "Solved" : r.workOnSolution ? "Working" : "Pending"
    const nextWork = next ? true : r.workOnSolution

    updateRow(r.id, {
      solved: next,
      status: nextStatus,
      workOnSolution: nextWork,
    })

    if (selected?.id === r.id) {
      setSelected((p) => ({
        ...p,
        solved: next,
        status: nextStatus,
        workOnSolution: nextWork,
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-white/80 p-5 shadow-[0_10px_40px_rgba(2,6,23,0.08)] ring-1 ring-slate-200 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">
                অভিযোগ ব্যবস্থাপনা
              </h1>
             
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search: serial / id / বিষয় / বিস্তারিত..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-800 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-200 sm:w-80"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  🔎
                </span>
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-200"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Working">Working</option>
                <option value="Solved">Solved</option>
              </select>

              <div className="rounded-2xl  px-4 py-2.5 text-sm font-semibold text-blue-500 shadow-sm">
                Total: {filtered.length}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_rgba(2,6,23,0.08)] ring-1 ring-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                  <th className="px-5 py-4">Serial</th>
                  <th className="px-5 py-4">বিষয়</th>
                  <th className="px-5 py-4">বিস্তারিত অভিযোগ</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Received</th>
                  <th className="px-5 py-4">Access</th>
                  <th className="px-5 py-4">Work on solution</th>
                  <th className="px-5 py-4">Solved</th>
                  <th className="px-5 py-4 text-right">View</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-10 text-center text-sm text-slate-500"
                    >
                      No complaints found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r, index) => (
                    <tr
                      key={r.id}
                      className="border-t border-slate-100 transition hover:bg-slate-50/70"
                    >
                      {/* ✅ Serial Number: index + 1 */}
                      <td className="px-5 py-4">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl text-xs font-extrabold text-black">
                          {index + 1}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">{r.bisoy}</div>
                        <div className="mt-0.5 text-xs text-slate-500">
                          Date: {r.createdAt} • ID: {r.id}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="max-w-[440px] text-sm text-slate-700">
                          {r.details.length > 80
                            ? r.details.slice(0, 80) + "..."
                            : r.details}
                        </div>
                      </td>

                      <td className="px-5 py-4">{statusBadge(r.status)}</td>

                      <td className="px-5 py-4">
                        <button
                          onClick={() => markReceived(r)}
                          className="group inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                          title="Toggle Received"
                        >
                          {chip(r.received, "Received", "Not Yet")}
                          <span className="text-slate-400 group-hover:text-slate-600">
                            ↻
                          </span>
                        </button>
                      </td>

                      <td className="px-5 py-4">{accessChip(r.access)}</td>

                      <td className="px-5 py-4">
                        <button
                          onClick={() => toggleWork(r)}
                          className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold shadow-sm transition ring-1 ${
                            r.workOnSolution
                              ? "bg-sky-50 text-sky-700 ring-sky-200 hover:bg-sky-100"
                              : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
                          }`}
                          title="Toggle Work on solution"
                        >
                          {r.workOnSolution ? "Working ✅" : "Start Work"}
                        </button>
                      </td>

                      <td className="px-5 py-4">
                        <button
                          onClick={() => markSolved(r)}
                          className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold shadow-sm transition ring-1 ${
                            r.solved
                              ? "bg-emerald-50 text-emerald-700 ring-emerald-200 hover:bg-emerald-100"
                              : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
                          }`}
                          title="Toggle Solved"
                        >
                          {r.solved ? "Solved ✅" : "Mark Solved"}
                        </button>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() =>
                            setSelected({ ...r, __serial: index + 1 })
                          }
                          className="inline-flex items-center gap-2 rounded-2xl  px-3 py-2 text-xs font-semibold text-blue-500 shadow-sm transition hover:opacity-90"
                          title="View details"
                        >
                          👁 View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="flex flex-col gap-2 border-t border-slate-100 bg-white px-5 py-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
            <span>
              Tip: “Work on solution” চালু করলে status “Working” হবে, “Solved”
              করলে status “Solved” হবে।
            </span>
           
          </div>
        </div>
      </div>

      {/* View Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white shadow-[0_20px_70px_rgba(2,6,23,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
              <div>
                <div className="flex items-center gap-3">
                  {/* ✅ Serial shown */}
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-red-900 text-sm font-extrabold text-black">
                    {selected.__serial ?? selected.id}
                  </span>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      {selected.bisoy}
                    </h2>
                    <div className="mt-0.5 text-xs text-slate-500">
                      ID: {selected.id} • Date: {selected.createdAt}
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {statusBadge(selected.status)}
                  {chip(selected.received, "Received", "Not Yet")}
                  {accessChip(selected.access)}
                </div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                title="Close"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  বিস্তারিত অভিযোগ
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {selected.details}
                </p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="text-xs font-bold text-slate-500">
                    Work on solution
                  </div>
                  <div className="mt-2">
                    {chip(selected.workOnSolution, "Yes", "No")}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="text-xs font-bold text-slate-500">Solved</div>
                  <div className="mt-2">{chip(selected.solved, "Yes", "No")}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
              <button
                onClick={() => toggleWork(selected)}
                className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:opacity-90"
              >
                Toggle Work
              </button>

              <button
                onClick={() => markSolved(selected)}
                className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:opacity-90"
              >
                Toggle Solved
              </button>

              <button
                onClick={() => setSelected(null)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
