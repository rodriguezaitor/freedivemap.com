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
    schools: z.array(z.object({
      name: z.string(),
      url: z.string().optional(),
      description: z.object({ en: z.string(), es: z.string() }),
      priceRange: z.string().optional(),
      certifications: z.array(z.string()).optional(),
      instructor: z.string().optional(),
    })).optional(),
    diveSites: z.array(z.object({
      name: z.string(),
      description: z.object({ en: z.string(), es: z.string() }),
      depth: z.string().optional(),
      distance: z.string().optional(),
      level: z.string().optional(),
    })).optional(),
    seasonalInfo: z.array(z.object({
      season: z.object({ en: z.string(), es: z.string() }),
      months: z.string(),
      waterTemp: z.string(),
      visibility: z.string(),
      highlights: z.object({ en: z.string(), es: z.string() }),
    })).optional(),
    faq: z.array(z.object({
      question: z.object({ en: z.string(), es: z.string() }),
      answer: z.object({ en: z.string(), es: z.string() }),
    })).optional(),
  }),
});

export const collections = {
  regions,
  destinations,
};

