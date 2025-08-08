"use client"

import React, { useEffect, useRef, useState } from "react"
import { AlertError } from "@/components/alertError"
import { Button } from "@/components/shadcn/ui/button"
import {
  Dialog,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui"
import { Input } from "@/components/shadcn/ui/input"
import { FilterIcon, Star, StarOff, Globe, Lock } from "lucide-react"
import { Badge } from "@/components/shadcn/ui/badge"



import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { LibraryInsertForm } from "./libraryInsertForm"

import { LANGUAGES, LibraryProps } from "./layout"
import { LibraryForm } from "./libraryForm"


export function MyCard() {
  const [visibleItems, setVisibleItems] = useState<LibraryProps[]>([])
  const [dataList, setDataList] = useState<LibraryProps[]>([]);
  const itemsPerLoad = 12
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const loadedCountRef = useRef<number>(0)

  const [error, setError] = useState<string | null>(null)
  const { data: session, status } = useSession()

  
  useEffect(() => {
    const initialItems = dataList.slice(0, itemsPerLoad)
    setVisibleItems(initialItems)
    loadedCountRef.current = itemsPerLoad
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting
        if (isVisible) {
          const next = dataList.slice(
            loadedCountRef.current,
            loadedCountRef.current + itemsPerLoad
          )
          if (next.length > 0) {
            setVisibleItems((prev) => [...prev, ...next])
            loadedCountRef.current += itemsPerLoad
          }
        }
      },
      {
        rootMargin: "0px",
        threshold: 1.0,
      }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (status === "loading") return
    const user = session?.user

    if (!user) {
      setError("Bạn cần đăng nhập để xem thư viện")
      return
    }
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/dictionary/library/userId`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'userId': user.id ?? '', 
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch libraries");
        }

        const data = await res.json();
        setDataList(data);
        const initialItems = data.slice(0, itemsPerLoad)
      setVisibleItems(initialItems)
      loadedCountRef.current = initialItems.length
      } catch (error) {
        console.error("Error fetching libraries:", error);
      }
    }
    fetchData()
  }, [session?.user])

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Thư viện của tôi</CardTitle>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <Input placeholder="Tìm kiếm..." className="w-[200px]" />
              <Button variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </div>
            <Dialog>
              <LibraryInsertForm
                setDataList={setDataList}
                setVisibleItems={setVisibleItems}
              />
            </Dialog>
          </div>
          {error && (
            <AlertError>
              {error}
            </AlertError>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {visibleItems.map((item) => (
              <LibraryForm key={item._id} item={item} />
            ))}
          </div>
          <div
            ref={loadMoreRef}
            className="h-10 mt-4 flex justify-center items-center"
          >
            {visibleItems.length < dataList.length ? (
              <span className="text-sm text-muted-foreground">
                Đang tải thêm...
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">
                Đã tải hết nội dung
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
