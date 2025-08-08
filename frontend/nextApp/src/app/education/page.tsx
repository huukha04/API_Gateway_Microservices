"use client"
import {
  Users,
  BarChart,
  Settings,
} from "lucide-react"

import { useRouteLoading } from "@/hooks/useRouteLoading"
import { PageSpinner } from "@/components/pageSpinner"
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
  const loading = useRouteLoading(100)
  if (loading) return <PageSpinner />
  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-5">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apps.map((app) => {
            const Icon = app.icon
            return (
              <Link key={app.name} href={app.href}>
                <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-primary" />
                      <CardTitle className="text-lg font-semibold">
                        {app.name}
                      </CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">{app.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <h2 className="text-2xl font-bold">Chào mừng đến với hệ thống quản lý giáo dục</h2>
              <p className="text-muted-foreground">
                Đây là nơi bạn có thể quản lý người dùng, xem báo cáo và cấu hình hệ thống.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
