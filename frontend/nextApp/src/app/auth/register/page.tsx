"use client"
import { RegisterForm } from "@/app/auth/register/registerForm"
export default function RegisterPage() {
  return (
                  
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-md">
        <RegisterForm />
      </div>
    </div>
  )
}
