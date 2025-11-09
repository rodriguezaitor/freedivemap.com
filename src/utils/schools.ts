import regionsData from '../data/regions.json';

export interface Region {
  name: {
    en: string;
    es: string;
  };
  slug: string;
  countries: Record<string, Country>;
}

export interface Country {
  name: {
    en: string;
    es: string;
  };
  slug: string;
  cities: Record<string, City>;
}

export interface City {
  name: {
    en: string;
    es: string;
  };
  slug: string;
}

// Handle both default export and direct import for Cloudflare Workers compatibility
// In Cloudflare Workers, JSON imports may be wrapped in a default property
const regionsObj = (regionsData as any)?.default || regionsData || {};

// Cast to proper type - Cloudflare Workers should handle this correctly
export const regions: Record<string, Region> = regionsObj as Record<string, Region>;

export function getRegionBySlug(slug: string): Region | undefined {
  return regions[slug];
}

export function getCountryBySlug(regionSlug: string, countrySlug: string): Country | undefined {
  const region = regions[regionSlug];
  if (!region) return undefined;
  return region.countries[countrySlug];
}

export function getCityBySlug(regionSlug: string, countrySlug: string, citySlug: string): City | undefined {
  const country = getCountryBySlug(regionSlug, countrySlug);
  if (!country) return undefined;
  return country.cities[citySlug];
}

export function generateRegionUrl(locale: string, regionSlug: string): string {
  return `/${locale}/${regionSlug}/`;
}

export function generateCountryUrl(locale: string, regionSlug: string, countrySlug: string): string {
  return `/${locale}/${regionSlug}/${countrySlug}/`;
}

export function generateCityUrl(locale: string, regionSlug: string, countrySlug: string, citySlug: string): string {
  return `/${locale}/${regionSlug}/${countrySlug}/${citySlug}/`;
}

export function getAllCountries(): Array<{ region: string; country: string; name: { en: string; es: string } }> {
  const result: Array<{ region: string; country: string; name: { en: string; es: string } }> = [];
  
  Object.entries(regions).forEach(([regionSlug, region]) => {
    Object.entries(region.countries).forEach(([countrySlug, country]) => {
      result.push({
        region: regionSlug,
        country: countrySlug,
        name: country.name
      });
    });
  });

  return result;
}

export function getAllCities(): Array<{ 
  region: string; 
  country: string; 
  city: string; 
  name: { en: string; es: string } 
}> {
  const result: Array<{ 
    region: string; 
    country: string; 
    city: string; 
    name: { en: string; es: string } 
  }> = [];
  
  Object.entries(regions).forEach(([regionSlug, region]) => {
    Object.entries(region.countries).forEach(([countrySlug, country]) => {
      Object.entries(country.cities).forEach(([citySlug, city]) => {
        result.push({
          region: regionSlug,
          country: countrySlug,
          city: citySlug,
          name: city.name
        });
      });
    });
  });

  return result;
}
