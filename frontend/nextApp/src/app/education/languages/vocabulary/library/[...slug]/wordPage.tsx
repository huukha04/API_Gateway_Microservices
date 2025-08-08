"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui"

import { InsertWordForm } from "./wordInsertForm"
import { WordForm } from "./wordForm"

import { MoreHorizontal, Pencil, Trash } from "lucide-react"


export function WordPage({ id, title }: { id: string; title: string }) {
  const router = useRouter()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/dictionary/word/libraryId`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'libraryId': id ?? '', 
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch libraries");
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching libraries:", error);
      }
      
    }
    fetchData()

  }, [])

  const handleDelete = async (wordId: string) => {
  const confirmDelete = confirm("Bạn có chắc muốn xóa từ vựng này?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/dictionary/word/${wordId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setData((prev) => prev.filter((item) => item._id !== wordId));
      alert("Xóa thành công");
    } else {
      const errorData = await res.json();
      alert(`Lỗi: ${errorData.message || "Không thể xóa"}`);
    }
  } catch (error) {
    console.error("Lỗi khi xóa từ vựng:", error);
    alert("Đã xảy ra lỗi khi xóa");
  }
};


  

  return (
    <>
      <div className="text-end mb-4 space-x-2">
        <Button variant="destructive" onClick={() => router.back()}>
          Quay lại
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              Thêm từ vựng
            </Button>
          </DialogTrigger>
            <DialogContent className="w-[70vw] md:max-w-5xl overflow-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Thêm từ vựng mới</DialogTitle>
                <DialogDescription>
                  Nhập đầy đủ thông tin từ vựng bên dưới 
                </DialogDescription>
              </DialogHeader>
            <InsertWordForm id = {id}/>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thư viện: {title}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
                      <Table>
            <TableCaption>Danh sách từ vựng trong thư viện.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Từ vựng</TableHead>
                <TableHead>Phát âm</TableHead>
                <TableHead>Loại từ</TableHead>
                <TableHead>Dịch nghĩa</TableHead>
                <TableHead>Ghi chú</TableHead>
                <TableHead className="sticky right-0 z-10 text-center bg-* "></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item, index) =>
                item.types.map((t: any, typeIndex: number) => {
                  const isFirstRow = typeIndex === 0
                  return (
                    <TableRow key={`${item._id}-${typeIndex}`}>
                      <TableCell>{isFirstRow ? index + 1 : ""}</TableCell>
                      <TableCell>{isFirstRow ? item.word : ""}</TableCell>
                      <TableCell>{isFirstRow ? item.pronunciation : ""}</TableCell>
                      <TableCell>{t.type}</TableCell>
                      <TableCell>
                        <ul className="list-disc pl-4">
                          {t.meanings}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <ul className="list-disc pl-4">
                          {t.notes.map((n: string, i: number) => (
                            <li key={i}>{n}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell className="sticky right-0 z-10 text-center bg-*"> 
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(item._id)}
                        >
                          <Trash className="w-4 h-4 text-red-600" />
                        </Button>     
                        <Dialog>
  <DialogTrigger asChild>
    <Button variant="ghost" size="icon" className="h-6 w-6">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DialogTrigger>

  <DialogContent className="w-[70vw] md:max-w-5xl overflow-auto">
    <DialogHeader>
      <DialogTitle className="text-2xl">Sửa từ vựng</DialogTitle>
      <DialogDescription>
        Chỉnh sửa thông tin từ vựng bên dưới
      </DialogDescription>
    </DialogHeader>
    <WordForm word={item} />
  </DialogContent>
</Dialog>

                        </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
                  Tổng cộng: {data.reduce((acc, d) => acc + d.types.length, 0)}{" "}
                  mục
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          </div>

        </CardContent>

        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </>
  )
}
