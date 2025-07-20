import {
  Users,
  BarChart,
  Settings,
} from "lucide-react"

import { Card, CardContent, CardTitle } from "@/components/shadcn/ui/card"
import Link from "next/link"

const apps = [
  {
    name: "Quản lý người dùng",
    description: "Thêm, chỉnh sửa và quản lý tài khoản người dùng",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    name: "Hệ thống báo cáo",
    description: "Xem thống kê và báo cáo hoạt động",
    href: "/dashboard/reports",
    icon: BarChart,
  },
  {
    name: "Cài đặt hệ thống",
    description: "Cấu hình các thông số và quyền truy cập",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default function MainPage() {
  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-5">
      Voca
    </div>
  )
}
