"use client"

import "./index.css"
import { useState } from "react"
import DashboardPage from "../components/dashboard-page"
import LoginPage from "../components/login-page"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="font-sans antialiased">
      {isLoggedIn ? <DashboardPage onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />}
    </div>
  )
}
