import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Documentation — Payload Image Cropper',
}

export default async function DocsIndexPage() {
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
      select: { title: true, slug: true, category: true, description: true, order: true },
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
  const categories = (categoriesResult.docs as any[]).map((cat: any) => ({
    ...cat,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    docs: (docsByCategory[String(cat.id)] ?? []) as any[],
  }))

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-4">
          Documentation
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Comprehensive guides and references for integrating the Payload Image Cropper plugin.
        </p>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {categories.map((cat: any) => {
          const firstDoc = cat.docs[0]
          return (
            <Link
              key={cat.id}
              href={firstDoc ? `/docs/${firstDoc.slug}` : '#'}
              className="group p-6 rounded border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-all flex flex-col gap-3"
            >
              <div>
                <h2 className="font-medium text-white mb-2 flex items-center gap-2">
                  {cat.title}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-400" />
                </h2>
                {cat.description && (
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{cat.description}</p>
                )}
                <p className="text-xs text-zinc-600">
                  {cat.docs.length
                    ? `${cat.docs.length} page${cat.docs.length !== 1 ? 's' : ''}`
                    : 'No pages yet'}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Per-category page lists */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {categories.map((cat: any) => {
        if (!cat.docs.length) return null
        return (
          <div key={cat.id} className="mb-10">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
              {cat.title}
            </h2>
            <ul className="space-y-2">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {cat.docs.map((doc: any) => (
                <li key={doc.id}>
                  <Link
                    href={`/docs/${doc.slug}`}
                    className="flex items-start gap-3 p-3 rounded border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all group"
                  >
                    <ArrowRight className="w-4 h-4 mt-0.5 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0" />
                    <div>
                      <p className="text-sm text-zinc-200 group-hover:text-white transition-colors">
                        {doc.title}
                      </p>
                      {doc.description && (
                        <p className="text-xs text-zinc-500 mt-0.5">{doc.description}</p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
