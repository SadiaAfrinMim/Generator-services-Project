// ✅ ../inputField/Modal.jsx
// Standard size modal (sm/md/lg) + fixed padding + scrollable body
import { X } from "lucide-react"

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "md", // "sm" | "md" | "lg" | "xl"
}) {
  if (!open) return null

  const sizeCls =
    size === "sm"
      ? "max-w-md"
      : size === "lg"
      ? "max-w-6xl"
      : size === "xl"
      ? "max-w-5xl"
      : "max-w-2xl" // md default

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label="Close"
      />

      {/* Modal Card */}
      <div
        className={[
          "relative w-full",
          sizeCls,
          "rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-200">
          <div className="min-w-0">
            <h2 className="truncate text-base sm:text-lg font-extrabold text-slate-900">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        {/* Body (standard padding + scroll) */}
        <div className="max-h-[75vh] overflow-y-auto px-5 py-4">
          {children}
        </div>
      </div>
    </div>
  )
}
