"use client"

export type LibraryProps = {
  _id: string
  title: string
  isPublic: boolean
  isStarred: boolean
  language: string
  updatedAt: string
  user: {
    id: string
    name: string
  }
}

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Tiếng Việt' },
]


export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      {children}
    </>
  )
}
