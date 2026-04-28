import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { DocsSidebarNav } from '@/components/DocsSidebarNav'

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config: configPromise })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payloadAny = payload as any

  const [categoriesResult, docsResult] = await Promise.all([
    payloadAny.find({
      collection: 'doc-categories',
      sort: 'order',
      limit: 100,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'docs',
      select: { title: true, slug: true, category: true, order: true },
      sort: 'order',
      limit: 500,
      overrideAccess: false,
      depth: 0,
    }),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const docsByCategory = (docsResult.docs as any[]).reduce<Record<string, any[]>>((acc, doc) => {
    const catId = String(
      typeof doc.category === 'object' && doc.category !== null ? doc.category.id : doc.category,
    )
    if (!acc[catId]) acc[catId] = []
    acc[catId].push(doc)
    return acc
  }, {})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categories = (categoriesResult.docs as any[])
    .map((cat) => ({
      id: cat.id,
      title: cat.title,
      slug: cat.slug,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      docs: (docsByCategory[String(cat.id)] ?? []).map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        slug: doc.slug as string,
      })),
    }))
    .filter((cat) => cat.docs.length > 0)

  return (
    <div className="bg-[#0A0A0A] text-zinc-300 min-h-screen pt-14">
      <div className="flex max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-10 gap-10">
        {/* Sidebar */}
        <aside className="hidden md:block md:w-56 lg:w-60 shrink-0">
          <div className="sticky top-24">
            <DocsSidebarNav categories={categories} />
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 max-w-3xl">{children}</main>
      </div>
    </div>
  )
}
