"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import {
  Button,
  DialogClose,
  DialogFooter,
  Input,
  Label,
} from "@/components/shadcn/ui"
import { Trash2, X, Plus, Save } from "lucide-react"
import { AlertError } from "@/components/alertError"
import { PARTSOFSPEECH } from "./layout"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select"

export function InsertWordForm({ id }: { id: string }) {
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)

  const [newWordForm, setNewWordForm] = useState({
    word: "",
    pronunciation: "",
    types: [
      {
        type: "",
        meanings: "",
        notes: [""],
      },
    ],
  })

  const handleWordFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    typeIndex?: number,
    field?: "type" | "meanings",
    subIndex?: number,
    subField?: "notes"
  ) => {
    const { value } = e.target
    if (typeof typeIndex === "number" && field === "meanings") {
      const updatedTypes = [...newWordForm.types]
      updatedTypes[typeIndex].meanings = value
      setNewWordForm({ ...newWordForm, types: updatedTypes })
    } else if (typeof typeIndex === "number" && field) {
      const updatedTypes = [...newWordForm.types]
      updatedTypes[typeIndex][field] = value
      setNewWordForm({ ...newWordForm, types: updatedTypes })
    } else if (typeof typeIndex === "number" && subField) {
      const updatedTypes = [...newWordForm.types]
      updatedTypes[typeIndex][subField][subIndex!] = value
      setNewWordForm({ ...newWordForm, types: updatedTypes })
    } else {
      setNewWordForm({ ...newWordForm, [e.target.name]: value })
    }
  }

  const removeType = (typeIndex: number) => {
    const updatedTypes = [...newWordForm.types]
    updatedTypes.splice(typeIndex, 1)
    setNewWordForm({ ...newWordForm, types: updatedTypes })
  }

  const removeSubField = (
    typeIndex: number,
    subField: "notes",
    subIndex: number
  ) => {
    const updatedTypes = [...newWordForm.types]
    updatedTypes[typeIndex][subField].splice(subIndex, 1)
    setNewWordForm({ ...newWordForm, types: updatedTypes })
  }

  const addType = () => {
    setNewWordForm({
      ...newWordForm,
      types: [...newWordForm.types, { type: "", meanings: "", notes: [""] }],
    })
  }

  const addSubField = (index: number, subField: "notes") => {
    const updatedTypes = [...newWordForm.types]
    updatedTypes[index][subField].push("")
    setNewWordForm({ ...newWordForm, types: updatedTypes })
  }

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/dictionary/word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          libraryId: id,
          ...newWordForm,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        alert("Thêm từ vựng thành công")
        setNewWordForm({
          word: "",
          pronunciation: "",
          types: [{ type: "", meanings: "", notes: [""] }],
        })
        router.refresh()
      } else {
        setError(data.message || "Lỗi khi thêm từ vựng")
      }
    } catch (err) {
      console.error(err)
      setError("Lỗi khi thêm từ vựng")
    }
  }

  return (
    <>
      <form onSubmit={handleAddWord} className="mt-4">
        {error && <AlertError>{error}</AlertError>}
        <div className="space-y-6">
          {/* Word and Pronunciation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="word" className="font-medium">
                Từ vựng *
              </Label>
              <Input
                id="word"
                name="word"
                value={newWordForm.word}
                onChange={handleWordFormChange}
                required
                placeholder="Nhập từ vựng"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pronunciation" className="font-medium">
                Phát âm
              </Label>
              <Input
                id="pronunciation"
                name="pronunciation"
                value={newWordForm.pronunciation}
                onChange={handleWordFormChange}
                placeholder="Nhập phiên âm"
                className="h-10"
              />
            </div>
          </div>

          {/* Word Types */}
          <div className="space-y-4">
            {newWordForm.types.map((t, typeIndex) => (
              <div
                key={typeIndex}
                className="border p-4 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-lg">
                    Loại từ {typeIndex + 1}
                  </h4>
                  {typeIndex > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeType(typeIndex)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Loại từ *</Label>
                    <Select
                      value={t.type}
                      onValueChange={(value) =>
                        handleWordFormChange(
                          {
                            target: {
                              value,
                              name: "type",
                            },
                          } as React.ChangeEvent<HTMLInputElement>,
                          typeIndex,
                          "type"
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn loại từ" />
                      </SelectTrigger>
                      <SelectContent>
                        {PARTSOFSPEECH.map((item) => (
                          <SelectItem key={item.code} value={item.code}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Single Meaning */}
                  <div className="space-y-2">
                    <Label>Dịch nghĩa</Label>
                    <Input
                      placeholder="Nghĩa"
                      value={t.meanings}
                      onChange={(e) =>
                        handleWordFormChange(e, typeIndex, "meanings")
                      }
                    />
                  </div>

                  {/* Notes (vẫn cho phép nhiều) */}
                  <div className="space-y-2">
                    <Label>Ghi chú</Label>
                    <div className="space-y-2">
                      {t.notes.map((n, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <Input
                            placeholder={`Ghi chú ${i + 1}`}
                            value={n}
                            onChange={(e) =>
                              handleWordFormChange(e, typeIndex, undefined, i, "notes")
                            }
                          />
                          {i > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                removeSubField(typeIndex, "notes", i)
                              }
                              className="text-red-500 hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addSubField(typeIndex, "notes")}
                      className="gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Thêm ghi chú
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addType}
            className="gap-2 w-full"
          >
            <Plus className="w-4 h-4" />
            Thêm loại từ
          </Button>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Hủy bỏ
            </Button>
          </DialogClose>
          <Button type="submit" className="gap-2">
            <Save className="w-4 h-4" />
            Lưu từ vựng
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}
