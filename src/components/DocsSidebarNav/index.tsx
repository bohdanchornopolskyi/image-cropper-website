'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Doc = {
  id: string | number
  title: string
  slug: string
}

type Category = {
  id: string | number
  title: string
  slug: string
  docs: Doc[]
}

type Props = {
  categories: Category[]
}

export const DocsSidebarNav: React.FC<Props> = ({ categories }) => {
  const pathname = usePathname()

  return (
    <nav className="space-y-6">
      {categories.map((cat) => (
        <div key={cat.id}>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-2 px-2">
            {cat.title}
          </p>
          <ul className="space-y-0.5">
            {cat.docs.map((doc) => {
              const href = `/docs/${doc.slug}`
              const isActive = pathname === href
              return (
                <li key={doc.id}>
                  <Link
                    href={href}
                    className={[
                      'block text-sm py-1.5 px-2 rounded transition-colors',
                      isActive
                        ? 'text-white bg-zinc-800 font-medium'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50',
                    ].join(' ')}
                  >
                    {doc.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
