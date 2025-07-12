import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, X, Sparkles, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'wouter';

interface PremiumBannerProps {
  context?: 'typing-test' | 'profile' | 'general';
  onDismiss?: () => void;
}

export function PremiumBanner({ context = 'general', onDismiss }: PremiumBannerProps) {
  const { user, isAuthenticated } = useAuth();
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) onDismiss();
  };

  if (isDismissed || (isAuthenticated && user?.isPremium)) {
    return null;
  }

  const getContextContent = () => {
    switch (context) {
      case 'typing-test':
        return {
          title: "Débloquez des textes exclusifs",
          description: "Accédez à des textes techniques, médicaux et juridiques pour améliorer vos compétences spécialisées.",
          features: ["Textes de code", "Contenu médical", "Textes juridiques", "Mode multijoueur"],
          icon: <Sparkles className="w-5 h-5" />
        };
      case 'profile':
        return {
          title: "Statistiques avancées disponibles",
          description: "Analysez votre progression en détail avec des graphiques et des comparaisons.",
          features: ["Graphiques détaillés", "Analyse par touche", "Comparaison communauté", "Historique illimité"],
          icon: <TrendingUp className="w-5 h-5" />
        };
      default:
        return {
          title: "Passez au Premium",
          description: "Débloquez toutes les fonctionnalités avancées pour améliorer votre dactylographie.",
          features: ["Textes exclusifs", "Statistiques avancées", "Mode multijoueur", "Thèmes illimités"],
          icon: <Crown className="w-5 h-5" />
        };
    }
  };

  const content = getContextContent();

  return (
    <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                {content.icon}
                Premium
              </Badge>
              <h3 className="text-lg font-semibold text-gray-900">
                {content.title}
              </h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              {content.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {content.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="bg-white/50">
                  {feature}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-3">
              <Link to="/premium">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                  <Crown className="w-4 h-4 mr-2" />
                  Découvrir Premium
                </Button>
              </Link>
              
              <Button variant="outline" size="sm" onClick={handleDismiss}>
                Plus tard
              </Button>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDismiss}
            className="ml-4 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}