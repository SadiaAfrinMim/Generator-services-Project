import { useEffect, useState } from "react"
import Sidebar from "./sidebar"
import Topbar from "./topbar"
import DashboardContent from "./dashboard-content"

import EmployeeList from "./pages/employee-list"
import CustomerList from "./pages/customer-list"
import VendorList from "./pages/vendor-list"
import BillingSheet from "./pages/billing-sheet"
import InvoiceList from "./pages/invoice-list"
import ProductServices from "./pages/product-services"
import MeterReading from "./pages/meter-reading"
import Sales from "./pages/sales"
import Settings from "./pages/settings"

import MeterReadingSite from "./pages/MeterReadingSite"
import BillCollectionSite from "./pages/billcollectionsite"
import SmsPage from "./pages/SmsPage"
import Chalan from "./pages/Chalan"
import ChalanPrint from "./pages/ChalanPrint"
import AreaPage from "./pages/AreaPage"
import ObhijogPage from "./pages/ObhijogPage"


export default function DashboardPage({ onLogout }) {
  const [activePage, setActivePage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // ✅ Mobile এ default close রাখতে চাইলে:
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)")
    const apply = () => setSidebarOpen(!mq.matches)
    apply()
    mq.addEventListener?.("change", apply)
    return () => mq.removeEventListener?.("change", apply)
  }, [])

const renderContent = () => {
  switch (activePage) {
    case "dashboard":
      return <DashboardContent onPageChange={setActivePage} />

    case "employees":
      return <EmployeeList />

    case "customers":
      return <CustomerList />

    case "vendors":
      return <VendorList />

    // ✅ NEW
    case "area":
      return <AreaPage />

    // ✅ NEW
    case "obhijog":
      return <ObhijogPage />

    case "products":
      return <ProductServices />

    case "meter":
      return <MeterReading />

    // ✅ Sales submenu
    case "chalan":
      return <Sales />

    case "chalanPrint":
      return <ChalanPrint />

    case "sales":
      return <Sales />

    case "invoices":
      return <InvoiceList />

    case "billing":
      return <BillingSheet />

    // ✅ Site submenu
    case "meterReadingSite":
      return <MeterReadingSite />

    case "billCollectionSite":
      return <BillCollectionSite />

    // ✅ SMS
    case "sms":
      return <SmsPage />

    case "settings":
      return <Settings />

    default:
      return <DashboardContent onPageChange={setActivePage} />
  }
}


  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
        isOpen={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          onLogout={onLogout}
          onSidebarToggle={() => setSidebarOpen((s) => !s)}
        />
        <main className="flex-1 overflow-auto p-3 lg:p-5">{renderContent()}</main>
      </div>
    </div>
  )
}
