// components/Topbar.jsx
import { Menu, LogOut, Bell, Search, X, ChevronRight, Sun, Moon, Key, ChevronLeft } from "lucide-react"
import { useState } from "react"
import NotificationDrawer from "./NotificationDrawer"

export default function Topbar({ onLogout, onSidebarToggle, sidebarCollapsed, sidebarOpen }) {
  const [darkMode, setDarkMode] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <>
      <header className="bg-gradient-to-r from-white to-blue-50 border-b border-blue-100 shadow-lg shadow-blue-50/50">
        <div className="px-6 py-3.5 flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle Button */}
            <button
              onClick={onSidebarToggle}
              className="relative group p-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              aria-label={sidebarOpen ? "সাইডবার বন্ধ করুন" : "সাইডবার খুলুন"}
              title={sidebarOpen ? "সাইডবার বন্ধ করুন" : "সাইডবার খুলুন"}
            >
              {sidebarOpen ? (
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Menu size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              )}
              
              {/* Pulse Animation */}
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white/80 animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white border-2 border-blue-500"></div>
            </button>

           
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search Bar - Desktop */}
            <div className={`hidden lg:flex items-center bg-gradient-to-r from-blue-50 to-white rounded-xl px-4 py-2.5 gap-3 w-80 border border-blue-100 shadow-inner transition-all duration-300 ${showSearch ? 'scale-105 shadow-lg' : ''}`}>
              <Search size={18} className="text-blue-500" />
              <input
                type="text"
                placeholder="সার্চ করুন (গ্রাহক, বিল, রিপোর্ট...)"
                className="bg-transparent outline-none text-blue-900 w-full text-sm placeholder-blue-400/60"
                onFocus={() => setShowSearch(true)}
                onBlur={() => setShowSearch(false)}
              />
              <div className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-lg font-medium">
                Ctrl+K
              </div>
            </div>

            {/* Search Button - Mobile */}
            <button 
              className="lg:hidden p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-300"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search size={20} />
            </button>

            {/* Mobile Search Overlay */}
            {showSearch && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden animate-in fade-in duration-300">
                <div className="bg-white p-4 rounded-b-2xl shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 flex items-center bg-blue-50 rounded-xl px-4 py-3 gap-3">
                      <Search size={20} className="text-blue-500" />
                      <input
                        type="text"
                        placeholder="সার্চ করুন..."
                        className="bg-transparent outline-none text-blue-900 w-full text-base"
                        autoFocus
                      />
                    </div>
                    <button 
                      onClick={() => setShowSearch(false)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className="text-sm text-gray-500 px-2">
                    টিপ: গ্রাহক নাম, মিটার নং বা বিল নং লিখুন
                  </div>
                </div>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 hover:to-white transition-all duration-300 border border-blue-100 group"
              title={darkMode ? "লাইট মোড চালু করুন" : "ডার্ক মোড চালু করুন"}
            >
              {darkMode ? (
                <Sun size={18} className="text-amber-500 group-hover:rotate-180 transition-transform duration-700" />
              ) : (
                <Moon size={18} className="text-blue-600 group-hover:rotate-180 transition-transform duration-700" />
              )}
              <span className="text-sm font-medium text-blue-700 hidden md:inline">
                {darkMode ? "লাইট" : "ডার্ক"}
              </span>
            </button>

            {/* Notifications Button */}
            <div className="relative group">
              <button 
                className="relative p-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 hover:to-white transition-all duration-300 border border-blue-100"
                onClick={() => setShowNotifications(true)}
              >
                <Bell size={20} className="text-blue-600 group-hover:animate-shake" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping opacity-75"></span>
              </button>
              
              {/* Notification Badge */}
              <div className="absolute -top-2 -right-2 z-10">
                <div className="px-1.5 py-0.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow">
                  3
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-4 pl-4 border-l border-blue-200">
              <div className="hidden lg:block text-right">
                <p className="text-sm font-bold text-blue-900">শাহিদ হোসেন</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <p className="text-xs text-blue-600/70">প্রশাসক</p>
                </div>
              </div>
              
              {/* Profile Avatar */}
              <div className="relative group">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1690037901153-7fd75205941a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </div>
                
                {/* Online Status */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              title="লগ আউট"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">লগ আউট</span>
            </button>

            {/* Mobile Logout Icon */}
            <button
              onClick={onLogout}
              className="md:hidden p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300"
              title="লগ আউট"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="hidden lg:flex items-center justify-between px-6 py-2.5 bg-gradient-to-r from-blue-600/5 to-cyan-600/5 border-t border-blue-100">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-sm text-blue-700 font-medium">সিস্টেম সক্রিয়</span>
            </div>
            <div className="text-sm text-blue-600">
              <span className="font-semibold">১৫৪</span> সক্রিয় গ্রাহক
            </div>
            <div className="text-sm text-blue-600">
              <span className="font-semibold">৳১,২৫,৪৫০</span> আজকের বিক্রয়
            </div>
            <div className="text-sm text-blue-600">
              <span className="font-semibold">৫</span> নতুন অভিযোগ
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <ChevronRight size={16} className="text-blue-400" />
            <span>আপডেট: আজ ০৩:৩০ PM</span>
          </div>
        </div>
      </header>

      {/* Notification Drawer */}
      <NotificationDrawer 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </>
  )
}