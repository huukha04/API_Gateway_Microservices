import React, { useState, useRef } from "react"
import { useSession } from "next-auth/react"

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
}
from "@/components/shadcn/ui"
import { AlertError } from "@/components/alertError"
import { LANGUAGES, LibraryProps } from "./layout"

type InsertLibraryFormProps = {
  setDataList: React.Dispatch<React.SetStateAction<LibraryProps[]>>
  setVisibleItems: React.Dispatch<React.SetStateAction<LibraryProps[]>>
}

export function LibraryInsertForm({ setDataList, setVisibleItems }: InsertLibraryFormProps) {
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()
  const [libraryForm, setlibraryForm] = useState({ title: "", language: "" })
  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  const handleChangeLibraryForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setlibraryForm({ ...libraryForm, [e.target.name]: e.target.value })
  }
  
  const handleAddLibrary = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = session?.user
    const { title, language } = libraryForm

    try {
      const res = await fetch("/api/dictionary/library", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, language, user: user }),
      })
      const data = await res.json()
      if (res.ok) {
        // Cập nhật danh sách mới sau khi thêm
        const updatedList = await fetch("/api/dictionary/library", {
          headers: {
            "Content-Type": "application/json",
            userId: user?.id ?? "",
          },
        }).then(res => res.json())

        setDataList(updatedList)
        const initialItems = updatedList.slice(0, 12)
        setVisibleItems(initialItems)
        dialogCloseRef.current?.click() // Đóng modal
        setlibraryForm({ title: "", language: "" }) // Reset form
        setError(null)
      }

      else {
        setError(data.message || "Lỗi khi thêm thư viện")
      }
    }
    catch (error) {
      console.error("Error adding library:", error)
      setError("Lỗi khi thêm thư viện. Vui lòng thử lại sau.")
    }
  }

  return (
    <>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" >Add library</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thêm thư viện</DialogTitle>
            <DialogDescription>
              Nhập thông tin thư viện. Nhấn "Lưu" để tạo mới.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddLibrary}>
            {error && (
              <AlertError>
                {error}
              </AlertError>
            )}
            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Tên thư viện</Label>
                <Input name="title" value={libraryForm.title} onChange={handleChangeLibraryForm} required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="language">Ngôn ngữ</Label>
                <Select
                  value={libraryForm.language}
                  onValueChange={(value) =>
                    setlibraryForm((prev) => ({ ...prev, language: value }))
                  }
                >
                  <SelectTrigger className="w-full px-3 py-2 border rounded-md text-sm">
                    <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>

                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" ref={dialogCloseRef}>Hủy</Button>
              </DialogClose>
              <Button type="submit">Lưu</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </>
  )
}