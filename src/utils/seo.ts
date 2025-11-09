export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateOrganizationSchema(site: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FreediveMap",
    "url": site,
    "logo": `${site}/favicon.svg`,
    "description": "FreediveMap is the global directory of freediving schools, instructors and training centers worldwide."
  };
}

export function generateLocalBusinessSchema(school: {
  name: string;
  description: string;
  coordinates: { lat: number; lng: number };
  contact: { email: string; phone: string; website: string };
  address: { city: string; country: string };
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": school.name,
    "description": school.description,
    "url": school.url,
    "telephone": school.contact.phone,
    "email": school.contact.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": school.address.city,
      "addressCountry": school.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": school.coordinates.lat,
      "longitude": school.coordinates.lng
    }
  };
}

export function generateFAQSchema(questions: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(qa => ({
      "@type": "Question",
      "name": qa.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.answer
      }
    }))
  };
}

export function generateBreadcrumbs(
  locale: string,
  site: string,
  items: Array<{ name: string; path: string }>
): BreadcrumbItem[] {
  const baseUrl = site.endsWith('/') ? site.slice(0, -1) : site;
  
  return items.map(item => ({
    name: item.name,
    url: `${baseUrl}/${locale}${item.path}`
  }));
}

export function formatBreadcrumbSchema(schema: any): string {
  return JSON.stringify(schema, null, 2);
}

