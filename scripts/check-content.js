#!/usr/bin/env node

/**
 * Content Verification Script
 * 
 * Checks which destinations have content in their frontmatter
 * Run with: node scripts/check-content.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const destinationsDir = path.join(__dirname, '../src/content/destinations');

// Get all .md files
const files = fs.readdirSync(destinationsDir)
  .filter(f => f.endsWith('.md'))
  .map(f => ({
    name: f,
    path: path.join(destinationsDir, f),
  }));

console.log('\n📝 Content Verification Report\n');
console.log(`Total destinations: ${files.length}\n`);

const results = {
  complete: [],
  missingEn: [],
  missingEs: [],
  missingBoth: [],
};

files.forEach(({ name, path: filePath }) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!frontmatterMatch) {
    results.missingBoth.push(name);
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
    results.complete.push(name);
  } else if (hasValidEn && !hasValidEs) {
    results.missingEs.push(name);
  } else if (!hasValidEn && hasValidEs) {
    results.missingEn.push(name);
  } else {
    results.missingBoth.push(name);
  }
});

// Print results
console.log(`✅ Complete (both EN & ES): ${results.complete.length}`);
if (results.complete.length > 0) {
  results.complete.forEach(f => console.log(`   - ${f}`));
}
console.log('');

console.log(`⚠️  Missing English: ${results.missingEn.length}`);
if (results.missingEn.length > 0) {
  results.missingEn.forEach(f => console.log(`   - ${f}`));
}
console.log('');

console.log(`⚠️  Missing Spanish: ${results.missingEs.length}`);
if (results.missingEs.length > 0) {
  results.missingEs.forEach(f => console.log(`   - ${f}`));
}
console.log('');

console.log(`❌ Missing Both: ${results.missingBoth.length}`);
if (results.missingBoth.length > 0) {
  results.missingBoth.forEach(f => console.log(`   - ${f}`));
}
console.log('');

// Summary
const totalWithContent = results.complete.length;
const totalMissing = results.missingEn.length + results.missingEs.length + results.missingBoth.length;

console.log(`\n📊 Summary:`);
console.log(`   Complete: ${totalWithContent}/${files.length} (${Math.round(totalWithContent/files.length*100)}%)`);
console.log(`   Need content: ${totalMissing}/${files.length} (${Math.round(totalMissing/files.length*100)}%)\n`);

if (totalMissing === 0) {
  console.log('✅ All destinations have content!\n');
  process.exit(0);
} else {
  console.log('⚠️  Some destinations need content.\n');
  process.exit(1);
}

