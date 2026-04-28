'use client'

import { Highlight, themes } from 'prism-react-renderer'
import React from 'react'

import { CopyButton } from './CopyButton'

type Props = {
  code: string
  language?: string
  hasTitle?: boolean
}

export const Code: React.FC<Props> = ({ code, language = '', hasTitle = false }) => {
  if (!code) return null

  return (
    <Highlight code={code} language={language} theme={themes.vsDark}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <pre
          className={[
            'bg-zinc-900 border border-zinc-800 p-4 text-xs overflow-x-auto relative',
            hasTitle ? 'rounded-b-xl' : 'rounded-xl',
          ].join(' ')}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ className: 'table-row', line })}>
              <span className="table-cell select-none text-right text-white/25 pr-4">{i + 1}</span>
              <span className="table-cell">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
          <CopyButton code={code} />
        </pre>
      )}
    </Highlight>
  )
}
