"use client"

import React, { useState } from "react"
import { Button } from "@/components/shadcn/ui/button"
import { Badge } from "@/components/shadcn/ui/badge"
import { Star, StarOff } from "lucide-react"
import Link from "next/link"
import { LibraryProps } from "./layout"

export function LibraryForm({ item }: { item: LibraryProps }) {
  const [formLibrary, setFormLibrary] = useState({
    title: item.title,
    language: item.language,
    isStarred: item.isStarred,
    isPublic: item.isPublic,
  })

  const [isStarred, setIsStarred] = useState(item.isStarred)

  const handleStarToggle = async () => {
    const newStarred = !isStarred
    setIsStarred(newStarred)

    try {
      const res = await fetch(`/api/dictionary/library/${item._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formLibrary,
          isStarred: newStarred,
        }),
      })

      const data = await res.json()
      console.log("PATCH result:", data)
    } catch (err) {
      console.error("PATCH failed:", err)
    }
  }

  return (
    <div className="rounded-xl bg-gray-100 dark:bg-gray-800 p-4 shadow">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <Link
            className="text-base text-blue-700 font-semibold leading-none"
            href={`/education/languages/vocabulary/library/${item._id}/${encodeURIComponent(item.title)}`}
          >
            {item.title}
          </Link>

          <Badge
            variant="outline"
            className="px-2 h-6 flex items-center justify-center text-sm leading-none"
          >
            {item.isPublic ? "Công khai" : "Riêng tư"}
          </Badge>
        </div>

        <Button
          className="h-6 w-6 p-0 flex items-center justify-center"
          variant="ghost"
          size="icon"
          onClick={handleStarToggle}
        >
          {isStarred ? (
            <Star className="w-4 h-4 text-yellow-400" />
          ) : (
            <StarOff className="w-4 h-4 text-gray-400" />
          )}
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <span className="flex items-center space-x-2">
          # {item.language}
        </span>

        <Badge variant="outline" className="ml-auto text-xs">
          <span className="font-medium">Cập nhật:</span>{" "}
          {new Date(item.updatedAt).toLocaleDateString("vi-VN")}
        </Badge>
      </div>
    </div>
  )
}
