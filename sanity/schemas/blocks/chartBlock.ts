import { defineType } from 'sanity';

export const chartBlock = defineType({
  name: 'chartBlock',
  title: 'Chart Block',
  type: 'object',
  fields: [
    {
      name: 'chartType',
      title: 'Chart Type',
      type: 'string',
      options: {
        list: [
          { title: 'Bar Chart', value: 'bar' },
          { title: 'Line Chart', value: 'line' },
          { title: 'Area Chart', value: 'area' },
          { title: 'Scatter Plot', value: 'scatter' },
          { title: 'Pie / Donut Chart', value: 'pie' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    { name: 'title', title: 'Chart Title', type: 'string' },
    { name: 'caption', title: 'Caption / Source Note', type: 'string' },
    {
      name: 'dataSource',
      title: 'Data Source',
      type: 'object',
      fields: [
        {
          name: 'inline',
          title: 'Inline JSON (paste array here)',
          type: 'text',
          description: 'JSON array of objects, e.g. [{"x":"A","y":10},...]',
        },
        {
          name: 'url',
          title: 'External URL (CSV or JSON)',
          type: 'url',
          description: 'URL to a publicly accessible CSV or JSON file',
        },
      ],
    },
    { name: 'xField', title: 'X-axis Field Name', type: 'string' },
    { name: 'yField', title: 'Y-axis Field Name', type: 'string' },
    { name: 'colorField', title: 'Color Field Name (optional)', type: 'string' },
  ],
  preview: {
    select: { chartType: 'chartType', title: 'title' },
    prepare({ chartType, title }: { chartType: string; title: string }) {
      return {
        title: title ?? 'Chart Block',
        subtitle: chartType ? `Type: ${chartType}` : '',
      };
    },
  },
});
