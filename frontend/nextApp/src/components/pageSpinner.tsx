"use client"

import React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils" // Nếu bạn dùng tailwind helper, có thể bỏ nếu không cần

export function PageSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black/60">
      <Loader2 className="w-10 h-10 animate-spin text-gray-600 dark:text-white" />
    </div>
  )
}
