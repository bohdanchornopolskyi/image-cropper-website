import type { Payload, PayloadRequest } from 'payload'

import { docCategories, docPages } from './pages'

export const seedDocs = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('— Seeding docs...')

  await Promise.all([
    payload.db.deleteMany({ collection: 'docs', req, where: {} }),
    payload.db.deleteMany({ collection: 'doc-categories', req, where: {} }),
  ])

  const categoryIds = new Map<string, string>()

  for (const category of docCategories) {
    const doc = await payload.create({
      collection: 'doc-categories',
      data: category,
      req,
    })
    categoryIds.set(category.slug, String(doc.id))
  }

  for (const page of docPages) {
    const categoryId = categoryIds.get(page.categorySlug)
    if (!categoryId) {
      throw new Error(`Unknown category slug: ${page.categorySlug}`)
    }

    await payload.create({
      collection: 'docs',
      data: {
        title: page.title,
        slug: page.slug,
        description: page.description,
        category: categoryId,
        order: page.order,
        content: page.content,
      },
      req,
    })
  }

  payload.logger.info(`— Seeded ${docPages.length} docs in ${docCategories.length} categories`)
}
