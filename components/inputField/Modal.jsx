import { useEffect } from "react"
import { X } from "lucide-react"

export default function Modal({ open, onClose, title, children, size = "max-w-6xl" }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[999]">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* modal box */}
      <div className="absolute inset-0 p-3 sm:p-6 flex items-start justify-center overflow-auto">
        <div className={`w-full ${size} rounded-lg bg-white shadow-2xl`}>
          {/* header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="font-bold text-slate-800">{title || "Edit"}</div>
            <button
              onClick={onClose}
              className="h-9 w-9 rounded-md hover:bg-slate-100 grid place-items-center"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-slate-700" />
            </button>
          </div>

          {/* body */}
          <div className="p-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
