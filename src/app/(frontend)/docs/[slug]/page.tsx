import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'

import { CalloutBlock } from '@/blocks/Callout/Component'
import { StepsBlock } from '@/blocks/Steps/Component'
import { CodeBlock } from '@/blocks/Code/Component'
import { DocRichTextBlock } from '@/blocks/DocRichText/Component'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'docs',
    where: { slug: { equals: slug } },
    limit: 1,
    select: { title: true, description: true },
  })
  const doc = docs[0]
  if (!doc) return {}
  return {
    title: `${doc.title} — Payload Image Cropper`,
    description: doc.description ?? undefined,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'docs',
    select: { slug: true },
    limit: 1000,
    overrideAccess: false,
  })
  return docs.map((doc) => ({ slug: doc.slug }))
}

export default async function DocPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'docs',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    overrideAccess: false,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc: any = docs[0]
  if (!doc) notFound()

  const category =
    doc.category && typeof doc.category === 'object' ? doc.category : null
  const categoryTitle = category?.title ?? String(doc.category ?? '').replace(/-/g, ' ')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blocks: any[] = doc.content ?? []

  return (
    <article>
      <header className="mb-10 pb-8 border-b border-zinc-800">
        {categoryTitle && (
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-3">
            {categoryTitle}
          </p>
        )}
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-4">
          {doc.title}
        </h1>
        {doc.description && <p className="text-zinc-400 text-lg">{doc.description}</p>}
      </header>

      <div className="space-y-8">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {blocks.map((block: any, i: number) => {
          switch (block.blockType) {
            case 'richText':
              return <DocRichTextBlock key={i} {...block} />
            case 'code':
              return (
                <div key={i} className="not-prose">
                  <CodeBlock code={block.code} language={block.language} title={block.title} blockType="code" />
                </div>
              )
            case 'callout':
              return <CalloutBlock key={i} {...block} />
            case 'steps':
              return <StepsBlock key={i} {...block} />
            default:
              return null
          }
        })}
      </div>
    </article>
  )
}
