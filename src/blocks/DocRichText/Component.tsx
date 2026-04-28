import RichText from '@/components/RichText'

export type DocRichTextBlockProps = {
  content: Parameters<typeof RichText>[0]['data']
  blockType: 'richText'
}

export const DocRichTextBlock = ({ content }: DocRichTextBlockProps) => {
  if (!content) return null
  return <RichText data={content} enableGutter={false} enableProse={true} />
}
