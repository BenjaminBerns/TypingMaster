const fs = require('fs');
const path = require('path');

// Script to inject Google Ads script into production build
const injectGoogleAds = () => {
  const distPath = path.join(__dirname, '..', 'dist', 'public', 'index.html');
  
  if (!fs.existsSync(distPath)) {
    console.log('No production build found, skipping Google Ads injection');
    return;
  }

  let html = fs.readFileSync(distPath, 'utf-8');
  
  // Check if Google Ads script is already present
  if (html.includes('pagead2.googlesyndication.com')) {
    console.log('Google Ads script already present in production build');
    return;
  }

  // Inject Google Ads script
  const googleAdsScript = `    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3442421625172943"
     crossorigin="anonymous"></script>`;

  html = html.replace('</head>', `${googleAdsScript}\n  </head>`);
  
  fs.writeFileSync(distPath, html);
  console.log('Google Ads script injected into production build');
};

// Run if called directly
if (require.main === module) {
  injectGoogleAds();
}

module.exports = injectGoogleAds;