import { defineType } from 'sanity';
import { textBlock } from './blocks/textBlock';
import { chartBlock } from './blocks/chartBlock';
import { calloutBlock } from './blocks/calloutBlock';
import { tableBlock } from './blocks/tableBlock';
import { mapBlock } from './blocks/mapBlock';

export const story = defineType({
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Used in story cards and previews.',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'sections',
      title: 'Story Sections',
      type: 'array',
      of: [
        { type: 'textBlock', name: 'textBlock', title: 'Text' },
        { type: 'chartBlock', name: 'chartBlock', title: 'Chart' },
        { type: 'calloutBlock', name: 'calloutBlock', title: 'Callout / Stat' },
        { type: 'tableBlock', name: 'tableBlock', title: 'Table' },
        { type: 'mapBlock', name: 'mapBlock', title: 'Map' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' },
  },
});

export const schemaTypes = [story, textBlock, chartBlock, calloutBlock, tableBlock, mapBlock];
