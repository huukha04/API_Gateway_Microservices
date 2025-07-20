"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui"

import { PageSpinner } from "@/components/pageSpinner"
import { useRouteLoading } from "@/hooks/useRouteLoading"

import { MyCard } from "./myCard"

export default function Page() {
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabParam = searchParams.get("tab") || "1"

  const loading = useRouteLoading(100)
  if (loading) return <PageSpinner />

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", value)
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  return (
    <Tabs value={tabParam} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-[400px] grid-cols-3">
        <TabsTrigger value="1">Thư viện của tôi</TabsTrigger>
        <TabsTrigger value="2">Đã lưu</TabsTrigger>
        <TabsTrigger value="3">Khám phá</TabsTrigger>
      </TabsList>

      <TabsContent value="1">
        <MyCard />
      </TabsContent>
    </Tabs>
  )
}
