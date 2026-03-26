import { defineType } from 'sanity';

export const htmlBlock = defineType({
  name: 'htmlBlock',
  title: 'Mã HTML (Embed)',
  type: 'object',
  fields: [
    {
      name: 'html',
      title: 'Mã HTML / Mã nhúng (Embed Code)',
      type: 'text',
      description: 'Dán mã HTML hoặc Embed Script từ Flourish, Datawrapper, v.v.',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      html: 'html',
    },
    prepare({ html }) {
      return {
        title: 'Mã HTML (Embed)',
        subtitle: html ? `${html.substring(0, 40)}...` : 'Chưa có mã HTML',
      };
    },
  },
});
