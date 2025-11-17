#!/usr/bin/env node

/**
 * Generate sitemap.xml with current date
 * This script runs during build to ensure the sitemap always has the latest date
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://rnsitmun.vercel.app';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Define all routes with their metadata
const routes = [
  {
    path: '/',
    changefreq: 'daily',
    priority: '1.0'
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    path: '/events',
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    path: '/members',
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    path: '/blogs',
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    path: '/contact',
    changefreq: 'yearly',
    priority: '0.7'
  },
  {
    path: '/whatIsMun',
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    path: '/privacy',
    changefreq: 'yearly',
    priority: '0.3'
  },
  {
    path: '/terms',
    changefreq: 'yearly',
    priority: '0.3'
  }
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  routes.forEach(route => {
    sitemapContent += `
    <url>
        <loc>${BASE_URL}${route.path}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
    </url>`;
  });

  sitemapContent += `
</urlset>`;

  // Ensure public directory exists
  const publicDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write sitemap file
  fs.writeFileSync(OUTPUT_PATH, sitemapContent);
  
  console.log(`✅ Sitemap generated successfully at ${OUTPUT_PATH}`);
  console.log(`📅 Last modified date: ${currentDate}`);
  console.log(`📄 Total URLs: ${routes.length}`);
  
  return {
    path: OUTPUT_PATH,
    lastmod: currentDate,
    urlCount: routes.length
  };
}

// Only run if called directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    generateSitemap();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

export { generateSitemap };