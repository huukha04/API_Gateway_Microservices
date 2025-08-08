"use client"

import { useTheme } from "next-themes"

import { SunFilled, MoonFilled } from "@ant-design/icons" 
import * as React from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) return null 

  return (
    <button
      onClick={toggleTheme}
      className="h-8 px-2.5 rounded-md gap-1.5 text-xl text-red-400 hover:text-red-500 dark:text-sky-400 dark:hover:text-sky-500 group has-[>svg]:px-2.5"
    >
      {resolvedTheme === "dark" ? <MoonFilled /> : <SunFilled />}
    </button>
  )
}
