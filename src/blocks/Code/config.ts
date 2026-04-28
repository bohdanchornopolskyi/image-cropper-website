import type { Block } from 'payload'

export const Code: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      options: [
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TSX', value: 'tsx' },
        { label: 'JSX', value: 'jsx' },
        { label: 'Bash', value: 'bash' },
        { label: 'JSON', value: 'json' },
        { label: 'CSS', value: 'css' },
        { label: 'HTML', value: 'html' },
        { label: 'Markdown', value: 'markdown' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        placeholder: 'e.g. payload.config.ts',
      },
    },
    {
      name: 'code',
      type: 'code',
      label: false,
      required: true,
    },
  ],
}
