import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-zinc-800 bg-[#0A0A0A] text-zinc-400">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between md:items-center">
        <Link href="/" className="text-sm font-semibold text-white tracking-tight">
          Payload Image Cropper
        </Link>

        {navItems.length > 0 && (
          <nav className="flex flex-wrap gap-6">
            {navItems.map(({ link }, i) => (
              <CMSLink
                className="text-sm text-zinc-400 hover:text-white transition-colors"
                key={i}
                {...link}
              />
            ))}
          </nav>
        )}

        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} Payload Image Cropper. MIT License.
        </p>
      </div>
    </footer>
  )
}
