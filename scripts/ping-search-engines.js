#!/usr/bin/env node

/**
 * Auto-ping Google and Bing search engines after deployment
 * This script notifies search engines about sitemap updates
 */

import https from 'https';

const SITEMAP_URL = 'https://rnsitmun.vercel.app/sitemap.xml';

const searchEngines = [
  {
    name: 'Google',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  },
  {
    name: 'Bing',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  }
];

function pingSearchEngine(engine) {
  return new Promise((resolve, reject) => {
    const request = https.get(engine.url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          console.log(`✅ Successfully pinged ${engine.name}`);
          resolve({ engine: engine.name, success: true, statusCode: response.statusCode });
        } else {
          console.log(`⚠️  ${engine.name} responded with status ${response.statusCode}`);
          resolve({ engine: engine.name, success: false, statusCode: response.statusCode });
        }
      });
    });
    
    request.on('error', (error) => {
      console.error(`❌ Error pinging ${engine.name}:`, error.message);
      reject({ engine: engine.name, error: error.message });
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      console.error(`❌ Timeout pinging ${engine.name}`);
      reject({ engine: engine.name, error: 'Timeout' });
    });
  });
}

async function pingAllSearchEngines() {
  console.log('🚀 Starting search engine ping process...');
  console.log(`📍 Sitemap URL: ${SITEMAP_URL}\n`);
  
  const results = [];
  
  for (const engine of searchEngines) {
    try {
      const result = await pingSearchEngine(engine);
      results.push(result);
    } catch (error) {
      results.push(error);
    }
    
    // Add small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📊 Summary:');
  const successful = results.filter(r => r.success).length;
  const failed = results.length - successful;
  
  console.log(`✅ Successful pings: ${successful}`);
  console.log(`❌ Failed pings: ${failed}`);
  
  if (failed > 0) {
    console.log('\n⚠️  Some search engines could not be notified.');
    console.log('This is normal and they will discover changes during regular crawling.');
  } else {
    console.log('\n🎉 All search engines have been notified successfully!');
  }
  
  return results;
}

// Only run if called directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  pingAllSearchEngines()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Fatal error:', error);
      process.exit(1);
    });
}

export { pingAllSearchEngines };