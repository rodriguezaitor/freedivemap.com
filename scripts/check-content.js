#!/usr/bin/env node

/**
 * Content Verification Script
 * 
 * Checks which destinations, regions, countries, and provinces have content
 * Run with: node scripts/check-content.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const destinationsDir = path.join(__dirname, '../src/content/destinations');
const regionsPath = path.join(__dirname, '../src/content/regions.json');

// Helper function to check if content is valid
function hasValidContent(content) {
  return content && typeof content === 'string' && content.trim().length > 50;
}

// Check destinations (markdown files)
console.log('\n📝 Content Verification Report\n');
console.log('='.repeat(60));
console.log('DESTINATIONS (Markdown Files)\n');

const files = fs.readdirSync(destinationsDir)
  .filter(f => f.endsWith('.md'))
  .map(f => ({
    name: f,
    path: path.join(destinationsDir, f),
  }));

const destResults = {
  complete: [],
  missingEn: [],
  missingEs: [],
  missingBoth: [],
};

files.forEach(({ name, path: filePath }) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!frontmatterMatch) {
    destResults.missingBoth.push(name);
    return;
  }
  
  const frontmatter = frontmatterMatch[1];
  const hasContentEn = frontmatter.includes('content:') && frontmatter.includes('en: |');
  const hasContentEs = frontmatter.includes('content:') && frontmatter.includes('es: |');
  
  // Check if content actually has text (not just empty)
  let contentEn = '';
  let contentEs = '';
  
  if (hasContentEn) {
    const enMatch = frontmatter.match(/en: \|([\s\S]*?)(?=\n  [a-z]|$)/);
    if (enMatch) {
      contentEn = enMatch[1].trim();
    }
  }
  
  if (hasContentEs) {
    const esMatch = frontmatter.match(/es: \|([\s\S]*?)(?=\n  [a-z]|$)/);
    if (esMatch) {
      contentEs = esMatch[1].trim();
    }
  }
  
  const hasValidEn = contentEn.length > 50; // At least 50 chars
  const hasValidEs = contentEs.length > 50; // At least 50 chars
  
  if (hasValidEn && hasValidEs) {
    destResults.complete.push(name);
  } else if (hasValidEn && !hasValidEs) {
    destResults.missingEs.push(name);
  } else if (!hasValidEn && hasValidEs) {
    destResults.missingEn.push(name);
  } else {
    destResults.missingBoth.push(name);
  }
});

console.log(`Total destinations: ${files.length}`);
console.log(`✅ Complete (both EN & ES): ${destResults.complete.length}`);
if (destResults.complete.length > 0 && destResults.complete.length <= 10) {
  destResults.complete.forEach(f => console.log(`   - ${f}`));
} else if (destResults.complete.length > 10) {
  console.log(`   (showing first 10 of ${destResults.complete.length})`);
  destResults.complete.slice(0, 10).forEach(f => console.log(`   - ${f}`));
}
console.log('');

console.log(`⚠️  Missing English: ${destResults.missingEn.length}`);
if (destResults.missingEn.length > 0 && destResults.missingEn.length <= 10) {
  destResults.missingEn.forEach(f => console.log(`   - ${f}`));
} else if (destResults.missingEn.length > 10) {
  console.log(`   (showing first 10 of ${destResults.missingEn.length})`);
  destResults.missingEn.slice(0, 10).forEach(f => console.log(`   - ${f}`));
}
console.log('');

console.log(`⚠️  Missing Spanish: ${destResults.missingEs.length}`);
if (destResults.missingEs.length > 0 && destResults.missingEs.length <= 10) {
  destResults.missingEs.forEach(f => console.log(`   - ${f}`));
} else if (destResults.missingEs.length > 10) {
  console.log(`   (showing first 10 of ${destResults.missingEs.length})`);
  destResults.missingEs.slice(0, 10).forEach(f => console.log(`   - ${f}`));
}
console.log('');

console.log(`❌ Missing Both: ${destResults.missingBoth.length}`);
if (destResults.missingBoth.length > 0 && destResults.missingBoth.length <= 10) {
  destResults.missingBoth.forEach(f => console.log(`   - ${f}`));
} else if (destResults.missingBoth.length > 10) {
  console.log(`   (showing first 10 of ${destResults.missingBoth.length})`);
  destResults.missingBoth.slice(0, 10).forEach(f => console.log(`   - ${f}`));
}
console.log('');

// Check regions, countries, and provinces from regions.json
console.log('='.repeat(60));
console.log('REGIONS, COUNTRIES & PROVINCES (regions.json)\n');

const regions = JSON.parse(fs.readFileSync(regionsPath, 'utf8'));

const regionResults = {
  complete: [],
  missingEn: [],
  missingEs: [],
  missingBoth: [],
};

const countryResults = {
  complete: [],
  missingEn: [],
  missingEs: [],
  missingBoth: [],
};

const provinceResults = {
  complete: [],
  missingEn: [],
  missingEs: [],
  missingBoth: [],
};

// Check regions
Object.entries(regions).forEach(([regionId, region]) => {
  const content = region.content || {};
  const hasEn = hasValidContent(content.en);
  const hasEs = hasValidContent(content.es);
  
  if (hasEn && hasEs) {
    regionResults.complete.push(regionId);
  } else if (hasEn && !hasEs) {
    regionResults.missingEs.push(regionId);
  } else if (!hasEn && hasEs) {
    regionResults.missingEn.push(regionId);
  } else {
    regionResults.missingBoth.push(regionId);
  }
  
  // Check countries
  if (region.countries) {
    Object.entries(region.countries).forEach(([countryId, country]) => {
      const countryContent = country.content || {};
      const countryHasEn = hasValidContent(countryContent.en);
      const countryHasEs = hasValidContent(countryContent.es);
      
      if (countryHasEn && countryHasEs) {
        countryResults.complete.push(`${regionId}/${countryId}`);
      } else if (countryHasEn && !countryHasEs) {
        countryResults.missingEs.push(`${regionId}/${countryId}`);
      } else if (!countryHasEn && countryHasEs) {
        countryResults.missingEn.push(`${regionId}/${countryId}`);
      } else {
        countryResults.missingBoth.push(`${regionId}/${countryId}`);
      }
      
      // Check provinces
      if (country.provinces) {
        Object.entries(country.provinces).forEach(([provinceId, province]) => {
          const provinceContent = province.content || {};
          const provinceHasEn = hasValidContent(provinceContent.en);
          const provinceHasEs = hasValidContent(provinceContent.es);
          
          if (provinceHasEn && provinceHasEs) {
            provinceResults.complete.push(`${regionId}/${countryId}/${provinceId}`);
          } else if (provinceHasEn && !provinceHasEs) {
            provinceResults.missingEs.push(`${regionId}/${countryId}/${provinceId}`);
          } else if (!provinceHasEn && provinceHasEs) {
            provinceResults.missingEn.push(`${regionId}/${countryId}/${provinceId}`);
          } else {
            provinceResults.missingBoth.push(`${regionId}/${countryId}/${provinceId}`);
          }
        });
      }
    });
  }
});

const totalRegions = Object.keys(regions).length;
const totalCountries = Object.values(regions).reduce((sum, r) => sum + Object.keys(r.countries || {}).length, 0);
const totalProvinces = Object.values(regions).reduce((sum, r) => {
  return sum + Object.values(r.countries || {}).reduce((s, c) => s + Object.keys(c.provinces || {}).length, 0);
}, 0);

console.log(`REGIONS (Total: ${totalRegions})`);
console.log(`✅ Complete: ${regionResults.complete.length}`);
if (regionResults.complete.length > 0) {
  regionResults.complete.forEach(r => console.log(`   - ${r}`));
}
console.log(`⚠️  Missing EN: ${regionResults.missingEn.length}`);
console.log(`⚠️  Missing ES: ${regionResults.missingEs.length}`);
console.log(`❌ Missing Both: ${regionResults.missingBoth.length}`);
if (regionResults.missingBoth.length > 0) {
  regionResults.missingBoth.forEach(r => console.log(`   - ${r}`));
}
console.log('');

console.log(`COUNTRIES (Total: ${totalCountries})`);
console.log(`✅ Complete: ${countryResults.complete.length}`);
if (countryResults.complete.length > 0 && countryResults.complete.length <= 10) {
  countryResults.complete.forEach(c => console.log(`   - ${c}`));
} else if (countryResults.complete.length > 10) {
  console.log(`   (showing first 10 of ${countryResults.complete.length})`);
  countryResults.complete.slice(0, 10).forEach(c => console.log(`   - ${c}`));
}
console.log(`⚠️  Missing EN: ${countryResults.missingEn.length}`);
if (countryResults.missingEn.length > 0 && countryResults.missingEn.length <= 10) {
  countryResults.missingEn.forEach(c => console.log(`   - ${c}`));
} else if (countryResults.missingEn.length > 10) {
  console.log(`   (showing first 10 of ${countryResults.missingEn.length})`);
  countryResults.missingEn.slice(0, 10).forEach(c => console.log(`   - ${c}`));
}
console.log(`⚠️  Missing ES: ${countryResults.missingEs.length}`);
console.log(`❌ Missing Both: ${countryResults.missingBoth.length}`);
if (countryResults.missingBoth.length > 0 && countryResults.missingBoth.length <= 10) {
  countryResults.missingBoth.forEach(c => console.log(`   - ${c}`));
} else if (countryResults.missingBoth.length > 10) {
  console.log(`   (showing first 10 of ${countryResults.missingBoth.length})`);
  countryResults.missingBoth.slice(0, 10).forEach(c => console.log(`   - ${c}`));
}
console.log('');

console.log(`PROVINCES (Total: ${totalProvinces})`);
console.log(`✅ Complete: ${provinceResults.complete.length}`);
if (provinceResults.complete.length > 0 && provinceResults.complete.length <= 10) {
  provinceResults.complete.forEach(p => console.log(`   - ${p}`));
} else if (provinceResults.complete.length > 10) {
  console.log(`   (showing first 10 of ${provinceResults.complete.length})`);
  provinceResults.complete.slice(0, 10).forEach(p => console.log(`   - ${p}`));
}
console.log(`⚠️  Missing EN: ${provinceResults.missingEn.length}`);
console.log(`⚠️  Missing ES: ${provinceResults.missingEs.length}`);
console.log(`❌ Missing Both: ${provinceResults.missingBoth.length}`);
if (provinceResults.missingBoth.length > 0 && provinceResults.missingBoth.length <= 10) {
  provinceResults.missingBoth.forEach(p => console.log(`   - ${p}`));
} else if (provinceResults.missingBoth.length > 10) {
  console.log(`   (showing first 10 of ${provinceResults.missingBoth.length})`);
  provinceResults.missingBoth.slice(0, 10).forEach(p => console.log(`   - ${p}`));
}
console.log('');

// Overall Summary
console.log('='.repeat(60));
console.log('📊 OVERALL SUMMARY\n');

const destTotalWithContent = destResults.complete.length;
const destTotalMissing = destResults.missingEn.length + destResults.missingEs.length + destResults.missingBoth.length;

const regionTotalWithContent = regionResults.complete.length;
const regionTotalMissing = regionResults.missingEn.length + regionResults.missingEs.length + regionResults.missingBoth.length;

const countryTotalWithContent = countryResults.complete.length;
const countryTotalMissing = countryResults.missingEn.length + countryResults.missingEs.length + countryResults.missingBoth.length;

const provinceTotalWithContent = provinceResults.complete.length;
const provinceTotalMissing = provinceResults.missingEn.length + provinceResults.missingEs.length + provinceResults.missingBoth.length;

console.log(`DESTINATIONS: ${destTotalWithContent}/${files.length} complete (${Math.round(destTotalWithContent/files.length*100)}%)`);
console.log(`REGIONS: ${regionTotalWithContent}/${totalRegions} complete (${Math.round(regionTotalWithContent/totalRegions*100)}%)`);
console.log(`COUNTRIES: ${countryTotalWithContent}/${totalCountries} complete (${Math.round(countryTotalWithContent/totalCountries*100)}%)`);
console.log(`PROVINCES: ${provinceTotalWithContent}/${totalProvinces} complete (${Math.round(provinceTotalWithContent/totalProvinces*100)}%)`);

const totalPages = files.length + totalRegions + totalCountries + totalProvinces;
const totalWithContent = destTotalWithContent + regionTotalWithContent + countryTotalWithContent + provinceTotalWithContent;
const totalMissing = destTotalMissing + regionTotalMissing + countryTotalMissing + provinceTotalMissing;

console.log(`\nTOTAL PAGES: ${totalWithContent}/${totalPages} with content (${Math.round(totalWithContent/totalPages*100)}%)`);
console.log(`NEED CONTENT: ${totalMissing}/${totalPages} (${Math.round(totalMissing/totalPages*100)}%)\n`);

if (totalMissing === 0) {
  console.log('✅ All pages have content!\n');
  process.exit(0);
} else {
  console.log('⚠️  Some pages need content.\n');
  process.exit(1);
}

