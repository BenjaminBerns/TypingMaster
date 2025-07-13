import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { 
  Check, 
  Crown, 
  Zap, 
  BarChart3, 
  Users, 
  Palette, 
  Download, 
  Wifi, 
  Target,
  Code,
  Globe,
  Trophy,
  Shield,
  Star
} from 'lucide-react';
import { HorizontalAdBanner } from '@/components/ad-banner';

const premiumFeatures = [
  {
    category: "🧠 Contenu et entraînement personnalisés",
    icon: <Target className="w-5 h-5" />,
    features: [
      "Textes exclusifs (code, médical, juridique, technique)",
      "Création et import de textes personnalisés",
      "Programmes d'entraînement intelligents",
      "Exercices générés selon vos faiblesses",
      "Analyse des mots fréquents mal tapés"
    ]
  },
  {
    category: "📊 Statistiques avancées",
    icon: <BarChart3 className="w-5 h-5" />,
    features: [
      "Historique détaillé avec graphiques",
      "Suivi sur plusieurs semaines/mois",
      "Analyse par touche et par lettre",
      "Statistiques de vitesse par caractère",
      "Comparaison avec la communauté",
      "Classements globaux et par niveau"
    ]
  },
  {
    category: "🎮 Fonctionnalités sociales premium",
    icon: <Users className="w-5 h-5" />,
    features: [
      "Classements premium exclusifs",
      "Tournois et défis communautaires",
      "Salles privées personnalisées",
      "Statistiques de compétition avancées"
    ]
  },
  {
    category: "🎨 Personnalisation",
    icon: <Palette className="w-5 h-5" />,
    features: [
      "Thèmes personnalisables illimités",
      "Mode plein écran sans distraction",
      "Choix de police et taille du texte",
      "Interface adaptée aux malvoyants",
      "Couleurs et animations personnalisées"
    ]
  },
  {
    category: "🔓 Options avancées",
    icon: <Shield className="w-5 h-5" />,
    features: [
      "Mode hors-ligne complet",
      "Aucune publicité",
      "Export en PDF et CSV",
      "Sauvegarde cloud illimitée",
      "Support prioritaire"
    ]
  }
];

const plans = [
  {
    name: "Gratuit",
    price: "0€",
    period: "toujours",
    features: [
      "Tests de base",
      "Statistiques simples",
      "Historique limité (30 jours)",
      "Thèmes de base",
      "Communauté"
    ],
    limitations: [
      "Publicités",
      "Fonctionnalités limitées",
      "Pas de personnalisation avancée"
    ],
    popular: false
  },
  {
    name: "Premium",
    price: "4,99€",
    period: "par mois",
    features: [
      "Tout du plan gratuit",
      "Textes exclusifs et personnalisés",
      "Statistiques avancées",
      "Mode multijoueur",
      "Thèmes illimités",
      "Mode hors-ligne",
      "Export des données",
      "Aucune publicité",
      "Support prioritaire"
    ],
    limitations: [],
    popular: true
  },
  {
    name: "Pro",
    price: "9,99€",
    period: "par mois",
    features: [
      "Tout du plan Premium",
      "Tableau de bord coach/formateur",
      "Gestion de groupes d'élèves",
      "API d'intégration",
      "Rapports détaillés",
      "Statistiques d'équipe",
      "Licences multiples"
    ],
    limitations: [],
    popular: false
  }
];

export default function Premium() {
  const { user, isAuthenticated } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (planName: string) => {
    if (!isAuthenticated) {
      window.location.href = '/api/login';
      return;
    }
    
    setIsLoading(true);
    setSelectedPlan(planName);
    
    try {
      // TODO: Implement Stripe payment
      console.log('Subscribing to:', planName);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              Passez au Premium
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Débloquez tout le potentiel de votre apprentissage avec nos fonctionnalités avancées
          </p>
        </div>

        {/* Ad Banner - Top */}
        <div className="mb-12">
          <HorizontalAdBanner 
            slot="4567890123" 
            className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
          />
        </div>

        {/* Feature Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {premiumFeatures.map((category, index) => (
            <Card key={index} className="border-2 border-purple-100 hover:border-purple-200 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  {category.icon}
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Choisissez votre plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative border-2 ${
                  plan.popular 
                    ? 'border-purple-500 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Plus populaire
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-purple-600">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <>
                      <Separator />
                      <div className="text-sm text-gray-500">
                        <p className="font-medium mb-2">Limitations :</p>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, lIndex) => (
                            <li key={lIndex} className="flex items-start gap-2">
                              <span className="text-red-400">•</span>
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                  
                  <Button 
                    className={`w-full mt-6 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white' 
                        : plan.name === 'Gratuit' 
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    onClick={() => handleSubscribe(plan.name)}
                    disabled={isLoading || plan.name === 'Gratuit'}
                  >
                    {isLoading && selectedPlan === plan.name ? (
                      <>
                        <Zap className="w-4 h-4 mr-2 animate-spin" />
                        Chargement...
                      </>
                    ) : plan.name === 'Gratuit' ? (
                      'Plan actuel'
                    ) : (
                      <>
                        <Crown className="w-4 h-4 mr-2" />
                        Choisir {plan.name}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ad Banner - Bottom */}
        <div className="mb-8">
          <HorizontalAdBanner 
            slot="5678901234" 
            className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
          />
        </div>

        {/* FAQ or Additional Info */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-gray-900">
                Pourquoi choisir Premium ?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                Rejoignez plus de 10 000 utilisateurs qui ont déjà amélioré leurs compétences 
                de dactylographie avec nos outils premium.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span>✓ Essai gratuit 14 jours</span>
                <span>✓ Annulation à tout moment</span>
                <span>✓ Support 24/7</span>
                <span>✓ Remboursement garanti</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}