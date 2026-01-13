import { useMemo, useState } from "react"
import { CalendarDays, Save } from "lucide-react"

const Input = ({ label, required, ...props }) => (
  <div className="space-y-1">
    <label className="text-[12px] font-semibold text-slate-700">
      {label} {required && <span className="text-rose-600">*</span>}
    </label>
    <input
      {...props}
      className={[
        "h-9 w-full rounded-sm border border-slate-300 bg-white px-2 text-sm outline-none",
        "focus:border-blue-500 focus:ring-1 focus:ring-blue-200",
      ].join(" ")}
    />
  </div>
)

const Select = ({ label, required, children, ...props }) => (
  <div className="space-y-1">
    <label className="text-[12px] font-semibold text-slate-700">
      {label} {required && <span className="text-rose-600">*</span>}
    </label>
    <select
      {...props}
      className={[
        "h-9 w-full rounded-sm border border-slate-300 bg-white px-2 text-sm outline-none",
        "focus:border-blue-500 focus:ring-1 focus:ring-blue-200",
      ].join(" ")}
    >
      {children}
    </select>
  </div>
)

const TextArea = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-[12px] font-semibold text-slate-700">{label}</label>
    <textarea
      {...props}
      className={[
        "min-h-[82px] w-full rounded-sm border border-slate-300 bg-white px-2 py-2 text-sm outline-none",
        "focus:border-blue-500 focus:ring-1 focus:ring-blue-200",
      ].join(" ")}
    />
  </div>
)

const DateInput = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="text-[12px] font-semibold text-slate-700">{label}</label>
    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={onChange}
        className={[
          "h-9 w-full rounded-sm border border-slate-300 bg-white pl-2 pr-9 text-sm outline-none",
          "focus:border-blue-500 focus:ring-1 focus:ring-blue-200",
        ].join(" ")}
      />
      <CalendarDays className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
    </div>
  </div>
)

const BlueHeader = ({ title }) => (
  <div className="bg-[#0B75E1] px-3 py-2 text-sm font-bold text-white">{title}</div>
)

