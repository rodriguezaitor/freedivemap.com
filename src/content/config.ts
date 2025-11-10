import { defineCollection, z } from 'astro:content';

// Destinations collection
const destinations = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.object({
      en: z.string(),
      es: z.string(),
    }),
    country: z.string(),
    city: z.string(),
    region: z.string(),
    description: z.object({
      en: z.string(),
      es: z.string(),
    }),
    image: z.string(),
  }),
});

// Regions collection (data)
const regions = defineCollection({
  type: 'data',
  schema: z.record(
    z.object({
      name: z.object({ en: z.string(), es: z.string() }),
      slug: z.string(),
      countries: z.record(
        z.object({
          name: z.object({ en: z.string(), es: z.string() }),
          slug: z.string(),
          cities: z.record(
            z.object({
              name: z.object({ en: z.string(), es: z.string() }),
              slug: z.string(),
            })
          ),
        })
      ),
    })
  ),
});

export const collections = {
  destinations,
  regions,
};

