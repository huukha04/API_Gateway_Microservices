"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card"
import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"

import { AlertError } from "@/components/alertError"

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const [error, setError] = React.useState<string | null>(null)

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Validate password match
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('comfirmPassword') as string;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Registration failed");
      return;
    } else {
      window.location.href = './login';
    }


  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to</CardTitle>
        </CardHeader>
        <CardContent>
            {error && (
              <AlertError>
                {error}
              </AlertError>
            )}

          <form onSubmit={handleRegister}>
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="toolpad@example.com"
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    name="password"
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="comfirmPassword">Comfirm Password</Label>
                  <Input 
                    name="comfirmPassword"
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    />
                </div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?
                <a href="./login" className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By signing up, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
