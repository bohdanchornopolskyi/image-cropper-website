'use client'

import { Github } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const HeaderClient: React.FC = () => {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-[#0A0A0A]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-white tracking-tight">
          Payload Image Cropper
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/docs"
            className={`text-sm transition-colors ${pathname?.startsWith('/docs') ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            Docs
          </Link>
          <a
            href="https://github.com/bohdanchornopolskyi/image-cropper-plugin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </nav>
      </div>
    </header>
  )
}
