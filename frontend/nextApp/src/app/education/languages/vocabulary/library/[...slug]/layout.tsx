"use client"

export type WordProps = {
  _id: string
  libraryId: string,
  word: { type: String, required: true },
  pronunciation: String,
  types: [
    {
      type: String,
      meanings: String,
      notes: [String],
    }
  ]
  
}

export const PARTSOFSPEECH = [
  { code: "noun", name: "Danh từ", },
  { code: "verb", name: "Động từ", },
  { code: "adjective", name: "Tính từ", },
  { code: "adverb", name: "Trạng từ", },
  { code: "preposition", name: "Giới từ", },
  { code: "conjunction", name: "Liên từ", },
  { code: "other", name: "Khác", },
]


export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      {children}
    </>
  )
}
