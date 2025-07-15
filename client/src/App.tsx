import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import { CookieBanner } from "@/components/cookie-banner";
import { Footer } from "@/components/footer";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import TypingTest from "@/pages/typing-test";
import Landing from "@/pages/landing";
import Profile from "@/pages/profile";
import Premium from "@/pages/premium";
import Leaderboard from "@/pages/leaderboard";
import UserProfile from "@/pages/user-profile";
import Multiplayer from "@/pages/multiplayer";
import PrivacyPolicy from "@/pages/privacy-policy";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  return (
    <Switch>
      <Route path="/" component={TypingTest} />
      <Route path="/landing" component={Landing} />
      <Route path="/test" component={TypingTest} />
      <Route path="/profile" component={isAuthenticated ? Profile : NotFound} />
      <Route path="/premium" component={Premium} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/multiplayer" component={Multiplayer} />
      <Route path="/users/:userId" component={UserProfile} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Load Google Ads script only if user has consented
  useEffect(() => {
    const checkConsentAndLoadAds = () => {
      const consent = localStorage.getItem('cookie-consent');
      if (consent) {
        const preferences = JSON.parse(consent);
        if (preferences.advertising) {
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
        }
      }
    };

    // Check initially and on storage change
    checkConsentAndLoadAds();
    
    // Listen for storage changes (consent updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') {
        checkConsentAndLoadAds();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="pb-8">
            <Router />
          </main>
          <Footer />
          <CookieBanner />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
