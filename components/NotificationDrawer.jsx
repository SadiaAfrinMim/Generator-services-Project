// components/NotificationDrawer.jsx
import { Bell, X, CheckCircle, AlertCircle, Info, Calendar, MessageSquare, User, Zap } from "lucide-react"
import { useState } from "react"

export default function NotificationDrawer({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "নতুন বিল তৈরি হয়েছে",
      message: "জনাব করিমের জন্য নতুন মাসিক বিল তৈরি হয়েছে",
      time: "৫ মিনিট আগে",
      type: "success",
      unread: true,
      icon: CheckCircle
    },
    {
      id: 2,
      title: "অভিযোগ প্রাপ্তি",
      message: "মোহাম্মদপুর থেকে নতুন বিদ্যুৎ সমস্যার অভিযোগ এসেছে",
      time: "৩০ মিনিট আগে",
      type: "warning",
      unread: true,
      icon: AlertCircle
    },
    {
      id: 3,
      title: "মিটার রিডিং রিমাইন্ডার",
      message: "সাইট ৫ এর মিটার রিডিং নেওয়ার সময় আজ",
      time: "২ ঘন্টা আগে",
      type: "info",
      unread: false,
      icon: Calendar
    },
    {
      id: 4,
      title: "নতুন গ্রাহক নিবন্ধন",
      message: "জনাব রহিম নতুন গ্রাহক হিসাবে নিবন্ধিত হয়েছেন",
      time: "আজ সকাল ১০:৩০",
      type: "success",
      unread: false,
      icon: User
    },
    {
      id: 5,
      title: "সিস্টেম আপডেট",
      message: "নতুন সফ্টওয়্যার আপডেট উপলব্ধ",
      time: "গতকাল",
      type: "info",
      unread: false,
      icon: Zap
    },
    {
      id: 6,
      title: "এসএমএস পাঠানো হয়েছে",
      message: "১৫ জন গ্রাহককে বিলের রিমাইন্ডার এসএমএস পাঠানো হয়েছে",
      time: "গতকাল",
      type: "info",
      unread: false,
      icon: MessageSquare
    }
  ])

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, unread: false } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, unread: false }))
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getTypeColor = (type) => {
    switch(type) {
      case 'success': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'warning': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'info': return 'bg-blue-100 text-blue-700 border-blue-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getTypeIconColor = (type) => {
    switch(type) {
      case 'success': return 'text-emerald-500'
      case 'warning': return 'text-amber-500'
      case 'info': return 'text-blue-500'
      default: return 'text-gray-500'
    }
  }

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-50 to-white border-b border-blue-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="text-blue-600" size={24} />
                {unreadCount > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">নোটিফিকেশন</h2>
                <p className="text-sm text-gray-600">আপনার সকল বিজ্ঞপ্তি</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110"
              aria-label="বন্ধ করুন"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={markAllAsRead}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CheckCircle size={18} />
              <span className="text-sm font-medium">সব পড়া হয়েছে</span>
            </button>
            
            <button
              onClick={clearAll}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-200 transition-all duration-300"
            >
              <X size={18} />
              <span className="text-sm font-medium">সব মুছুন</span>
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="h-[calc(100vh-180px)] overflow-y-auto p-6">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 flex items-center justify-center mb-4">
                <Bell size={32} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">কোনো নোটিফিকেশন নেই</h3>
              <p className="text-gray-600 max-w-xs">নতুন নোটিফিকেশন পেলে এখানে দেখানো হবে</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => {
                const Icon = notification.icon
                return (
                  <div
                    key={notification.id}
                    className={`group relative p-4 rounded-2xl border transition-all duration-300 hover:shadow-lg cursor-pointer ${
                      notification.unread 
                        ? 'bg-gradient-to-r from-blue-50/50 to-white border-blue-200' 
                        : 'bg-white border-gray-200'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    {/* Unread Indicator */}
                    {notification.unread && (
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}

                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${getTypeColor(notification.type)}`}>
                        <Icon size={20} className={getTypeIconColor(notification.type)} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        
                        {/* Type Badge */}
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(notification.type)}`}>
                          {notification.type === 'success' && 'সফলতা'}
                          {notification.type === 'warning' && 'সতর্কতা'}
                          {notification.type === 'info' && 'তথ্য'}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          markAsRead(notification.id)
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition"
                        title="পড়া হয়েছে"
                      >
                        <CheckCircle size={16} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{notifications.length}</span> টি নোটিফিকেশন
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-blue-600">{unreadCount}</span> টি পড়া হয়নি
            </div>
          </div>
          
          <div className="mt-3 flex items-center justify-center">
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Info size={12} />
              নোটিফিকেশন ৩০ দিন পর্যন্ত সংরক্ষিত থাকে
            </div>
          </div>
        </div>
      </div>
    </>
  )
}