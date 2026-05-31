import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

import type { DocsNavPage } from '@/utilities/getDocsNavigation'

type Props = {
  prev: DocsNavPage | null
  next: DocsNavPage | null
}

const linkClassName =
  'group flex flex-col gap-1 p-4 rounded-lg border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 transition-colors min-w-0 flex-1 sm:max-w-[calc(50%-0.5rem)]'

export const DocsPageNav: React.FC<Props> = ({ prev, next }) => {
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Documentation pages"
      className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row gap-4"
    >
      {prev ? (
        <Link href={`/docs/${prev.slug}`} className={linkClassName}>
          <span className="flex items-center gap-1 text-xs text-zinc-500 group-hover:text-zinc-400">
            <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
            Previous
          </span>
          <span className="text-sm font-medium text-zinc-200 group-hover:text-white truncate">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block flex-1" />
      )}

      {next ? (
        <Link href={`/docs/${next.slug}`} className={`${linkClassName} sm:ml-auto sm:text-right`}>
          <span className="flex items-center gap-1 text-xs text-zinc-500 group-hover:text-zinc-400 sm:justify-end">
            Next
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          </span>
          <span className="text-sm font-medium text-zinc-200 group-hover:text-white truncate">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  )
}
