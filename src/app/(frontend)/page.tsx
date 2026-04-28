'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Github } from 'lucide-react'
import Link from 'next/link'
import { Terminal } from '@/components/Terminal'

type AspectRatio = '16:9' | '4:3' | '1:1' | 'Custom'

const DOCS_CATEGORIES = [
  {
    title: 'Getting Started',
    description: 'Install and set up the plugin in your Payload project.',
    href: '/docs/getting-started',
  },
  {
    title: 'Configuration',
    description: 'Explore plugin options and field-level settings for custom aspect ratios.',
    href: '/docs/configuration',
  },
  {
    title: 'Frontend Integration',
    description: 'See the data shape and learn how to display cropped images in your app.',
    href: '/docs/frontend-integration',
  },
  {
    title: 'API Reference',
    description: 'Detailed breakdown of the CropDefinition interfaces and metadata structure.',
    href: '/docs/api-reference',
  },
]

const installCode = `npm install payload-plugin-image-cropper
# or
yarn add payload-plugin-image-cropper
# or
pnpm add payload-plugin-image-cropper`

const setupCode = `import { buildConfig } from 'payload/config'
import { imageCropper } from 'payload-plugin-image-cropper'

export default buildConfig({
  plugins: [
    imageCropper({
      // Your configuration options here
    })
  ]
})`

const fieldCode = `import { CollectionConfig } from 'payload/types'
import { cropImageField } from 'payload-plugin-image-cropper'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  fields: [
    cropImageField({
      name: 'heroCrop',
      options: { aspectRatio: 16 / 9 },
    }),
  ],
}`

export default function HomePage() {
  const [activeRatio, setActiveRatio] = useState<AspectRatio>('16:9')

  return (
    <main className="flex-1 flex flex-col items-center bg-[#0A0A0A] w-full text-zinc-300">
      {/* Hero */}
      <section className="relative w-full max-w-7xl mx-auto px-6 pt-32 pb-24 sm:pt-40 lg:px-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative text-center mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-medium text-zinc-300 mb-8 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Payload CMS Plugin
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-bold tracking-tight text-white italic sm:text-7xl mb-8"
          >
            Image Cropping, <br />
            <span className="text-zinc-500 font-light">perfected.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed text-zinc-400 mb-10 max-w-2xl mx-auto"
          >
            A powerful, seamless, and un-opinionated image cropper plugin for Payload CMS. Empower
            your content editors to frame images exactly as intended without ever leaving the admin
            panel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/docs"
              className="w-full sm:w-auto px-4 py-2 rounded bg-zinc-100 text-black font-medium hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/bohdanchornopolskyi/image-cropper-plugin"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 rounded border border-zinc-800 bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" /> Star on GitHub
            </a>
          </motion.div>
        </div>

        {/* Visual Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 flex justify-center w-full relative z-10"
        >
          <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden aspect-video flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 md:border-r border-b md:border-b-0 border-zinc-800 bg-zinc-900/50 p-6 flex flex-col gap-6">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['16:9', '4:3', '1:1', 'Custom'] as AspectRatio[]).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setActiveRatio(ratio)}
                      className={`px-3 py-2 border rounded text-xs transition-colors ${
                        activeRatio === ratio
                          ? 'bg-zinc-800 border-zinc-700 text-white'
                          : 'bg-transparent border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                  Dimensions
                </label>
                <div className="text-sm text-zinc-400">
                  {activeRatio === '16:9'
                    ? '1920 × 1080 px'
                    : activeRatio === '4:3'
                      ? '1440 × 1080 px'
                      : activeRatio === '1:1'
                        ? '1080 × 1080 px'
                        : 'Freeform'}
                </div>
              </div>
              <div className="mt-auto hidden md:flex items-center gap-3 w-full">
                <button className="flex-1 py-2.5 bg-[#111111] border border-[#666666] hover:bg-[#1a1a1a] text-[#cccccc] rounded-[4px] text-sm transition-colors">
                  Cancel
                </button>
                <button className="flex-1 py-2.5 bg-[#EEEEEE] hover:bg-white text-[#111111] rounded-[4px] text-sm transition-colors">
                  Save
                </button>
              </div>
            </div>

            <div className="flex-1 bg-[#111] relative flex items-center justify-center p-8 min-h-[300px]">
              <div className="relative w-full h-full bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 max-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900 opacity-50" />
                <motion.div
                  initial={false}
                  animate={{
                    aspectRatio:
                      activeRatio === '16:9'
                        ? 16 / 9
                        : activeRatio === '4:3'
                          ? 4 / 3
                          : activeRatio === '1:1'
                            ? 1
                            : 1.5,
                    width:
                      activeRatio === '1:1'
                        ? '50%'
                        : activeRatio === 'Custom'
                          ? '65%'
                          : activeRatio === '4:3'
                            ? '65%'
                            : '80%',
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] z-10"
                >
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className={[
                          i % 3 !== 2 ? 'border-r' : '',
                          i < 6 ? 'border-b' : '',
                          'border-white/20',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      />
                    ))}
                  </div>
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white" />
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Docs Section */}
      <section className="w-full py-24 sm:py-32 bg-[#0A0A0A] border-t border-zinc-800 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Documentation
            </h2>
            <p className="mt-6 text-lg/8 text-zinc-400">
              Comprehensive guides and references to help you extend Payload CMS with powerful image
              cropping capabilities.
            </p>
          </div>
          <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {DOCS_CATEGORIES.map((cat, index) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={cat.href}
                  className="group p-6 rounded border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-all flex flex-col items-start gap-3 h-full"
                >
                  <h3 className="font-medium text-white flex items-center gap-2">
                    {cat.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-400" />
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{cat.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded border border-[#666666] bg-[#111111] hover:bg-[#1a1a1a] text-[#cccccc] font-medium transition-colors text-sm"
            >
              View all documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section
        id="installation"
        className="w-full border-t border-zinc-800 bg-[#0A0A0A] py-24 sm:py-32 relative"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Quick Installation
            </h2>
            <p className="mt-6 text-lg/8 text-zinc-400 max-w-2xl mx-auto">
              Get up and running in minutes. Install the package and register the plugin in your
              Payload config.
            </p>
          </div>
          <div className="space-y-12">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">1. Install the package</h3>
              <Terminal code={installCode} title="Terminal" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">2. Register the plugin</h3>
              <p className="text-sm text-zinc-400 mb-4">Add it to your payload.config.ts</p>
              <Terminal code={setupCode} title="payload.config.ts" language="typescript" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">3. Add to a collection</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Use the cropImageField in your Media collection
              </p>
              <Terminal code={fieldCode} title="collections/Media.ts" language="typescript" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800 py-12 px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            Created by Bohdan Chornopolskyi. Open source under the MIT License.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/bohdanchornopolskyi/image-cropper-plugin"
              className="text-sm text-zinc-500 hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="https://github.com/bohdanchornopolskyi/image-cropper-plugin/issues"
              className="text-sm text-zinc-500 hover:text-white transition"
            >
              Issues
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
