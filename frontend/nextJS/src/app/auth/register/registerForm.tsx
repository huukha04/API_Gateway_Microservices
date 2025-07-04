"use client"
import * as React from "react"
import { signIn } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/shacn/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shacn/ui/card"
import { Input } from "@/components/shacn/ui/input"
import { Label } from "@/components/shacn/ui/label"
import { AlertError } from "./alertError"

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const [error, setError] = React.useState<string | null>(null)

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    const form = event.currentTarget
    const formData = new FormData(form)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.get('username'),
        password: formData.get('password'),
        email: formData.get('email'),
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.message || 'Đăng ký thất bại')
      return
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Register with your username and password</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <AlertError>{error}</AlertError>}

          <form onSubmit={handleRegister}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input name="username" type="text" required placeholder="name" />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="email" required placeholder="m@example.com" />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" required placeholder="••••••••"  />
              </div>

              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </form>

          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="/auth/login" className="underline underline-offset-4">
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
