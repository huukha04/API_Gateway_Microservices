
"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function useRouteLoading(delay = 100) {
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), delay)
    return () => clearTimeout(timeout)
  }, [pathname])

  return loading
}
