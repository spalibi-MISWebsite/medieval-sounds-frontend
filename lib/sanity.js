import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  // uncomment the following lines if you want to test locally
  //projectId: 'jdj52ggb',
  //dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true
});