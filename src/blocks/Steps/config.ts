import type { Block } from 'payload'

export const Steps: Block = {
  slug: 'steps',
  interfaceName: 'StepsBlock',
  fields: [
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'code',
          type: 'code',
          admin: {
            language: 'typescript',
          },
        },
        {
          name: 'language',
          type: 'select',
          defaultValue: 'bash',
          options: [
            { label: 'TypeScript', value: 'typescript' },
            { label: 'JavaScript', value: 'javascript' },
            { label: 'Bash', value: 'bash' },
            { label: 'JSON', value: 'json' },
          ],
        },
      ],
    },
  ],
}
