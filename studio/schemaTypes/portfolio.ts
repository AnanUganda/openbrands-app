import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      description: 'Leave empty for in-house or demo work',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: 'e.g. "High-Ticket Real Estate", "B2B SaaS Lead Gen", "Landing Page"',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'One-liner shown on the listing card',
      type: 'string',
    }),
    defineField({
      name: 'metrics',
      title: 'Headline Result',
      description: 'e.g. "+340% Pipeline Growth", "12x ROAS"',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Showcase Image',
      description: 'Wide cover image (recommended aspect ratio 16:9 or 21:9)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'screenshots',
      title: 'Additional Screenshots',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'description',
      title: 'Case Study',
      type: 'blockContent',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      description: 'Short bullet items shown as checkmarks in the sidebar',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'techLabel',
      title: 'Tech Label',
      description: 'e.g. "React + Vite", "Next.js + Tailwind", "Webflow"',
      type: 'string',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Website URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured?',
      description: 'Pin this item to the top of the portfolio page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  orderings: [
    {
      title: 'Featured, then newest',
      name: 'featuredDesc',
      by: [
        {field: 'featured', direction: 'desc'},
        {field: 'publishedAt', direction: 'desc'},
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      category: 'category',
      client: 'clientName',
      media: 'mainImage',
    },
    prepare({title, category, client, media}) {
      return {
        title,
        subtitle: [client, category].filter(Boolean).join(' · ') || 'No category',
        media,
      }
    },
  },
})
