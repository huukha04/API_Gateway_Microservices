"use client"
import * as React from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from 'next/navigation'


import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn/ui/button"
import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card"

import { AlertDemo } from "./alertDemo"
import { AlertError } from "../../../components/alertError"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [error, setError] = React.useState<string | null>(null)

  const searchParams = useSearchParams();

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
    // Map default error message
    if (res.error === 'CredentialsSignin') {
      setError('Invalid username or password');
    } else {
      setError(res.error);
    }
  } else {
    const callbackUrl = searchParams.get('callbackUrl') || '/'
    window.location.href = callbackUrl; 
  }

  };


  const handleGithubLogin = async () => {
    setError(null);
    const callbackUrl = searchParams.get('callbackUrl') || '/'
    await signIn('github', {
      callbackUrl: callbackUrl,
    });

    
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <Button variant="outline" className="w-full" onClick={() => handleGithubLogin()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
              <span>Login with GitHub</span>

            </Button>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
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
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input 
                    name="password"
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="./register" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By signing in, you agree to our <a href="./register">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
