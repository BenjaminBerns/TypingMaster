import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie, Settings, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Link } from 'wouter';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    advertising: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      advertising: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
    
    // Activer Google Ads si accepté
    if (allAccepted.advertising) {
      enableGoogleAds();
    }
  };

  const acceptEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      advertising: false
    };
    setPreferences(essentialOnly);
    localStorage.setItem('cookie-consent', JSON.stringify(essentialOnly));
    setShowBanner(false);
  };

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowBanner(false);
    
    // Activer Google Ads si accepté
    if (preferences.advertising) {
      enableGoogleAds();
    }
  };

  const enableGoogleAds = () => {
    // Charger Google Ads seulement si l'utilisateur a consenti
    if (typeof window !== 'undefined' && !document.querySelector('script[src*="googlesyndication"]')) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3442421625172943';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
      <Card className="bg-white border-2 border-blue-200 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Cookie className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                Gestion des cookies
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Nous utilisons des cookies pour améliorer votre expérience et afficher des publicités personnalisées. 
                Vous pouvez gérer vos préférences ci-dessous.
              </p>
              
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={acceptAll} className="flex-1 min-w-0">
                    Accepter tout
                  </Button>
                  <Button onClick={acceptEssential} variant="outline" className="flex-1 min-w-0">
                    Essentiel uniquement
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        <Settings className="w-4 h-4 mr-2" />
                        Personnaliser
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Préférences des cookies</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Cookies essentiels</h4>
                            <p className="text-sm text-gray-600">Nécessaires au fonctionnement</p>
                          </div>
                          <Switch checked={preferences.essential} disabled />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Cookies analytiques</h4>
                            <p className="text-sm text-gray-600">Statistiques d'utilisation</p>
                          </div>
                          <Switch 
                            checked={preferences.analytics}
                            onCheckedChange={(checked) => 
                              setPreferences(prev => ({ ...prev, analytics: checked }))
                            }
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Cookies publicitaires</h4>
                            <p className="text-sm text-gray-600">Google AdSense</p>
                          </div>
                          <Switch 
                            checked={preferences.advertising}
                            onCheckedChange={(checked) => 
                              setPreferences(prev => ({ ...prev, advertising: checked }))
                            }
                          />
                        </div>
                        
                        <Button onClick={savePreferences} className="w-full">
                          Sauvegarder mes préférences
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Link href="/privacy-policy">
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      Politique de confidentialité
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}