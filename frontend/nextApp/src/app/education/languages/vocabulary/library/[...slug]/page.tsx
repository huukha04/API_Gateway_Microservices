"use client"

import { use } from 'react'

import { WordPage } from './wordPage'


export default function Page({ params }: { params: Promise<{ slug: string[] }> }) {


  const { slug } = use(params)
  const id = slug?.[0] ?? 'N/A'
  const title = slug?.[1] ?? 'N/A'

  return <WordPage id={id} title={title} />
}
