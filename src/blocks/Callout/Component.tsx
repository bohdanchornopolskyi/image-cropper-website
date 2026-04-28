import { AlertTriangle, Info, Lightbulb, XCircle } from 'lucide-react'
import React from 'react'

type CalloutType = 'note' | 'tip' | 'warning' | 'danger'

const CONFIG: Record<
  CalloutType,
  { icon: React.ElementType; border: string; bg: string; iconColor: string; titleColor: string }
> = {
  note: {
    icon: Info,
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/5',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-300',
  },
  tip: {
    icon: Lightbulb,
    border: 'border-green-500/30',
    bg: 'bg-green-500/5',
    iconColor: 'text-green-400',
    titleColor: 'text-green-300',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/5',
    iconColor: 'text-yellow-400',
    titleColor: 'text-yellow-300',
  },
  danger: {
    icon: XCircle,
    border: 'border-red-500/30',
    bg: 'bg-red-500/5',
    iconColor: 'text-red-400',
    titleColor: 'text-red-300',
  },
}

export type CalloutBlockProps = {
  type: CalloutType
  title?: string | null
  content: string
  blockType: 'callout'
}

export const CalloutBlock: React.FC<CalloutBlockProps & { className?: string }> = ({
  type,
  title,
  content,
  className,
}) => {
  const cfg = CONFIG[type] ?? CONFIG.note
  const Icon = cfg.icon

  return (
    <div className={['rounded-lg border flex gap-3 p-4', cfg.border, cfg.bg, className].filter(Boolean).join(' ')}>
      <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${cfg.iconColor}`} />
      <div>
        {title && <p className={`font-medium text-sm mb-1 ${cfg.titleColor}`}>{title}</p>}
        <p className="text-sm text-zinc-400 leading-relaxed">{content}</p>
      </div>
    </div>
  )
}
