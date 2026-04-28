import React from 'react'

import { Code } from './Component.client'

export type CodeBlockProps = {
  code: string
  language?: string
  title?: string | null
  blockType: 'code'
}

type Props = CodeBlockProps & {
  className?: string
}

export const CodeBlock: React.FC<Props> = ({ className, code, language, title }) => {
  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      {title && (
        <div className="flex items-center px-4 py-2 border border-b-0 border-zinc-800 bg-zinc-900/50 rounded-t-xl">
          <span className="text-xs font-mono text-zinc-500 tracking-wider">{title}</span>
        </div>
      )}
      <Code code={code} language={language} hasTitle={!!title} />
    </div>
  )
}
