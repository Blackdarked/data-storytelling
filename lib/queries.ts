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

export const allStoriesFullQuery = `
  *[_type == "story"] | order(publishedAt desc) {
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
      content,
      chartType,
      title,
      caption,
      dataSource,
      xField,
      yField,
      colorField,
      value,
      label,
      description,
      variant,
      tableData,
      headers,
      geoJsonUrl,
      valueField,
      locationField
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
      content,
      chartType,
      title,
      caption,
      dataSource,
      xField,
      yField,
      colorField,
      value,
      label,
      description,
      tableData,
      headers,
      geoJsonUrl,
      valueField,
      locationField
    }
  }
`;

export const allTagsQuery = `
  array::unique(*[_type == "story"].tags[])
`;

