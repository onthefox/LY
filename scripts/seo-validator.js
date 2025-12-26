#!/usr/bin/env node

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SEO Validation Script for Long Ying Logistics
 * Validates metadata, hreflang, canonical URLs, and Open Graph tags
 */

const https = require('https');
const http = require('http');
const { JSDOM } = require('jsdom');

const BASE_URL = 'https://longyinglogistics.com';
const PAGES = ['home', 'services', 'about', 'insights', 'tariffs', 'contacts'];
const LANGUAGES = ['en', 'ru', 'zh'];

class SEOValidator {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      errors: []
    };
  }

  async validate() {
    console.log('🚀 Starting SEO validation for Long Ying Logistics...\n');

    for (const lang of LANGUAGES) {
      console.log(`📍 Validating ${lang.toUpperCase()} version...`);

      for (const page of PAGES) {
        const url = this.buildUrl(lang, page);
        await this.validatePage(url, lang, page);
      }
    }

    this.printSummary();
    return this.results.failed === 0;
  }

  buildUrl(lang, page) {
    const langPrefix = lang === 'en' ? '' : `/${lang}`;
    const pagePath = page === 'home' ? '' : `/${page}`;
    return `${BASE_URL}${langPrefix}${pagePath}`;
  }

  async validatePage(url, lang, page) {
    try {
      const html = await this.fetchPage(url);
      const dom = new JSDOM(html);
      const document = dom.window.document;

      console.log(`  ✅ Checking ${page} (${url})`);

      // Validate title
      this.validateTitle(document, lang, page, url);

      // Validate meta description
      this.validateMetaDescription(document, lang, page, url);

      // Validate canonical URL
      this.validateCanonical(document, lang, page, url);

      // Validate hreflang tags
      this.validateHreflang(document, lang, page, url);

      // Validate Open Graph tags
      this.validateOpenGraph(document, lang, page, url);

      // Validate HTML lang attribute
      this.validateHtmlLang(document, lang, page, url);

    } catch (error) {
      this.logError(`Failed to fetch ${url}: ${error.message}`, url);
    }
  }

  validateTitle(document, lang, page, url) {
    const title = document.querySelector('title');
    if (!title || !title.textContent.trim()) {
      this.logError('Missing title tag', url);
      return;
    }

    const titleText = title.textContent.trim();
    if (titleText.length < 30) {
      this.logWarning(`Title too short (${titleText.length} chars): ${titleText}`, url);
    }
    if (titleText.length > 60) {
      this.logWarning(`Title too long (${titleText.length} chars): ${titleText}`, url);
    }

    // Check if title contains brand name
    if (!titleText.includes('Long Ying')) {
      this.logWarning('Title does not contain brand name', url);
    }
  }

  validateMetaDescription(document, lang, page, url) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc || !metaDesc.content) {
      this.logError('Missing meta description', url);
      return;
    }

    const desc = metaDesc.content;
    if (desc.length < 120) {
      this.logWarning(`Meta description too short (${desc.length} chars)`, url);
    }
    if (desc.length > 160) {
      this.logWarning(`Meta description too long (${desc.length} chars)`, url);
    }
  }

  validateCanonical(document, lang, page, url) {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical || !canonical.href) {
      this.logError('Missing canonical URL', url);
      return;
    }

    const canonicalUrl = canonical.href;
    if (!canonicalUrl.startsWith('https://')) {
      this.logError('Canonical URL is not HTTPS', url);
    }

    // Validate canonical URL structure
    const expectedCanonical = this.buildUrl(lang, page);
    if (canonicalUrl !== expectedCanonical) {
      this.logWarning(`Canonical URL mismatch. Expected: ${expectedCanonical}, Got: ${canonicalUrl}`, url);
    }
  }

  validateHreflang(document, lang, page, url) {
    const hreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    const hreflangMap = {};

    hreflangs.forEach(link => {
      const hreflang = link.getAttribute('hreflang');
      const href = link.href;
      hreflangMap[hreflang] = href;
    });

    // Check for required hreflang tags
    const requiredLangs = ['en', 'ru', 'zh', 'x-default'];
    for (const reqLang of requiredLangs) {
      if (!hreflangMap[reqLang]) {
        this.logError(`Missing hreflang="${reqLang}"`, url);
      }
    }

    // Validate hreflang URLs
    for (const [hlLang, hlUrl] of Object.entries(hreflangMap)) {
      if (!hlUrl.startsWith('https://')) {
        this.logError(`Hreflang ${hlLang} URL is not HTTPS: ${hlUrl}`, url);
      }
    }
  }

  validateOpenGraph(document, lang, page, url) {
    const requiredOG = ['og:type', 'og:title', 'og:description', 'og:url', 'og:site_name', 'og:image'];
    const ogLocale = lang === 'en' ? 'en_US' : lang === 'ru' ? 'ru_RU' : 'zh_CN';

    for (const ogTag of requiredOG) {
      const element = document.querySelector(`meta[property="${ogTag}"]`);
      if (!element || !element.content) {
        this.logError(`Missing Open Graph tag: ${ogTag}`, url);
      }
    }

    // Validate og:locale
    const localeTag = document.querySelector('meta[property="og:locale"]');
    if (localeTag && localeTag.content !== ogLocale) {
      this.logWarning(`OG locale mismatch. Expected: ${ogLocale}, Got: ${localeTag.content}`, url);
    }

    // Validate og:image
    const imageTag = document.querySelector('meta[property="og:image"]');
    if (imageTag && !imageTag.content.startsWith('https://')) {
      this.logError('OG image URL is not HTTPS', url);
    }
  }

  validateHtmlLang(document, lang, page, url) {
    const html = document.querySelector('html');
    const htmlLang = html.getAttribute('lang');

    if (!htmlLang) {
      this.logError('Missing html lang attribute', url);
      return;
    }

    if (htmlLang !== lang) {
      this.logWarning(`HTML lang attribute mismatch. Expected: ${lang}, Got: ${htmlLang}`, url);
    }
  }

  async fetchPage(url) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https://') ? https : http;

      const request = client.get(url, {
        headers: {
          'User-Agent': 'SEO-Validator/1.0'
        }
      }, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode}`));
            return;
          }
          resolve(data);
        });
      });

      request.on('error', (err) => {
        reject(err);
      });

      request.setTimeout(10000, () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  logError(message, url) {
    this.results.errors.push({ type: 'error', message, url });
    this.results.failed++;
    console.log(`    ❌ ${message}`);
  }

  logWarning(message, url) {
    this.results.errors.push({ type: 'warning', message, url });
    this.results.warnings++;
    console.log(`    ⚠️  ${message}`);
  }

  printSummary() {
    console.log('\n📊 Validation Summary:');
    console.log(`   ✅ Passed: ${this.results.passed}`);
    console.log(`   ❌ Failed: ${this.results.failed}`);
    console.log(`   ⚠️  Warnings: ${this.results.warnings}`);

    if (this.results.errors.length > 0) {
      console.log('\n📋 Detailed Results:');
      this.results.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. [${error.type.toUpperCase()}] ${error.message}`);
        console.log(`      URL: ${error.url}`);
      });
    }

    console.log(`\n🎯 Overall Status: ${this.results.failed === 0 ? '✅ PASSED' : '❌ FAILED'}`);
  }
}

// CLI interface
if (require.main === module) {
  const validator = new SEOValidator();
  validator.validate()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Validation failed:', error);
      process.exit(1);
    });
}

module.exports = SEOValidator;