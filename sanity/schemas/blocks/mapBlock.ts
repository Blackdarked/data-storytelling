import { defineType } from 'sanity';

export const mapBlock = defineType({
  name: 'mapBlock',
  title: 'Map Block',
  type: 'object',
  fields: [
    { name: 'title', title: 'Map Title', type: 'string' },
    {
      name: 'geoJsonUrl',
      title: 'GeoJSON URL',
      type: 'url',
      description: 'URL to a GeoJSON FeatureCollection',
    },
    {
      name: 'dataUrl',
      title: 'Data URL (CSV/JSON)',
      type: 'url',
      description: 'URL to data rows that join to GeoJSON by location field',
    },
    { name: 'locationField', title: 'Location Field (join key)', type: 'string' },
    { name: 'valueField', title: 'Value Field (for choropleth)', type: 'string' },
    { name: 'caption', title: 'Caption', type: 'string' },
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }: { title: string }) {
      return { title: title ?? 'Map Block' };
    },
  },
});
