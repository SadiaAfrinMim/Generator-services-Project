import React, { useState } from 'react'
import { 
  MapPin, 
  Users, 
  Building, 
  Home, 
  Search, 
  Filter, 
  Plus,
  BarChart3,
  Download,
  Eye
} from 'lucide-react'

export default function AreaPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArea, setSelectedArea] = useState(null)

  // Demo data - এলাকার তথ্য
  const areas = [
    { id: 1, name: "মোহাম্মদপুর", households: 1250, population: 5625, connections: 980, active: 920, pending: 60, revenue: 2850000 },
    { id: 2, name: "ধানমন্ডি", households: 1850, population: 8325, connections: 1750, active: 1680, pending: 70, revenue: 4520000 },
    { id: 3, name: "গুলশান", households: 950, population: 4275, connections: 920, active: 890, pending: 30, revenue: 3150000 },
    { id: 4, name: "বনানী", households: 720, population: 3240, connections: 700, active: 680, pending: 20, revenue: 2450000 },
    { id: 5, name: "উত্তরা", households: 2100, population: 9450, connections: 1950, active: 1850, pending: 100, revenue: 5200000 },
    { id: 6, name: "মিরপুর", households: 2800, population: 12600, connections: 2500, active: 2350, pending: 150, revenue: 6850000 },
  ]

  const filteredAreas = areas.filter(area =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const statsCards = [
    { label: "মোট এলাকা", value: "৬টি", icon: <MapPin className="w-5 h-5" />, color: "bg-blue-500" },
    { label: "মোট পরিবার", value: "৯,৬৭০", icon: <Home className="w-5 h-5" />, color: "bg-emerald-500" },
    { label: "মোট জনসংখ্যা", value: "৪৩,৫১৫", icon: <Users className="w-5 h-5" />, color: "bg-purple-500" },
    { label: "মোট সংযোগ", value: "৮,৮০০", icon: <Building className="w-5 h-5" />, color: "bg-amber-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              এলাকা ব্যবস্থাপনা
            </h1>
            <p className="text-gray-600">
              সার্ভিস এরিয়া, গ্রাহক সংখ্যা, রাজস্ব এবং সংযোগ তথ্য
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:opacity-90 transition">
              <Plus className="w-4 h-4" />
              নতুন এলাকা যোগ করুন
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition">
              <Download className="w-4 h-4" />
              রিপোর্ট
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Area List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="এলাকা খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition">
                    <Filter className="w-4 h-4" />
                    ফিল্টার
                  </button>
                </div>
              </div>
            </div>

            {/* Area Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="text-left text-sm font-semibold text-gray-600">
                    <th className="px-5 py-4">এলাকা নাম</th>
                    <th className="px-5 py-4">পরিবার</th>
                    <th className="px-5 py-4">সংযোগ</th>
                    <th className="px-5 py-4">সক্রিয়</th>
                    <th className="px-5 py-4">রাজস্ব</th>
                    <th className="px-5 py-4 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAreas.map((area) => (
                    <tr 
                      key={area.id} 
                      className="hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => setSelectedArea(area)}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{area.name}</h3>
                            <p className="text-sm text-gray-500">{area.population.toLocaleString()} জন</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-lg font-bold text-gray-900">{area.households.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">পরিবার</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-lg font-bold text-gray-900">{area.connections.toLocaleString()}</div>
                        <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
                          {((area.connections / area.households) * 100).toFixed(1)}%
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-lg font-bold text-emerald-600">{area.active.toLocaleString()}</div>
                        <div className="text-sm text-amber-600">
                          {area.pending} বাকি
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-lg font-bold text-gray-900">
                          ৳{(area.revenue / 100000).toFixed(1)} লাখ
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition">
                          <Eye className="w-4 h-4" />
                          বিস্তারিত
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Area Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">এলাকা বিবরণ</h2>
            
            {selectedArea ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedArea.name}</h3>
                  <p className="text-gray-600 mt-1">সার্ভিস এরিয়া</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-gray-900">{selectedArea.households.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">পরিবার</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-gray-900">{selectedArea.population.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">জনসংখ্যা</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-gray-900">{selectedArea.connections.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">সংযোগ</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-emerald-600">{selectedArea.active.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">সক্রিয়</div>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">সংযোগ হার</span>
                      <span className="font-semibold text-blue-600">
                        {((selectedArea.connections / selectedArea.households) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        style={{ width: `${(selectedArea.connections / selectedArea.households) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">সক্রিয় হার</span>
                      <span className="font-semibold text-emerald-600">
                        {((selectedArea.active / selectedArea.connections) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                        style={{ width: `${(selectedArea.active / selectedArea.connections) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Revenue */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">মাসিক রাজস্ব</div>
                  <div className="text-3xl font-bold text-gray-900">
                    ৳{selectedArea.revenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    গড়: ৳{(selectedArea.revenue / selectedArea.connections).toLocaleString()} প্রতি সংযোগ
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:opacity-90 transition">
                    সম্পাদনা
                  </button>
                  <button className="py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition">
                    রিপোর্ট
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">এলাকা নির্বাচন করুন</h3>
                <p className="text-gray-500">
                  বিস্তারিত দেখতে বাম পাশ থেকে একটি এলাকা নির্বাচন করুন
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}