'use client'

import { Check, Copy } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'

interface TerminalProps {
  code: string
  language?: string
  title?: string
}

const terminalTitles: Record<string, string> = {
  bash: 'Terminal',
  shell: 'Terminal',
  sh: 'Terminal',
  typescript: 'typescript',
  ts: 'typescript',
  javascript: 'javascript',
  js: 'javascript',
  json: 'json',
  tsx: 'tsx',
  jsx: 'jsx',
}

function getTerminalTitle(language: string, title?: string): string {
  if (title) return title
  return terminalTitles[language.toLowerCase()] ?? language
}

export function Terminal({ code, language = 'bash', title }: TerminalProps) {
  const displayTitle = getTerminalTitle(language, title)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-zinc-700" />
          <div className="w-3 h-3 rounded-full bg-zinc-700" />
          <div className="w-3 h-3 rounded-full bg-zinc-700" />
        </div>
        <div className="flex-1 text-center text-xs font-mono text-zinc-500 font-medium tracking-wider">
          {displayTitle}
        </div>
        <button
          onClick={handleCopy}
          className="text-zinc-500 hover:text-zinc-300 transition-colors"
          aria-label="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 sm:p-6 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed text-zinc-300">
          <code>{code}</code>
        </pre>
      </div>
    </motion.div>
  )
}
