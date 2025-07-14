import { useEffect } from 'react';

export function GoogleAdsScript() {
  useEffect(() => {
    // Check if the script is already loaded
    if (document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
      return;
    }

    // Create and append the Google Ads script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3442421625172943';
    script.crossOrigin = 'anonymous';
    
    document.head.appendChild(script);
    
    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return null; // This component doesn't render anything
}