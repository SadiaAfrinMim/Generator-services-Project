"use client"

import { useState } from "react"
import { Eye, EyeOff, LogIn } from "lucide-react"

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("shahid@shahidgenerator.com")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Form */}
          <div className="flex flex-col justify-center">
            <div className="mb-12">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">T</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                    Tech-dea
                  </h1>
                  <p className="text-sm text-gray-600">Business Management System</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">স্বাগতম</h2>
                <p className="text-gray-600 text-lg">আপনার ব্যবসায়িক সমাধানের জন্য</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    ইমেইল ঠিকানা
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-sky-500 focus:outline-none transition bg-white text-gray-900"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    পাসওয়ার্ড
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-sky-500 focus:outline-none transition bg-white text-gray-900"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-500 hover:text-sky-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-2 border-gray-300 text-sky-600 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">আমাকে মনে রাখুন</span>
                  </label>
                  <button type="button" className="text-sm text-sky-600 hover:text-sky-700 font-medium">
                    পাসওয়ার্ড ভুলে গেছেন?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-500 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-cyan-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <LogIn size={20} />
                  লগইন করুন
                </button>
              </form>
            </div>

            <p className="text-center text-sm text-gray-600">শহিদ জেনারেটর সার্ভিস</p>
          </div>

          {/* Right Side - Illustration */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <div className="relative w-full max-w-sm">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-200/40 to-cyan-200/40 rounded-3xl blur-2xl"></div>

              {/* Circle Modules */}
              <div className="relative">
                <svg viewBox="0 0 400 400" className="w-full h-auto">
                  {/* Center Circle */}
                  <circle cx="200" cy="200" r="80" fill="#0EA5E9" opacity="0.15" stroke="#0EA5E9" strokeWidth="2" />
                  <circle cx="200" cy="200" r="70" fill="none" stroke="#0EA5E9" strokeWidth="3" strokeDasharray="220" />

                  {/* Orbiting modules */}
                  {[
                    { angle: 0, label: "কর্মচারী", color: "#3B82F6" },
                    { angle: 60, label: "বেতন", color: "#06B6D4" },
                    { angle: 120, label: "ছুটি", color: "#0EA5E9" },
                    { angle: 180, label: "উপস্থিতি", color: "#3B82F6" },
                    { angle: 240, label: "নথি", color: "#06B6D4" },
                    { angle: 300, label: "মূল্যায়ন", color: "#0EA5E9" },
                  ].map((item, i) => {
                    const rad = (item.angle * Math.PI) / 180
                    const x = 200 + 120 * Math.cos(rad)
                    const y = 200 + 120 * Math.sin(rad)
                    return (
                      <g key={i}>
                        <line x1="200" y1="200" x2={x} y2={y} stroke="#E0F2FE" strokeWidth="2" />
                        <circle
                          cx={x}
                          cy={y}
                          r="35"
                          fill={item.color}
                          opacity="0.2"
                          stroke={item.color}
                          strokeWidth="2"
                        />
                        <text x={x} y={y} textAnchor="middle" dy="0.3em" fontSize="14" fontWeight="600" fill="#0C4A6E">
                          {item.label}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>

              <p className="text-center mt-8 text-gray-700 font-semibold">সম্পূর্ণ ব্যবসায়িক সমাধান</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
