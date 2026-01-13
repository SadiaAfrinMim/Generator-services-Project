"use client"

import { useEffect, useState } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(undefined)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)")
    const handleChange = (e) => {
      setIsMobile(e.matches)
    }

    setIsMobile(mq.matches)
    mq.addEventListener("change", handleChange)
    return () => mq.removeEventListener("change", handleChange)
  }, [])

  return !!isMobile
}
