import { defineType } from 'sanity';

export const tableBlock = defineType({
  name: 'tableBlock',
  title: 'Table Block',
  type: 'object',
  fields: [
    { name: 'title', title: 'Table Title', type: 'string' },
    { name: 'caption', title: 'Caption', type: 'string' },
    {
      name: 'headers',
      title: 'Column Headers',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'tableData',
      title: 'Table Data (JSON)',
      type: 'text',
      description: 'JSON array of row arrays, e.g. [["A","10"],["B","20"]]',
    },
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }: { title: string }) {
      return { title: title ?? 'Table Block' };
    },
  },
});
