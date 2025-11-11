#!/usr/bin/env node

/**
 * Destination Verification Script
 * 
 * Checks that all destinations defined in regions.json have corresponding .md files
 * Run with: node scripts/check-destinations.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const regionsPath = path.join(__dirname, '../src/content/regions.json');
const destinationsDir = path.join(__dirname, '../src/content/destinations');

// Read regions.json
const regions = JSON.parse(fs.readFileSync(regionsPath, 'utf8'));

// Get all existing .md files
const existingFiles = fs.readdirSync(destinationsDir)
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace('.md', ''));

// Extract expected destinations from regions.json
const expectedDestinations = [];
for (const [regionId, region] of Object.entries(regions)) {
  for (const [countryId, country] of Object.entries(region.countries || {})) {
    for (const [cityId, city] of Object.entries(country.cities || {})) {
      expectedDestinations.push({
        region: regionId,
        country: countryId,
        city: cityId,
        name: city.name.en,
        slug: city.slug,
        fileName: `${city.slug}.md`,
      });
    }
  }
}

// Check which are missing
const missing = expectedDestinations.filter(exp => !existingFiles.includes(exp.slug));
const extra = existingFiles.filter(file => !expectedDestinations.find(e => e.slug === file));

// Print results
console.log('\n📋 Destination Verification Report\n');
console.log(`Expected destinations: ${expectedDestinations.length}`);
console.log(`Existing .md files: ${existingFiles.length}`);
console.log(`Missing: ${missing.length}`);
console.log(`Extra files: ${extra.length}\n`);

if (missing.length > 0) {
  console.log('❌ MISSING DESTINATIONS:\n');
  missing.forEach(dest => {
    console.log(`  - ${dest.name}`);
    console.log(`    Region: ${dest.region}`);
    console.log(`    Country: ${dest.country}`);
    console.log(`    Slug: ${dest.slug}`);
    console.log(`    File: ${dest.fileName}`);
    console.log(`    Path: src/content/destinations/${dest.fileName}\n`);
  });
}

if (extra.length > 0) {
  console.log('⚠️  EXTRA FILES (not in regions.json):\n');
  extra.forEach(file => {
    console.log(`  - ${file}.md`);
  });
  console.log('');
}

if (missing.length === 0 && extra.length === 0) {
  console.log('✅ All destinations are properly configured!\n');
  process.exit(0);
} else {
  console.log('⚠️  Some destinations need attention.\n');
  process.exit(1);
}

