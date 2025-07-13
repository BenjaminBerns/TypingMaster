import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    try {
      // Load Google AdSense script if not already loaded
      if (!document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }

      // Initialize the ad
      if (adRef.current && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
      }
    } catch (error) {
      console.error('Error loading ad:', error);
    }
  }, []);

  return (
    <div 
      className={`ad-container ${className}`}
      style={style}
    >
      <div className="text-xs text-gray-400 mb-1 text-center">Publicité</div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
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