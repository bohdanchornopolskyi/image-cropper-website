type LexicalText = {
  type: 'text'
  detail: number
  format: number
  mode: 'normal'
  style: string
  text: string
  version: 1
}

type LexicalNode =
  | {
      type: 'paragraph' | 'heading'
      children: LexicalText[]
      direction: 'ltr'
      format: string
      indent: number
      version: 1
      tag?: 'h2' | 'h3' | 'h4'
    }
  | {
      type: 'list'
      children: {
        type: 'listitem'
        children: LexicalText[]
        direction: 'ltr'
        format: string
        indent: number
        value: number
        version: 1
      }[]
      direction: 'ltr'
      format: string
      indent: number
      listType: 'bullet' | 'number'
      start: number
      tag: 'ul' | 'ol'
      version: 1
    }

const text = (value: string, format = 0): LexicalText => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text: value,
  version: 1,
})

export const lexicalRoot = (children: LexicalNode[]) => ({
  root: {
    type: 'root' as const,
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

export const paragraph = (...parts: (string | { text: string; bold?: boolean })[]) => ({
  type: 'paragraph' as const,
  children: parts.map((part) =>
    typeof part === 'string' ? text(part) : text(part.text, part.bold ? 1 : 0),
  ),
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1 as const,
})

export const heading = (value: string, tag: 'h2' | 'h3' | 'h4' = 'h2') => ({
  type: 'heading' as const,
  children: [text(value)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  tag,
  version: 1 as const,
})

export const bulletList = (items: string[]) => ({
  type: 'list' as const,
  children: items.map((item, index) => ({
    type: 'listitem' as const,
    children: [text(item)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    value: index + 1,
    version: 1 as const,
  })),
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  listType: 'bullet' as const,
  start: 1,
  tag: 'ul' as const,
  version: 1 as const,
})

export const richTextBlock = (...nodes: LexicalNode[]) => ({
  blockType: 'richText' as const,
  content: lexicalRoot(nodes),
})

type CodeLanguage = 'typescript' | 'javascript' | 'tsx' | 'jsx' | 'bash' | 'json' | 'css' | 'html' | 'markdown'

export const codeBlock = (code: string, language: CodeLanguage = 'typescript', title?: string) => ({
  blockType: 'code' as const,
  code,
  language,
  ...(title ? { title } : {}),
})

export const calloutBlock = (
  content: string,
  type: 'note' | 'tip' | 'warning' | 'danger' = 'note',
  title?: string,
) => ({
  blockType: 'callout' as const,
  type,
  content,
  ...(title ? { title } : {}),
})

type StepLanguage = 'typescript' | 'javascript' | 'bash' | 'json'

type StepInput = {
  title: string
  description?: string
  code?: string
  language?: StepLanguage
}

export const stepsBlock = (steps: StepInput[]) => ({
  blockType: 'steps' as const,
  steps,
})