export default function CustomerDetailsForm({ initialData, onClose }) {
  const [avatarUrl, setAvatarUrl] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=shahid-generator"
  )

  const [form, setForm] = useState({
    customerName: "",
    customerAcc: "23207",
    type: "",
    businessType: "ব্যক্তিগত",
    powerTariff: "",
    salesCondition: "Bill With Customer",
    upazila: "",
    division: "",
    phone: "",
    email: "",
    meterNo: "",
    perUnitCharge: "",
    installment: "300",
    mobile: "01718 360955",
    officeType: "",
    accountCode: "",
    status: "Active",
    website: "",
    entryDate: "",
    statusDate: "",
    group: "মেয়াদী",
    sort: "0",
    balanceTotal: "1560",
    address: "",
    city: "",
    addrDivision: "",
    postCode: "",
    country: "Bangladesh",
    billingAddress: "",
    billingCity: "",
    billingDivision: "",
    billingPostCode: "",
    billingCountry: "Bangladesh",
  })

  const onField = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const onAvatarPick = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAvatarUrl(url)
  }

  const tariffOptions = useMemo(() => ["Select One", "Residential", "Commercial", "Industrial"], [])
  const groupOptions = useMemo(() => ["মেয়াদী", "মাসিক", "বার্ষিক"], [])
  const statusOptions = useMemo(() => ["Active", "Inactive"], [])

  return (
    <div className="w-full bg-slate-50 p-3 lg:p-5">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-sm border border-slate-300 bg-white">
        {/* top bar */}
        <div className="relative">
          <div className="absolute left-2 top-2 z-10 bg-white px-2 text-sm font-bold text-slate-800">
            গ্রাহকের বিস্তারিত
          </div>
          <div className="h-6 bg-[#0B75E1]" />
        </div>

        <div className="p-3 lg:p-4">
          {/* Top grid (4 columns like screenshot) */}
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 xl:grid-cols-12">
            {/* Column 1 */}
            <div className="xl:col-span-3 space-y-3">
              <Input
                label="গ্রাহক নাম * প্রতিষ্ঠান নামসহ"
                required
                value={form.customerName}
                onChange={onField("customerName")}
                placeholder="নাম (প্রতিষ্ঠান নামসহ) লিখুন"
              />

              <Select label="ব্যবসায়ের ধরন" value={form.businessType} onChange={onField("businessType")}>
                <option>ব্যক্তিগত</option>
                <option>প্রতিষ্ঠান</option>
                <option>দোকান</option>
              </Select>

              <Input label="উপজেলা" value={form.upazila} onChange={onField("upazila")} placeholder="Enter..." />

              <Input label="মিটার নম্বর" value={form.meterNo} onChange={onField("meterNo")} placeholder="985230" />

              <Input label="অফিসের ধরন" value={form.officeType} onChange={onField("officeType")} placeholder="Enter..." />

              <Select label="গ্রুপ" value={form.group} onChange={onField("group")}>
                {groupOptions.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </Select>
            </div>

            {/* Column 2 */}
            <div className="xl:col-span-3 space-y-3">
              <Input label="গ্রাহক হিসাব নম্বর" value={form.customerAcc} onChange={onField("customerAcc")} />

              <Select label="পাওয়ার ট্যারিফ" value={form.powerTariff} onChange={onField("powerTariff")}>
                {tariffOptions.map((t) => (
                  <option key={t} value={t === "Select One" ? "" : t}>
                    {t}
                  </option>
                ))}
              </Select>

              <Input label="বিভাগ" value={form.division} onChange={onField("division")} placeholder="Enter..." />

              <Select label="প্রতি ইউনিট চার্জ *" required value={form.perUnitCharge} onChange={onField("perUnitCharge")}>
                <option value="">রেট - ১০ টাকা এক ইউনিট</option>
                <option value="rate_10">রেট - ১০ টাকা এক ইউনিট</option>
                <option value="rate_85">রেট - ৮৫ টাকা এক ইউনিট</option>
              </Select>

              <DateInput label="এন্ট্রি তারিখ" value={form.entryDate} onChange={onField("entryDate")} />

              <div className="grid grid-cols-2 gap-3">
                <Input label="sort" value={form.sort} onChange={onField("sort")} />
                <Input label="Balance Total" value={form.balanceTotal} onChange={onField("balanceTotal")} />
              </div>
            </div>

            {/* Column 3 */}
            <div className="xl:col-span-3 space-y-3">
              <Select label="প্রকার" value={form.type} onChange={onField("type")}>
                <option value="">বিলিং নাম্বার</option>
                <option>Residential</option>
                <option>Commercial</option>
              </Select>

              <Select label="সমাধান বিলিং" value={form.salesCondition} onChange={onField("salesCondition")}>
                <option>Bill With Customer</option>
                <option>Bill Separately</option>
              </Select>

              <Input label="ফোন" value={form.phone} onChange={onField("phone")} placeholder="Enter..." />

              <Input label="ইনস্টলমেন্ট *" required value={form.installment} onChange={onField("installment")} />

              <Select label="স্ট্যাটাস" value={form.status} onChange={onField("status")}>
                {statusOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>

              <DateInput label="স্ট্যাটাস তারিখ" value={form.statusDate} onChange={onField("statusDate")} />
            </div>

            {/* Column 4 (Avatar + Email/Mobile/Website) */}
            <div className="xl:col-span-3 space-y-3">
              <div className="flex items-start justify-end gap-3">
                <div className="h-16 w-16 overflow-hidden rounded border border-slate-300 bg-slate-100">
                  <img src={avatarUrl} alt="avatar" className="h-full w-full object-cover" />
                </div>
                <div className="pt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onAvatarPick}
                    className="block w-[160px] text-xs text-white file:mr-2 file:rounded file:border-0 file:bg-white/90 file:px-2 file:py-1 file:text-slate-800 hover:file:bg-white"
                  />
                </div>
              </div>

              <Input label="ইমেইল" value={form.email} onChange={onField("email")} placeholder="Enter..." />
              <Input label="মোবাইল" value={form.mobile} onChange={onField("mobile")} />
              <Input label="ওয়েবসাইট" value={form.website} onChange={onField("website")} placeholder="Enter..." />
            </div>
          </div>

          {/* Bottom addresses (2 boxes) */}
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Address */}
            <div className="overflow-hidden rounded-sm border border-slate-300">
              <BlueHeader title="ঠিকানা" />
              <div className="p-3 space-y-3">
                <TextArea label="ঠিকানা" value={form.address} onChange={onField("address")} placeholder="ঠিকানা..." />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="শহর/জেলা" value={form.city} onChange={onField("city")} placeholder="শহর/জেলা" />
                  <Input label="বিভাগ" value={form.addrDivision} onChange={onField("addrDivision")} placeholder="বিভাগ" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="পোস্ট কোড" value={form.postCode} onChange={onField("postCode")} placeholder="পোস্ট কোড" />
                  <Select label="" value={form.country} onChange={onField("country")}>
                    <option>Bangladesh</option>
                    <option>India</option>
                    <option>Nepal</option>
                  </Select>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="overflow-hidden rounded-sm border border-slate-300">
              <BlueHeader title="বিলিং ঠিকানা / এক্সেস ঠিকানা" />
              <div className="p-3 space-y-3">
                <TextArea
                  label="ঠিকানা"
                  value={form.billingAddress}
                  onChange={onField("billingAddress")}
                  placeholder="ঠিকানা..."
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="শহর/জেলা"
                    value={form.billingCity}
                    onChange={onField("billingCity")}
                    placeholder="শহর/জেলা"
                  />
                  <Input
                    label="বিভাগ"
                    value={form.billingDivision}
                    onChange={onField("billingDivision")}
                    placeholder="বিভাগ"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="পোস্ট কোড"
                    value={form.billingPostCode}
                    onChange={onField("billingPostCode")}
                    placeholder="পোস্ট কোড"
                  />
                  <Select label="" value={form.billingCountry} onChange={onField("billingCountry")}>
                    <option>Bangladesh</option>
                    <option>India</option>
                    <option>Nepal</option>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Footer (Save button) */}
          <div className="mt-4 flex items-center justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-sm bg-[#0B75E1] px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition"
              onClick={() => console.log("SAVE", form)}
            >
              <Save className="h-4 w-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
