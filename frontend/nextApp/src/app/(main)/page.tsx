import {
  Users,
  BarChart,
  Settings,
} from "lucide-react"

import { Card, CardContent, CardTitle } from "@/components/shadcn/ui/card"
import Link from "next/link"

const apps = [
  {
    name: "Education",
    description: "",
    href: "/education",
    icon: Users,
  },
]

export default function MainPage() {
  return (
    <>
    <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min p-5">
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
      </div>
    </div>
    <div className="text-xl">Kha</div>
    </>
  )
}
