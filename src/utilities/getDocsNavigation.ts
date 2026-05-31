import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type DocsNavCategory = {
  id: string | number
  title: string
  slug: string
  docs: {
    id: string | number
    title: string
    slug: string
  }[]
}

export async function getDocsNavigation(): Promise<DocsNavCategory[]> {
  const payload = await getPayload({ config: configPromise })

  const [categoriesResult, docsResult] = await Promise.all([
    payload.find({
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
      depth: 1,
    }),
  ])

  const docsByCategorySlug = docsResult.docs.reduce<
    Record<string, typeof docsResult.docs>
  >((acc, doc) => {
    const category =
      doc.category && typeof doc.category === 'object' ? doc.category : null
    const categorySlug = category?.slug
    if (!categorySlug) return acc
    if (!acc[categorySlug]) acc[categorySlug] = []
    acc[categorySlug].push(doc)
    return acc
  }, {})

  return categoriesResult.docs
    .map((cat) => ({
      id: cat.id,
      title: cat.title,
      slug: cat.slug,
      docs: (docsByCategorySlug[cat.slug] ?? []).map((doc) => ({
        id: doc.id,
        title: doc.title,
        slug: doc.slug,
      })),
    }))
    .filter((cat) => cat.docs.length > 0)
}

export async function getFirstDocSlug(): Promise<string | null> {
  const categories = await getDocsNavigation()
  return categories[0]?.docs[0]?.slug ?? null
}
