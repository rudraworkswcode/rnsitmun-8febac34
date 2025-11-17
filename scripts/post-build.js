#!/usr/bin/env node

/**
 * Post-build script for RNSIT MUN website
 * Handles sitemap generation and search engine notifications
 */

import { generateSitemap } from './generate-sitemap.js';
import { pingAllSearchEngines } from './ping-search-engines.js';

async function postBuild() {
  console.log('🚀 Starting post-build process for RNSIT MUN...\n');
  
  try {
    // Step 1: Generate fresh sitemap
    console.log('📄 Generating sitemap...');
    const sitemapResult = generateSitemap();
    console.log(`✅ Sitemap created: ${sitemapResult.urlCount} URLs\n`);
    
    // Step 2: Ping search engines
    console.log('🔔 Notifying search engines...');
    await pingAllSearchEngines();
    
    console.log('\n🎉 Post-build process completed successfully!');
    console.log('🌐 Your site is now optimized for search engine discovery.');
    
  } catch (error) {
    console.error('💥 Post-build process failed:', error);
    process.exit(1);
  }
}

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  postBuild();
}

export { postBuild };