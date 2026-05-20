import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'j94msrpk', // from your sanity.cli.ts
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-05-11', // use current date (YYYY-MM-DD) to target the latest API version
});

// Helper function for generating image URLs
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
