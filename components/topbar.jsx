

import { Menu, LogOut, Bell, Search } from "lucide-react"

export default function Topbar({ onLogout, onSidebarToggle }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
        
          <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
            Shahid Generator
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 gap-2 w-64">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="অনুসন্ধান করুন..."
              className="bg-transparent outline-none text-gray-700 w-full text-sm"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-900">শাহিদ</p>
              <p className="text-xs text-gray-500">প্রশাসক</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition">
              ش
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="লগ আউট"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline text-sm font-medium">লগ আউট</span>
          </button>
        </div>
      </div>
    </header>
  )
}
