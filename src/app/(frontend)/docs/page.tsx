import { notFound, redirect } from 'next/navigation'

import { getFirstDocSlug } from '@/utilities/getDocsNavigation'

export const revalidate = 60

export default async function DocsIndexPage() {
  const firstSlug = await getFirstDocSlug()
  if (!firstSlug) notFound()
  redirect(`/docs/${firstSlug}`)
}
