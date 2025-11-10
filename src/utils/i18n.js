import enRaw from '../i18n/en.json';
import esRaw from '../i18n/es.json';

// Handle JSON import for Cloudflare Workers compatibility
const en = (enRaw?.default || enRaw || {});
const es = (esRaw?.default || esRaw || {});

const translations = { en, es };

export const t = (locale, key) => {
  const lang = translations[locale] || translations.en;
  
  // Support nested keys with dot notation (e.g., "common.languages.es")
  if (key.includes('.')) {
    const keys = key.split('.');
    let value = lang;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    // Ensure we always return a string, never an object
    return typeof value === 'string' ? value : String(value || key);
  }
  
  const result = lang[key];
  // Ensure we always return a string, never an object
  return typeof result === 'string' ? result : String(result || key);
};


