"use client"

import React, { useRef, useState } from "react"

const ipaSymbols = [
  "i", "ɪ", "e", "æ", "ə", "ɑ", "ʌ", "ɔ", "ʊ", "u",
  "θ", "ð", "ʃ", "ʒ", "ŋ", "tʃ", "dʒ", "ɒ", "ɜː", "ɛ", "ɡ", "ʔ"
]

export default function IPAInput() {
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const insertAtCursor = (symbol: string) => {
    const input = inputRef.current
    if (!input) return

    const start = input.selectionStart || 0
    const end = input.selectionEnd || 0
    const newValue = value.slice(0, start) + symbol + value.slice(end)

    setValue(newValue)

    // Đặt lại vị trí con trỏ
    setTimeout(() => {
      input.setSelectionRange(start + symbol.length, start + symbol.length)
      input.focus()
    }, 0)
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Nhập phiên âm bằng bàn phím hoặc chọn ký tự IPA"
      />

      <div className="flex flex-wrap gap-2">
        {ipaSymbols.map((symbol, index) => (
          <button
            key={index}
            onClick={() => insertAtCursor(symbol)}
            className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-lg"
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  )
}
