import { defineType } from 'sanity';

export const htmlBlock = defineType({
  name: 'htmlBlock',
  title: 'Mã HTML (Embed)',
  type: 'object',
  fields: [
    {
      name: 'embeds',
      title: 'Các mã nhúng HTML / Flourish',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Dán một hoặc nhiều mã nhúng HTML. Có thể dàn thành nhiều cột.',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'columns',
      title: 'Số cột hiển thị',
      type: 'number',
      initialValue: 1,
      options: { list: [1, 2, 3] },
      description: 'Nếu có nhiều hơn 1 mã nhúng, bạn có thể chọn hiển thị thành 2 hoặc 3 cột.',
    },
  ],
  preview: {
    select: {
      embeds: 'embeds',
    },
    prepare({ embeds }) {
      return {
        title: 'Mã HTML (Embed)',
        subtitle: embeds && embeds.length > 0 ? `Đã thêm ${embeds.length} mã nhúng` : 'Chưa có mã HTML',
      };
    },
  },
});
