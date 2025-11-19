import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

// Regions collection - using file() loader for the JSON file
const regions = defineCollection({
  loader: file('src/content/regions.json', {
    parser: (text) => {
      const data = JSON.parse(text);
      // Transform the nested object structure into an array of entries
      return Object.entries(data).map(([id, region]: [string, any]) => ({
        id,
        ...region,
      }));
    },
  }),
  schema: z.object({
    id: z.string(),
    name: z.object({
      en: z.string(),
      es: z.string(),
    }),
    slug: z.string(),
    description: z.object({
      en: z.string(),
      es: z.string(),
    }).optional(),
    content: z.object({
      en: z.string(),
      es: z.string(),
    }).optional(),
    countries: z.record(
      z.object({
        name: z.object({
          en: z.string(),
          es: z.string(),
        }),
        slug: z.string(),
        content: z.object({
          en: z.string(),
          es: z.string(),
        }).optional(),
        provinces: z.record(
          z.object({
            name: z.object({
              en: z.string(),
              es: z.string(),
            }),
            slug: z.string(),
            content: z.object({
              en: z.string(),
              es: z.string(),
            }).optional(),
            cities: z.record(
              z.object({
                name: z.object({
                  en: z.string(),
                  es: z.string(),
                }),
                slug: z.string(),
              })
            ),
          })
        ).optional(),
        cities: z.record(
          z.object({
            name: z.object({
              en: z.string(),
              es: z.string(),
            }),
            slug: z.string(),
          })
        ).optional(),
      })
    ),
  }),
});

// Destinations collection - using glob() loader for markdown files
const destinations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/destinations' }),
  schema: z.object({
    name: z.object({
      en: z.string(),
      es: z.string(),
    }),
    country: z.string(),
    province: z.string().optional(),
    city: z.string(),
    region: z.string(),
    description: z.object({
      en: z.string(),
      es: z.string(),
    }),
    image: z.string().optional(),
    content: z.object({
      en: z.string().optional(),
      es: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  regions,
  destinations,
};

