import { defineType } from 'sanity';

export const imageRowBlock = defineType({
  name: 'imageRowBlock',
  title: 'Hàng ảnh (Nhiều ảnh)',
  type: 'object',
  fields: [
    {
      name: 'images',
      title: 'Danh sách ảnh',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Mô tả ảnh (Alt Text)',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Chú thích',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'columns',
      title: 'Số cột hiển thị',
      type: 'number',
      initialValue: 2,
      options: {
        list: [
          { title: '1 Cột', value: 1 },
          { title: '2 Cột', value: 2 },
          { title: '3 Cột', value: 3 },
          { title: '4 Cột', value: 4 },
        ],
      },
    },
    {
      name: 'gap',
      title: 'Khoảng cách giữa các ảnh',
      type: 'string',
      initialValue: 'md',
      options: {
        list: [
          { title: 'Nhỏ', value: 'sm' },
          { title: 'Vừa', value: 'md' },
          { title: 'Lớn', value: 'lg' },
        ],
      },
    },
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({ images }) {
      const count = images ? images.length : 0;
      return {
        title: `Hàng ảnh (${count} ảnh)`,
        subtitle: 'Bố cục lưới nhiều ảnh',
      };
    },
  },
});
