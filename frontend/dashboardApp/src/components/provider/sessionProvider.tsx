// app/provider/sessionProvider.tsx
"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

export function SessionProviders({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
