import { defineType } from 'sanity';

export const calloutBlock = defineType({
  name: 'calloutBlock',
  title: 'Callout Block',
  type: 'object',
  fields: [
    { name: 'value', title: 'Big Number / Stat', type: 'string' },
    { name: 'label', title: 'Label', type: 'string' },
    { name: 'description', title: 'Supporting Text', type: 'text', rows: 2 },
    {
      name: 'variant',
      title: 'Visual Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Stat', value: 'stat' },
          { title: 'Quote', value: 'quote' },
          { title: 'Highlight', value: 'highlight' },
        ],
      },
      initialValue: 'stat',
    },
  ],
  preview: {
    select: { value: 'value', label: 'label' },
    prepare({ value, label }: { value: string; label: string }) {
      return { title: `${value ?? '—'} — ${label ?? 'Callout'}` };
    },
  },
});
