import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'template',
  title: 'Template',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'tagline',
      title: 'Tagline',
      description: 'One-liner shown on the listing card',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Demo URL',
      description: 'Link to the hosted Vercel demo site',
      type: 'url',
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      description: 'Enter 0 if this is a free template',
      type: 'number',
      validation: Rule => Rule.min(0),
    }),
    defineField({
      name: 'isFree',
      title: 'Free Template?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Luxury', value: 'Luxury' },
          { title: 'Residential', value: 'Residential' },
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Landing Page', value: 'Landing Page' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'techLabel',
      title: 'Tech Label',
      description: 'e.g. "Vibe Coded", "Next.js + Tailwind", "Webflow"',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Featured?',
      description: 'Pin this template to the top of the listing page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'highlights',
      title: 'Core Highlights / Features list',
      description: 'Short items to display as bullet checkmarks in the sidebar (e.g. "Full source code", "HMR ready")',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle || 'No category', media }
    },
  },
})
