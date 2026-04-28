import React from 'react'

import { Terminal } from '@/components/Terminal'

type Step = {
  title: string
  description?: string | null
  code?: string | null
  language?: string | null
}

export type StepsBlockProps = {
  steps: Step[]
  blockType: 'steps'
}

export const StepsBlock: React.FC<StepsBlockProps & { className?: string }> = ({ steps, className }) => {
  return (
    <ol className={['space-y-10', className].filter(Boolean).join(' ')}>
      {steps.map((step, index) => (
        <li key={index} className="flex gap-5">
          <div className="flex flex-col items-center">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold text-zinc-300">
              {index + 1}
            </span>
            {index < steps.length - 1 && <div className="mt-2 flex-1 w-px bg-zinc-800" />}
          </div>
          <div className="flex-1 pb-2">
            <h3 className="text-base font-medium text-white mb-2">{step.title}</h3>
            {step.description && <p className="text-sm text-zinc-400 leading-relaxed mb-4">{step.description}</p>}
            {step.code && (
              <Terminal code={step.code} language={step.language ?? 'bash'} />
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
