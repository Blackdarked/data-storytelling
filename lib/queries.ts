export const allStoriesQuery = `
  *[_type == "story"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    summary,
    tags,
    coverImage {
      asset-> { url }
    }
  }
`;

export const storyBySlugQuery = `
  *[_type == "story" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    summary,
    tags,
    coverImage {
      asset-> { url }
    },
    sections[] {
      _type,
      _key,
      // TextBlock
      content,
      // ChartBlock
      chartType,
      title,
      caption,
      dataSource,
      xField,
      yField,
      colorField,
      // CalloutBlock
      value,
      label,
      description,
      // TableBlock
      tableData,
      headers,
      // MapBlock
      geoJsonUrl,
      valueField,
      locationField
    }
  }
`;

export const allTagsQuery = `
  array::unique(*[_type == "story"].tags[])
`;
