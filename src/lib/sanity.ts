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

// In-memory cache for query results
const queryCache = new Map<string, { data: any; timestamp: number }>();
const pendingQueries = new Map<string, Promise<any>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const fetchWithCache = async (query: string, params: Record<string, any> = {}) => {
  const cacheKey = JSON.stringify({ query, params });
  const cached = queryCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  let promise = pendingQueries.get(cacheKey);
  if (!promise) {
    promise = sanityClient.fetch(query, params);
    pendingQueries.set(cacheKey, promise);
  }

  try {
    const data = await promise;
    queryCache.set(cacheKey, { data, timestamp: Date.now() });
    pendingQueries.delete(cacheKey);
    return data;
  } catch (error) {
    pendingQueries.delete(cacheKey);
    throw error;
  }
};

export const prefetchQuery = (query: string, params: Record<string, any> = {}) => {
  const cacheKey = JSON.stringify({ query, params });
  if (queryCache.has(cacheKey) || pendingQueries.has(cacheKey)) return;

  const promise = sanityClient.fetch(query, params);
  pendingQueries.set(cacheKey, promise);
  promise.then((data) => {
    queryCache.set(cacheKey, { data, timestamp: Date.now() });
    pendingQueries.delete(cacheKey);
  }).catch(() => {
    pendingQueries.delete(cacheKey);
  });
};

