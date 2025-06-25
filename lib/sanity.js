import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'jdj52ggb', // <-- replace this
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true
})