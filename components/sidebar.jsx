import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Truck,
  Settings,
  ChevronRight,
  X,
  Package,
  Gauge,
  TrendingUp,
  Folder,
  MessageSquare,
  MapPin,
  AlertCircle,
} from "lucide-react"

export default function Sidebar({ activePage, onPageChange, isOpen, onOpenChange }) {
  const [openMenu, setOpenMenu] = useState({
    site: false,
    sales: false,
  })

  // ✅ activePage অনুযায়ী submenu auto-open
  useEffect(() => {
    setOpenMenu((prev) => ({
      site: ["meterReadingSite", "billCollectionSite"].includes(activePage) ? true : prev.site,
      sales: ["chalan", "chalanPrint"].includes(activePage) ? true : prev.sales,
    }))
  }, [activePage])

  // ✅ mobile এ click করলে sidebar close
  const closeOnMobile = () => {
    if (window.matchMedia("(max-width: 1024px)").matches) onOpenChange(false)
  }

  const navigate = (id) => {
    onPageChange(id)
    closeOnMobile()
  }

  // ✅ Profile (Shahid Hossain)
  const profileName = "Shahid Hossain"
  const profileRole = "Owner"
  const profileImg = "https://api.dicebear.com/7.x/avataaars/svg?seed=shahid-hossain"

  const menuItems = [
    { id: "dashboard", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
    { id: "employees", label: "কর্মচারী", icon: Users },
    { id: "customers", label: "গ্রাহক", icon: ShoppingCart },
    { id: "vendors", label: "বিক্রেতা", icon: Truck },

    // ✅ ADDED
    { id: "area", label: "এরিয়া", icon: MapPin },
    { id: "obhijog", label: "অভিযোগ", icon: AlertCircle },

    { id: "products", label: "পণ্য ও সেবা", icon: Package },
    { id: "meter", label: "মিটার রিডিং", icon: Gauge },
    { id: "sms", label: "এসএমএস", icon: MessageSquare },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40 animate-in fade-in duration-300"
          onClick={() => onOpenChange(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static w-68 h-screen bg-gradient-to-b from-sky-700 via-cyan-600 to-teal-700 text-white shadow-2xl transition-all duration-400 z-50 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent ${
          isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top glow effect */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-60"></div>

        <div className="p-5">
          {/* Close Button Mobile */}
          <button
            onClick={() => onOpenChange(false)}
            className="lg:hidden absolute top-4 right-4 text-white/90 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-300 hover:scale-110"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>

          {/* ✅ Brand Logo Section */}
          <div className="flex py-4 gap-4">
            {/* Brand Logo */}
            <div className="w-12 h-12 bg-gradient-to-br from-white/25 to-cyan-400/30 rounded-xl flex items-center justify-center border border-white/25 shadow-lg">
              <span className="text-xl font-extrabold tracking-wide bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                SG
              </span>
            </div>

            {/* Brand Text */}
            <div className="min-w-0 flex-1">
              <h2 className="font-extrabold text-lg leading-tight truncate bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                Shahid Generator
              </h2>
              <p className="text-xs text-white/80 truncate">ম্যানেজমেন্ট ড্যাশবোর্ড</p>
            </div>
          </div>

          {/* ✅ Profile Section */}
          <div className="mb-7 rounded-2xl border border-white/20 bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-sm p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
  <div className="flex items-center gap-3">
    <div className="relative group">
      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-white/30 shadow-lg">
        <img 
          src={profileImg} 
          alt={profileName} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      
      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-teal-700 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-ping"></div>
    </div>

    <div className="min-w-0 flex-1">
      <h3 className="font-bold text-sm leading-tight truncate animate-pulse animate-once animate-duration-1000">
        {profileName}
      </h3>
      <p className="text-xs text-white/70 truncate">
        {profileRole}
      </p>
    </div>
  </div>
</div>

          {/* Menu */}
          <nav className="space-y-2">
            {/* ✅ normal items */}
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activePage === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`group w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-sm border-l-4 border-cyan-300 shadow-lg shadow-cyan-500/20"
                      : "hover:bg-white/12 hover:border-l-4 hover:border-white/30 hover:shadow-md"
                  }`}
                >
                  {/* Active glow effect */}
                  {isActive && <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>}

                  <div
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      isActive ? "bg-white/30" : "bg-white/10 group-hover:bg-white/20"
                    }`}
                  >
                    <Icon size={20} className={`${isActive ? "text-white" : "text-white/80 group-hover:text-white"}`} />
                  </div>

                  <span className="font-medium flex-1 text-left relative z-10">{item.label}</span>

                  <ChevronRight
                    size={18}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "opacity-100 translate-x-0 scale-110 text-cyan-300"
                        : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-white/60"
                    }`}
                  />
                </button>
              )
            })}

            {/* =================== ✅ সাইট (submenu) =================== */}
            <div className="rounded-xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setOpenMenu((p) => ({ ...p, site: !p.site }))}
                className={`w-full flex items-center gap-3 px-4 py-3.5 transition-all duration-300 group ${
                  openMenu.site ? "bg-gradient-to-r from-white/18 to-white/10" : "hover:bg-white/12 text-white/90"
                }`}
              >
                <div
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    openMenu.site ? "bg-white/25" : "bg-white/10 group-hover:bg-white/20"
                  }`}
                >
                  <Folder size={20} className={openMenu.site ? "text-white" : "text-white/80"} />
                </div>

                <span className="font-medium flex-1 text-left">সাইট</span>

                <ChevronRight
                  className={`transition-all duration-500 ${
                    openMenu.site ? "rotate-90 scale-110 text-cyan-300" : "text-white/60 group-hover:text-white"
                  }`}
                  size={18}
                />
              </button>

              <div
                className={`transition-all duration-500 overflow-hidden ${
                  openMenu.site ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-3 pb-3">
                  <div className="mt-2 space-y-1 pl-5 border-l border-white/20">
                    <button
                      type="button"
                      onClick={() => navigate("meterReadingSite")}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                        activePage === "meterReadingSite"
                          ? "bg-gradient-to-r from-white/22 to-white/15 backdrop-blur-sm"
                          : "hover:bg-white/12 text-white/90"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activePage === "meterReadingSite" ? "bg-cyan-300 scale-125" : "bg-white/50"
                        }`}
                      ></div>
                      <span className="text-sm">মিটার রিডিং: সাইট</span>
                      {activePage === "meterReadingSite" && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse"></div>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("billCollectionSite")}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                        activePage === "billCollectionSite"
                          ? "bg-gradient-to-r from-white/22 to-white/15 backdrop-blur-sm"
                          : "hover:bg-white/12 text-white/90"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activePage === "billCollectionSite" ? "bg-cyan-300 scale-125" : "bg-white/50"
                        }`}
                      ></div>
                      <span className="text-sm">বিল কালেকশন: সাইট</span>
                      {activePage === "billCollectionSite" && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse"></div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* =================== ✅ বিক্রয় (submenu) =================== */}
            <div className="rounded-xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setOpenMenu((p) => ({ ...p, sales: !p.sales }))}
                className={`w-full flex items-center gap-3 px-4 py-3.5 transition-all duration-300 group ${
                  openMenu.sales ? "bg-gradient-to-r from-white/18 to-white/10" : "hover:bg-white/12 text-white/90"
                }`}
              >
                <div
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    openMenu.sales ? "bg-white/25" : "bg-white/10 group-hover:bg-white/20"
                  }`}
                >
                  <TrendingUp size={20} className={openMenu.sales ? "text-white" : "text-white/80"} />
                </div>

                <span className="font-medium flex-1 text-left">বিক্রয়</span>

                <ChevronRight
                  className={`transition-all duration-500 ${
                    openMenu.sales ? "rotate-90 scale-110 text-emerald-300" : "text-white/60 group-hover:text-white"
                  }`}
                  size={18}
                />
              </button>

              <div
                className={`transition-all duration-500 overflow-hidden ${
                  openMenu.sales ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-3 pb-3">
                  <div className="mt-2 space-y-1 pl-5 border-l border-white/20">
                    <button
                      type="button"
                      onClick={() => navigate("chalan")}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                        activePage === "chalan"
                          ? "bg-gradient-to-r from-white/22 to-white/15 backdrop-blur-sm"
                          : "hover:bg-white/12 text-white/90"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activePage === "chalan" ? "bg-emerald-300 scale-125" : "bg-white/50"
                        }`}
                      ></div>
                      <span className="text-sm">চালান</span>
                      {activePage === "chalan" && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></div>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("chalanPrint")}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                        activePage === "chalanPrint"
                          ? "bg-gradient-to-r from-white/22 to-white/15 backdrop-blur-sm"
                          : "hover:bg-white/12 text-white/90"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activePage === "chalanPrint" ? "bg-emerald-300 scale-125" : "bg-white/50"
                        }`}
                      ></div>
                      <span className="text-sm">চালান প্রিন্ট</span>
                      {activePage === "chalanPrint" && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Settings (normal item) */}
            <button
              onClick={() => navigate("settings")}
              className={`group w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                activePage === "settings"
                  ? "bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-sm border-l-4 border-amber-300 shadow-lg shadow-amber-500/20"
                  : "hover:bg-white/12 hover:border-l-4 hover:border-amber-300/50 hover:shadow-md"
              }`}
            >
              {activePage === "settings" && <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>}

              <div
                className={`p-2 rounded-lg transition-all duration-300 ${
                  activePage === "settings" ? "bg-white/30" : "bg-white/10 group-hover:bg-white/20"
                }`}
              >
                <Settings size={20} className={`${activePage === "settings" ? "text-white" : "text-white/80 group-hover:text-white"}`} />
              </div>

              <span className="font-medium flex-1 text-left relative z-10">সেটিংস</span>

              <ChevronRight
                size={18}
                className={`transition-all duration-300 ${
                  activePage === "settings"
                    ? "opacity-100 translate-x-0 scale-110 text-amber-300"
                    : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-white/60"
                }`}
              />
            </button>
          </nav>

          {/* Bottom decorative element */}
          <div className="mt-8 pt-4 border-t border-white/15">
            <div className="flex items-center justify-center">
              <div className="text-xs text-white/50">Shahid Generator © {new Date().getFullYear()}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}