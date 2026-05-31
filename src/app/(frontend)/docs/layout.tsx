import React from 'react'

import { DocsSidebarNav } from '@/components/DocsSidebarNav'
import { getDocsNavigation } from '@/utilities/getDocsNavigation'

export const revalidate = 60

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const categories = await getDocsNavigation()

  return (
    <div className="bg-[#0A0A0A] text-zinc-300 min-h-screen pt-14">
      <div className="flex max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-10 gap-10">
        <aside className="hidden md:block md:w-56 lg:w-60 shrink-0">
          <div className="sticky top-24">
            <DocsSidebarNav categories={categories} />
          </div>
        </aside>

        <main className="flex-1 min-w-0 max-w-3xl">{children}</main>
      </div>
    </div>
  )
}
