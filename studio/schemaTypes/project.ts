import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Client Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Niche/Category',
      description: 'e.g. "B2B SaaS Lead Gen", "High-Ticket Real Estate"',
      type: 'string',
    }),
    defineField({
      name: 'metrics',
      title: 'Hero Metrics / ROI',
      description: 'e.g. "+340% Pipeline Growth", "12x ROAS"',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Showcase Image',
      description: 'Wide cinematic cover image (recommended aspect ratio 21:9 or 16:9)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'screenshots',
      title: 'Additional Screenshots / Slider Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Detailed Case Study',
      type: 'blockContent',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Website URL',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
  ],
})
