import { defineConfig, type SchemaTypeDefinition } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas/story';

export default defineConfig({
  name: 'data-storytelling',
  title: 'Data Storytelling Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes as SchemaTypeDefinition[] },
});
