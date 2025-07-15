import { useEffect, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function AdBanner({ 
  slot, 
  format = 'auto', 
  responsive = true, 
  className = '', 
  style 
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check for advertising consent
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      if (consent) {
        try {
          const preferences = JSON.parse(consent);
          setHasConsent(preferences.advertising === true);
        } catch (error) {
          console.error('Error parsing consent:', error);
          setHasConsent(false);
        }
      } else {
        setHasConsent(false);
      }
    };

    checkConsent();

    // Listen for consent changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') {
        checkConsent();
      }
    };

    // Also listen for custom events (for same-tab updates)
    const handleConsentUpdate = () => {
      checkConsent();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cookie-consent-updated', handleConsentUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
    };
  }, []);

  useEffect(() => {
    if (hasConsent) {
      try {
        // Initialize the ad
        if (adRef.current && (window as any).adsbygoogle) {
          (window as any).adsbygoogle.push({});
        }
      } catch (error) {
        console.error('Error loading ad:', error);
      }
    }
  }, [hasConsent]);

  if (!hasConsent) {
    return (
      <div 
        className={`ad-placeholder border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 ${className}`}
        style={style}
      >
        <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <p className="text-sm text-gray-600 mb-2">
          <strong>Annonces</strong>
        </p>
        <p className="text-xs text-gray-500">
          Publicité désactivée. Acceptez les cookies publicitaires pour voir les annonces.
        </p>
      </div>
    );
  }

  return (
    <div 
      className={`ad-container ${className}`}
      style={style}
    >
      {/* Étiquette obligatoire AdSense */}
      <div className="text-xs text-gray-500 mb-2 text-center">
        <span className="bg-gray-100 px-2 py-1 rounded">Annonces</span>
      </div>
      
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-3442421625172943"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}

// Composants prédéfinis pour différents formats
export function HorizontalAdBanner({ className = '', ...props }: Omit<AdBannerProps, 'format'>) {
  return (
    <AdBanner 
      format="horizontal"
      className={`max-w-4xl mx-auto ${className}`}
      style={{ minHeight: '90px' }}
      {...props}
    />
  );
}

export function SquareAdBanner({ className = '', ...props }: Omit<AdBannerProps, 'format'>) {
  return (
    <AdBanner 
      format="rectangle"
      className={`max-w-sm mx-auto ${className}`}
      style={{ minHeight: '250px' }}
      {...props}
    />
  );
}

export function SidebarAdBanner({ className = '', ...props }: Omit<AdBannerProps, 'format'>) {
  return (
    <AdBanner 
      format="vertical"
      className={`max-w-xs ${className}`}
      style={{ minHeight: '600px' }}
      {...props}
    />
  );
}