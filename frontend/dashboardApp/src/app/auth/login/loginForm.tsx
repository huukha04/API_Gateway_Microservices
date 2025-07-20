// app/auth/login/loginForm.tsx
"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card"
import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"
import { signIn } from "next-auth/react"

import { AlertDemo } from "./alertDemo"
import { AlertError } from "./alertError"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [error, setError] = React.useState<string | null>(null)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const formData = new FormData(form);

    const res = await signIn('credentials', {
      redirect: false,
      username: formData.get('username'),
      password: formData.get('password'),
    });

    if (res?.error) {
      setError('Sai tài khoản hoặc mật khẩu');
    } else {
      window.location.href = '/';
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Dashboard App is a tool for building and sharing dashboards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <AlertDemo />
          </div>
            {error && (
              <AlertError>
                {error}
              </AlertError>
            )}

          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    name="username"
                    type="text"
                    placeholder="toolpad-demo"
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input 
                    name="password"
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    />
                </div>
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By signing in, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
