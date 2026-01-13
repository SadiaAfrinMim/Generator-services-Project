"use client"

import { useState } from "react"
import {
  Users,
  ShoppingCart,
  Truck,
  Package,
  Zap,
  DollarSign,
  FileText,
  Settings,
  TrendingUp,
  ChevronRight,
  Activity,
  BarChart3,
} from "lucide-react"

const moduleCards = [
  {
    id: "employees",
    icon: Users,
    title: "কর্মচারী",
    subtitle: "কর্মচারী ব্যবস্থাপনা",
    count: "২৪৫",
    trend: "+১২%",
    bgGradient: "from-blue-50 to-sky-100",
    iconColor: "text-sky-600",
    borderColor: "border-sky-200",
  },
  {
    id: "customers",
    icon: ShoppingCart,
    title: "গ্রাহক",
    subtitle: "গ্রাহক তালিকা",
    count: "১,৯০১",
    trend: "+২৩%",
    bgGradient: "from-cyan-50 to-teal-100",
    iconColor: "text-cyan-600",
    borderColor: "border-cyan-200",
  },
  {
    id: "vendors",
    icon: Truck,
    title: "বিক্রেতা",
    subtitle: "সরবরাহকারী ব্যবস্থাপনা",
    count: "৮৫",
    trend: "+৫%",
    bgGradient: "from-blue-50 to-indigo-100",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    id: "products",
    icon: Package,
    title: "পণ্য ও সেবা",
    subtitle: "পণ্য তালিকা",
    count: "৪২৮",
    trend: "+৮%",
    bgGradient: "from-purple-50 to-pink-100",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200",
  },
  {
    id: "meter",
    icon: Zap,
    title: "মিটার রিডিং",
    subtitle: "বিদ্যুৎ পরিমাপ",
    count: "৩,২৪৫",
    trend: "+১৫%",
    bgGradient: "from-amber-50 to-orange-100",
    iconColor: "text-amber-600",
    borderColor: "border-amber-200",
  },
  {
    id: "billing",
    icon: DollarSign,
    title: "বিল সংগ্রহ",
    subtitle: "মাসিক বিল",
    count: "৳ ৪.৮M",
    trend: "+১৮%",
    bgGradient: "from-green-50 to-emerald-100",
    iconColor: "text-green-600",
    borderColor: "border-green-200",
  },
  {
    id: "invoices",
    icon: FileText,
    title: "চালান",
    subtitle: "ইনভয়েস ব্যবস্থাপনা",
    count: "৯২৪",
    trend: "+২১%",
    bgGradient: "from-red-50 to-rose-100",
    iconColor: "text-red-600",
    borderColor: "border-red-200",
  },
  {
    id: "sales",
    icon: BarChart3,
    title: "বিক্রয়",
    subtitle: "বিক্রয় বিশ্লেষণ",
    count: "৳ ২.৩M",
    trend: "+৩২%",
    bgGradient: "from-cyan-50 to-blue-100",
    iconColor: "text-cyan-600",
    borderColor: "border-cyan-200",
  },
  {
    id: "settings",
    icon: Settings,
    title: "সেটিংস",
    subtitle: "সিস্টেম সেটিংস",
    count: "—",
    trend: "সক্রিয়",
    bgGradient: "from-gray-50 to-slate-100",
    iconColor: "text-gray-600",
    borderColor: "border-gray-200",
  },
]

export default function DashboardContent({ onPageChange }) {
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-500 text-white rounded-3xl p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">স্বাগতম, শাহিদ!</h1>
            <p className="text-white/90 text-lg">আপনার ব্যবসায় সকল বিভাগের সম্পূর্ণ সংক্ষিপ্ত পরিচয়</p>
          </div>
          <Activity className="text-white/50" size={80} />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-600">মোট আয়</span>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">৳ ৭.১M</p>
          <p className="text-xs text-green-600 mt-2">+২.৫% এই মাসে</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-600">সক্রিয় ব্যবহারকারী</span>
            <Users className="text-sky-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">২,১৫০</p>
          <p className="text-xs text-blue-600 mt-2">+৩৮৫ নতুন এই মাসে</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-600">অসম্পন্ন কাজ</span>
            <Activity className="text-orange-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">১২৮</p>
          <p className="text-xs text-orange-600 mt-2">-২৫ গত সপ্তাহে</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-600">সিস্টেম স্বাস্থ্য</span>
            <Activity className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">৯৯.৮%</p>
          <p className="text-xs text-green-600 mt-2">সকল সিস্টেম সক্রিয়</p>
        </div>
      </div>

      {/* Module Cards Grid */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">সকল মডিউল</h2>
          <p className="text-gray-600">আপনার ব্যবসায়িক কার্যক্রম পরিচালনার জন্য সকল প্রয়োজনীয় সরঞ্জাম</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moduleCards.map((module) => {
            const Icon = module.icon
            return (
              <div
                key={module.id}
                onClick={() => onPageChange && onPageChange(module.id)}
                onMouseEnter={() => setHoveredCard(module.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`bg-gradient-to-br ${module.bgGradient} rounded-2xl p-7 border-2 ${module.borderColor} cursor-pointer transition-all duration-300 group hover:shadow-2xl hover:scale-105 transform`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{module.title}</h3>
                    <p className="text-sm text-gray-700">{module.subtitle}</p>
                  </div>
                  <div
                    className={`p-3 bg-white rounded-xl ${module.iconColor} shadow-md group-hover:shadow-lg transition-shadow`}
                  >
                    <Icon size={24} />
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{module.count}</p>
                    <p
                      className={`text-sm font-semibold mt-1 ${module.trend.includes("-") ? "text-red-600" : "text-green-600"}`}
                    >
                      {module.trend}
                    </p>
                  </div>
                  {hoveredCard === module.id && (
                    <div className="animate-bounce">
                      <ChevronRight className={`${module.iconColor}`} size={28} />
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-current border-opacity-10">
                  <button
                    className={`w-full py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${module.iconColor} bg-white/40 hover:bg-white/70`}
                  >
                    বিস্তারিত দেখুন →
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">সারাংশ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl border border-sky-200">
            <p className="text-sm text-gray-600 mb-2">এই মাসের লক্ষ্য</p>
            <p className="text-2xl font-bold text-gray-900">৬৮%</p>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-sky-400 to-cyan-500 h-2 rounded-full"
                style={{ width: "68%" }}
              ></div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <p className="text-sm text-gray-600 mb-2">গ্রাহক সন্তুষ্টি</p>
            <p className="text-2xl font-bold text-gray-900">৯২%</p>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <p className="text-sm text-gray-600 mb-2">বৃদ্ধির হার</p>
            <p className="text-2xl font-bold text-gray-900">২৬%</p>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full"
                style={{ width: "26%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
