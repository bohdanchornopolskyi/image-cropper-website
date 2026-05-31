import {
  bulletList,
  calloutBlock,
  codeBlock,
  heading,
  paragraph,
  richTextBlock,
  stepsBlock,
} from './helpers'

type DocBlock =
  | ReturnType<typeof richTextBlock>
  | ReturnType<typeof codeBlock>
  | ReturnType<typeof calloutBlock>
  | ReturnType<typeof stepsBlock>

type DocPageSeed = {
  title: string
  slug: string
  categorySlug: string
  order: number
  description?: string
  content: DocBlock[]
}

export const docPages: DocPageSeed[] = [
  {
    title: 'Image Cropper for Payload CMS',
    slug: 'introduction',
    categorySlug: 'overview',
    order: 0,
    description:
      'A Payload CMS 3.x plugin that adds interactive image cropping to your collections.',
    content: [
      richTextBlock(
        paragraph(
          'A Payload CMS 3.x plugin that adds interactive image cropping to your collections. Define crop presets per field, let editors crop in a modal, and automatically generate optimized variants with Sharp — stored locally or on S3.',
        ),
        heading('What you get', 'h2'),
        bulletList([
          'Interactive crop modal with aspect ratio constraints (react-image-crop)',
          'Multiple crop presets per field — desktop, mobile, social, etc.',
          'Multi-size crops — one crop selection generates several output sizes for responsive images',
          'Server-side image generation — WebP, JPEG, or PNG via Sharp',
          'S3 / cloud storage — built-in upload and automatic cleanup',
          'Frontend helpers — getCropUrl and resolveMediaCrop',
          'TypeScript-first — full types exported',
        ]),
        heading('When to use it', 'h2'),
        paragraph(
          'Use this plugin when editors need to control how images are cropped for different layouts (hero, card, thumbnail) without manually exporting files in Photoshop or cropping separately per breakpoint.',
        ),
      ),
    ],
  },
  {
    title: 'Requirements',
    slug: 'requirements',
    categorySlug: 'getting-started',
    order: 0,
    content: [
      richTextBlock(
        heading('Requirements', 'h2'),
        bulletList([
          'Payload CMS — ^3.80.0',
          'React — ^18.0.0 or ^19.0.0',
          'Sharp — ^0.33.0 (peer dependency — install in your project)',
          'Node.js — ^18.20.2 or >=20.9.0',
        ]),
      ),
      calloutBlock(
        'Sharp must be installed in your project separately. Payload uses it for image processing.',
        'note',
      ),
    ],
  },
  {
    title: 'Installation',
    slug: 'installation',
    categorySlug: 'getting-started',
    order: 1,
    content: [
      stepsBlock([
        {
          title: 'Install the plugin',
          code: 'pnpm add payload-plugin-image-cropper',
          language: 'bash',
        },
        {
          title: 'Install Sharp',
          description: 'Sharp is a peer dependency:',
          code: 'pnpm add sharp',
          language: 'bash',
        },
        {
          title: 'Register Sharp in Payload config',
          description: 'Pass Sharp to your Payload config so crop generation can use it:',
          code: `import sharp from 'sharp'

export default buildConfig({
  sharp,
  // ...
})`,
          language: 'typescript',
        },
        {
          title: 'Continue to Setup',
          description:
            'Next, add the plugin to payload.config.ts and define crop fields on your collections. See Local Filesystem Storage or S3 / Cloud Storage depending on how you store media.',
        },
        {
          title: 'Or with npm',
          code: 'npm install payload-plugin-image-cropper',
          language: 'bash',
        },
      ]),
    ],
  },
  {
    title: 'Quick Start',
    slug: 'quick-start',
    categorySlug: 'getting-started',
    order: 2,
    description: 'Minimal setup in four steps.',
    content: [
      richTextBlock(paragraph('Minimal setup in four steps.')),
      stepsBlock([
        {
          title: 'Add the plugin',
          code: `import path from 'path'
import { buildConfig } from 'payload'
import { cropImagePlugin } from 'payload-plugin-image-cropper'
import sharp from 'sharp'

export default buildConfig({
  sharp,
  collections: [
    {
      slug: 'media',
      upload: {
        staticDir: 'public/media',
      },
      fields: [],
    },
  ],
  plugins: [
    cropImagePlugin({
      mediaDir: path.join(process.cwd(), 'public/media'),
    }),
  ],
})`,
          language: 'typescript',
        },
        {
          title: 'Add a crop field to a collection',
          code: `import { cropImageField } from 'payload-plugin-image-cropper'

{
  slug: 'posts',
  fields: [
    cropImageField({
      name: 'heroImage',
      label: 'Hero Image',
      crops: [
        {
          name: 'desktop',
          label: 'Desktop (16:9)',
          width: 1920,
          height: 1080,
          aspectRatio: 16 / 9,
        },
      ],
    }),
  ],
}`,
          language: 'typescript',
        },
        {
          title: 'Crop in the admin',
          description:
            'Open a Post in the admin panel. Select or upload an image in the Hero Image field. Click Crop to open the modal. Adjust the crop region and save the document.',
        },
        {
          title: 'Use the crop URL in your frontend',
          code: `import { getCropUrl } from 'payload-plugin-image-cropper/utilities'

const url = getCropUrl(post.heroImage, 'desktop')`,
          language: 'typescript',
        },
      ]),
    ],
  },
  {
    title: 'Local Filesystem Storage',
    slug: 'setup/local-storage',
    categorySlug: 'setup',
    order: 0,
    description: 'Use this when your media collection stores files on disk (default Payload upload behavior).',
    content: [
      stepsBlock([
        {
          title: 'Configure your media collection',
          description: 'Set staticDir on the upload collection:',
          code: `{
  slug: 'media',
  upload: {
    staticDir: 'public/media',
  },
  fields: [],
}`,
          language: 'typescript',
        },
        {
          title: 'Add the plugin with matching mediaDir',
          description:
            'mediaDir must be an absolute path pointing to the same directory as staticDir.',
          code: `import path from 'path'
import { cropImagePlugin } from 'payload-plugin-image-cropper'

cropImagePlugin({
  mediaCollectionSlug: 'media',
  mediaDir: path.join(process.cwd(), 'public/media'),
})`,
          language: 'typescript',
        },
        {
          title: 'Serve crop files',
          description:
            'Generated crops are written to the same directory as source media. If staticDir is public/media, crop URLs look like /media/photo-crop-desktop-....webp and are served like any other upload.',
        },
        {
          title: 'Add crop fields',
          description: 'See Single-Size Crops or Multi-Size Crops for field configuration.',
        },
      ]),
      calloutBlock(
        'Always use process.cwd() for mediaDir, not __dirname or import.meta.url. Payload resolves staticDir relative to the working directory, not the config file location.',
        'warning',
        'Important',
      ),
    ],
  },
  {
    title: 'S3 & Cloud Storage',
    slug: 'setup/s3-storage',
    categorySlug: 'setup',
    order: 1,
    description:
      'Use this when media is stored with @payloadcms/storage-s3 (AWS S3, DigitalOcean Spaces, MinIO, etc.).',
    content: [
      stepsBlock([
        {
          title: 'Install S3 storage adapter',
          code: 'pnpm add @payloadcms/storage-s3',
          language: 'bash',
        },
        {
          title: 'Configure environment variables',
          description: 'Example .env:',
          code: `S3_BUCKET=your-bucket
S3_REGION=us-east-1
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key
S3_ENDPOINT=                    # omit for AWS; required for DO Spaces / MinIO
S3_PREFIX=media
CDN_ENDPOINT=https://cdn.example.com`,
          language: 'bash',
        },
        {
          title: 'Add s3Storage to Payload plugins',
          code: `import { s3Storage } from '@payloadcms/storage-s3'

s3Storage({
  acl: 'public-read',
  bucket: process.env.S3_BUCKET,
  collections: {
    media: {
      generateFileURL: ({ filename, prefix }) => {
        return [process.env.CDN_ENDPOINT, prefix, filename].filter(Boolean).join('/')
      },
      prefix: process.env.S3_PREFIX,
    },
  },
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: false,
    region: process.env.S3_REGION,
  },
})`,
          language: 'typescript',
        },
        {
          title: 'Add the crop plugin with matching S3 config',
          description:
            'Copy the same bucket, config, acl, and prefix from s3Storage. The plugin uploads crops on save and deletes them when source media is removed.',
          code: `import { cropImagePlugin } from 'payload-plugin-image-cropper'

cropImagePlugin({
  mediaCollectionSlug: 'media',
  mediaDir: path.join(process.cwd(), 'public/media'),
  s3: {
    acl: 'public-read',
    bucket: process.env.S3_BUCKET,
    config: {
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
      endpoint: process.env.S3_ENDPOINT,
      forcePathStyle: false,
      region: process.env.S3_REGION,
    },
    prefix: process.env.S3_PREFIX,
    generateUrl: ({ filename, prefix }) => {
      return [process.env.CDN_ENDPOINT, prefix, filename].filter(Boolean).join('/')
    },
  },
})`,
          language: 'typescript',
        },
        {
          title: 'disableLocalStorage: true (optional)',
          description:
            'If you disable local storage entirely, the plugin fetches the source image from its URL automatically. In that case mediaDir is unused for reading source files, but you may still pass it for consistency.',
        },
      ]),
      calloutBlock('generateUrl uses the same logic as generateFileURL in s3Storage.', 'note'),
      richTextBlock(
        heading('What happens on save and delete', 'h2'),
        bulletList([
          'On save: Each crop is uploaded via PutObject to your bucket.',
          'On media delete: All associated crop files are removed via ListObjects + DeleteObject.',
        ]),
      ),
    ],
  },
  {
    title: 'createCropImage',
    slug: 'setup/create-crop-image',
    categorySlug: 'setup',
    order: 2,
    description:
      'If your media collection uses a non-default slug (e.g. files instead of media), use createCropImage so the plugin and fields always target the same collection.',
    content: [
      stepsBlock([
        {
          title: 'Create plugin + field factory once',
          code: `import { createCropImage } from 'payload-plugin-image-cropper'

const { plugin, field } = createCropImage({
  mediaCollectionSlug: 'files',
  mediaDir: path.join(process.cwd(), 'public/files'),
})`,
          language: 'typescript',
        },
        {
          title: 'Register the plugin',
          code: 'plugins: [plugin]',
          language: 'typescript',
        },
        {
          title: 'Use field() in collections',
          code: `field({
  name: 'heroImage',
  label: 'Hero Image',
  crops: [/* ... */],
})`,
          language: 'typescript',
        },
      ]),
      calloutBlock(
        'This avoids setting mediaCollectionSlug in two places — a mismatch causes silent 404s at crop generation time.',
        'warning',
      ),
    ],
  },
  {
    title: 'Single-Size Crops',
    slug: 'usage/single-size-crops',
    categorySlug: 'usage',
    order: 0,
    description:
      'A single-size crop produces one output file per preset. Use this when each layout needs its own crop region (e.g. desktop hero vs mobile hero).',
    content: [
      stepsBlock([
        {
          title: 'Define crops with width and height',
          code: `import { cropImageField } from 'payload-plugin-image-cropper'

cropImageField({
  name: 'heroImage',
  label: 'Hero Image',
  crops: [
    {
      name: 'desktop',
      label: 'Desktop (16:9)',
      width: 1920,
      height: 1080,
      aspectRatio: 16 / 9,
      format: 'webp',
      quality: 85,
    },
    {
      name: 'mobile',
      label: 'Mobile (4:5)',
      width: 828,
      height: 1035,
      aspectRatio: 4 / 5,
    },
  ],
})`,
          language: 'typescript',
        },
        {
          title: 'Understand each option',
          description:
            'name — machine-readable key stored in cropData and generatedUrls. label — tab label shown in the crop modal. width / height — output dimensions in pixels. aspectRatio — constrains the crop handle (e.g. 16 / 9). format — webp (default), jpeg, or png. quality — Sharp quality 1–100 (default 80; ignored for PNG).',
        },
        {
          title: 'Editor workflow',
          description:
            'Select or upload a source image. Open the crop modal — each crop appears as a tab. Adjust the region for each preset. Save the document — Sharp generates one file per crop.',
        },
        {
          title: 'Read URLs in the frontend',
          code: `import { getCropUrl, resolveMediaCrop } from 'payload-plugin-image-cropper/utilities'

const desktopUrl = getCropUrl(post.heroImage, 'desktop')
const mobileUrl = getCropUrl(post.heroImage, 'mobile')
const media = resolveMediaCrop(post.heroImage, 'mobile')`,
          language: 'typescript',
        },
      ]),
      calloutBlock(
        'If no crop exists yet, getCropUrl falls back to the original image URL.',
        'tip',
      ),
    ],
  },
  {
    title: 'Multi-Size Crops',
    slug: 'usage/multi-size-crops',
    categorySlug: 'usage',
    order: 1,
    description:
      'Multi-size crops let editors crop once and generate multiple resolutions from the same region — ideal for responsive card images.',
    content: [
      stepsBlock([
        {
          title: 'Use sizes instead of width / height',
          code: `cropImageField({
  name: 'cardImage',
  label: 'Card Image',
  crops: [
    {
      name: 'card',
      label: 'Card (16:9)',
      aspectRatio: 16 / 9,
      sizes: [
        { name: 'lg', label: 'Large (desktop)', width: 1200, height: 675 },
        { name: 'md', label: 'Medium (tablet)', width: 768, height: 432 },
        { name: 'sm', label: 'Small (mobile)', width: 390, height: 219 },
      ],
    },
  ],
})`,
          language: 'typescript',
        },
        {
          title: 'Understand compound keys',
          description:
            'URLs are stored as {cropName}.{sizeName}: card.lg, card.md, card.sm. width/height and sizes are mutually exclusive on a crop definition.',
        },
        {
          title: 'Read URLs in the frontend',
          code: `const lgUrl = getCropUrl(post.cardImage, 'card', 'lg')
const mdUrl = getCropUrl(post.cardImage, 'card', 'md')
const smUrl = getCropUrl(post.cardImage, 'card', 'sm')

// Shorthand — equivalent to above
const lgUrl = getCropUrl(post.cardImage, 'card.lg')`,
          language: 'typescript',
        },
        {
          title: 'Responsive HTML',
          code: `<picture>
  <source media="(min-width: 1024px)" srcset={lgUrl} />
  <source media="(min-width: 640px)" srcset={mdUrl} />
  <img src={smUrl} alt="Card image" />
</picture>`,
          language: 'typescript',
        },
        {
          title: 'Next.js Image with custom loader',
          code: `import Image from 'next/image'
import { getCropUrl } from 'payload-plugin-image-cropper/utilities'

function cardImageLoader({ width }: { width: number }) {
  if (width <= 390) return getCropUrl(post.cardImage, 'card', 'sm')
  if (width <= 768) return getCropUrl(post.cardImage, 'card', 'md')
  return getCropUrl(post.cardImage, 'card', 'lg')
}

<Image
  loader={cardImageLoader}
  src={getCropUrl(post.cardImage, 'card', 'lg')}
  alt="Card"
  width={1200}
  height={675}
  sizes="(max-width: 390px) 390px, (max-width: 768px) 768px, 1200px"
/>`,
          language: 'typescript',
        },
      ]),
    ],
  },
  {
    title: 'Using the Admin UI',
    slug: 'usage/admin-workflow',
    categorySlug: 'usage',
    order: 2,
    description: 'Step-by-step guide for editors using the crop modal.',
    content: [
      richTextBlock(heading('Step-by-step for editors', 'h2')),
      stepsBlock([
        {
          title: 'Open a document with a crop field',
          description: 'Open a document that has a crop field (e.g. a Post).',
        },
        {
          title: 'Choose a source image',
          description: 'Upload new media or pick from the media library.',
        },
        {
          title: 'Open the crop modal',
          description: 'Click Crop — the modal opens with tabs for each crop preset.',
        },
        {
          title: 'Adjust each preset',
          description:
            'Drag and resize the crop region. Aspect ratio is locked when configured.',
        },
        {
          title: 'Preview and save',
          description:
            'Generated previews appear after save. Save the document — crops are processed server-side and URLs are stored automatically.',
        },
      ]),
      richTextBlock(
        heading('Re-cropping', 'h2'),
        paragraph(
          'Change the source image or open the crop modal again and adjust regions. On save, new files are generated and URLs updated.',
        ),
        heading('Custom admin import (advanced)', 'h2'),
        paragraph('If you customize the admin bundle:'),
      ),
      codeBlock(
        "import { CropImageField } from 'payload-plugin-image-cropper/client'",
        'typescript',
      ),
    ],
  },
  {
    title: 'Data Shape',
    slug: 'data-shape',
    categorySlug: 'reference',
    order: 0,
    description: 'Structure of data stored by cropImageField.',
    content: [
      richTextBlock(
        paragraph('Each cropImageField stores a group with three sub-fields:'),
        heading('Single-size example', 'h2'),
      ),
      codeBlock(
        `{
  heroImage: {
    image: '64abc...',
    cropData: {
      desktop: { x: 5, y: 10, width: 90, height: 80 },
      mobile:  { x: 20, y: 0, width: 60, height: 100 },
    },
    generatedUrls: {
      desktop: '/media/photo-crop-desktop-5-10-90x80-1920x1080.webp',
      mobile:  '/media/photo-crop-mobile-20-0-60x100-828x1035.webp',
    },
  }
}`,
        'json',
      ),
      richTextBlock(heading('Multi-size example', 'h2')),
      codeBlock(
        `{
  cardImage: {
    image: '64abc...',
    cropData: {
      card: { x: 0, y: 12, width: 100, height: 75 },
    },
    generatedUrls: {
      'card.lg': '/media/photo-crop-card-0-12-100x75-1200x675.webp',
      'card.md': '/media/photo-crop-card-0-12-100x75-768x432.webp',
      'card.sm': '/media/photo-crop-card-0-12-100x75-390x219.webp',
    },
  }
}`,
        'json',
      ),
      calloutBlock(
        'Coordinates in cropData are percent-based (0–100), as produced by react-image-crop.',
        'note',
      ),
    ],
  },
  {
    title: 'How It Works',
    slug: 'how-it-works',
    categorySlug: 'reference',
    order: 1,
    content: [
      richTextBlock(
        bulletList([
          'Editor selects or uploads media in the crop field.',
          'They open the crop modal and define a region for each preset.',
          'On save, the field calls POST /api/{mediaCollectionSlug}/generate-crop once per output size.',
          'Sharp extracts, resizes, and encodes each crop to the configured format.',
          'Files are written to disk or uploaded to S3.',
          'Public URLs are saved in generatedUrls.',
          'When source media is deleted, associated crop files are removed automatically.',
        ]),
      ),
    ],
  },
]

export const docCategories = [
  { title: 'Overview', slug: 'overview', order: 0 },
  { title: 'Getting Started', slug: 'getting-started', order: 1 },
  { title: 'Setup', slug: 'setup', order: 2 },
  { title: 'Usage', slug: 'usage', order: 3 },
  { title: 'Reference', slug: 'reference', order: 4 },
]
