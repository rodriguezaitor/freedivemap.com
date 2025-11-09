import schoolsData from '../data/schools.json';
import regionsData from '../data/regions.json';

export interface School {
  id: string;
  name: string;
  slug: string;
  country: string;
  city: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  certifications: string[];
  courseTypes: string[];
  rating: number;
  reviewCount: number;
  logo: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
}

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

// Handle both default export and direct import
const schoolsArray = Array.isArray(schoolsData) ? schoolsData : (schoolsData.default || []);
const regionsObj = regionsData || (regionsData as any).default || {};

export const schools: School[] = schoolsArray as School[];
export const regions: Record<string, Region> = regionsObj as Record<string, Region>;

export function getSchoolBySlug(slug: string): School | undefined {
  return schools.find(school => school.slug === slug);
}

export function getSchoolsByRegion(region: string): School[] {
  return schools.filter(school => school.region === region);
}

export function getSchoolsByCountry(country: string): School[] {
  return schools.filter(school => school.country === country);
}

export function getSchoolsByCity(city: string): School[] {
  return schools.filter(school => school.city === city);
}

export function getTopRatedSchools(limit: number = 5): School[] {
  return [...schools]
    .sort((a, b) => {
      // Sort by rating first, then by review count
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, limit);
}

export function filterSchools(filters: {
  country?: string;
  city?: string;
  region?: string;
  certification?: string;
  courseType?: string;
  level?: string;
}): School[] {
  let filtered = [...schools];

  if (filters.region) {
    filtered = filtered.filter(school => school.region === filters.region);
  }

  if (filters.country) {
    filtered = filtered.filter(school => school.country === filters.country);
  }

  if (filters.city) {
    filtered = filtered.filter(school => school.city === filters.city);
  }

  if (filters.certification) {
    filtered = filtered.filter(school => 
      school.certifications.includes(filters.certification!)
    );
  }

  if (filters.courseType) {
    filtered = filtered.filter(school => 
      school.courseTypes.includes(filters.courseType!)
    );
  }

  return filtered;
}

export function getRelatedSchools(school: School, limit: number = 3): School[] {
  // Get schools in the same city, excluding the current school
  const related = schools
    .filter(s => 
      s.id !== school.id && 
      (s.city === school.city || s.country === school.country)
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);

  return related;
}

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

export function generateSchoolUrl(locale: string, school: School): string {
  return `/${locale}/schools/${school.slug}/`;
}

export function generateRegionUrl(locale: string, regionSlug: string): string {
  return `/${locale}/schools/${regionSlug}/`;
}

export function generateCountryUrl(locale: string, regionSlug: string, countrySlug: string): string {
  return `/${locale}/schools/${regionSlug}/${countrySlug}/`;
}

export function generateCityUrl(locale: string, regionSlug: string, countrySlug: string, citySlug: string): string {
  return `/${locale}/schools/${regionSlug}/${countrySlug}/${citySlug}/`;
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

