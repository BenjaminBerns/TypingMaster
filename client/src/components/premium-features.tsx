import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Crown, 
  Lock, 
  BarChart3, 
  Users, 
  Palette, 
  Download,
  Target,
  Code,
  Zap,
  Star
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'wouter';

interface PremiumFeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isPremium?: boolean;
  isLocked?: boolean;
  children?: React.ReactNode;
}

export function PremiumFeature({ 
  title, 
  description, 
  icon, 
  isPremium = false, 
  isLocked = false,
  children 
}: PremiumFeatureProps) {
  const { user, isAuthenticated } = useAuth();
  const hasAccess = isAuthenticated && user?.isPremium;

  if (isLocked && !hasAccess) {
    return (
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 to-gray-200/80 backdrop-blur-sm" />
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        </div>
        
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-gray-500">
            <Lock className="w-5 h-5" />
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <p className="text-gray-500 mb-4">{description}</p>
          <Link to="/premium">
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
              <Crown className="w-4 h-4 mr-2" />
              Débloquer
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-2 ${isPremium ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50' : 'border-gray-200'}`}>
      {isPremium && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        {children}
      </CardContent>
    </Card>
  );
}

// Composants spécialisés pour différentes fonctionnalités premium
export function AdvancedStatsFeature() {
  const { user, isAuthenticated } = useAuth();
  const hasAccess = isAuthenticated && user?.isPremium;

  return (
    <PremiumFeature
      title="Statistiques Avancées"
      description="Analysez votre progression en détail avec des graphiques et des métriques avancées."
      icon={<BarChart3 className="w-5 h-5" />}
      isPremium={true}
      isLocked={!hasAccess}
    >
      {hasAccess ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-600">Vitesse par lettre</p>
              <p className="text-xs text-blue-500">Identifiez vos lettres lentes</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-600">Analyse d'erreurs</p>
              <p className="text-xs text-green-500">Corrigez vos faiblesses</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <BarChart3 className="w-4 h-4 mr-2" />
            Voir les statistiques
          </Button>
        </div>
      ) : null}
    </PremiumFeature>
  );
}

export function CustomTextsFeature() {
  const { user, isAuthenticated } = useAuth();
  const hasAccess = isAuthenticated && user?.isPremium;

  return (
    <PremiumFeature
      title="Textes Personnalisés"
      description="Créez vos propres textes ou accédez à des contenus exclusifs techniques."
      icon={<Code className="w-5 h-5" />}
      isPremium={true}
      isLocked={!hasAccess}
    >
      {hasAccess ? (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Code Python</Badge>
            <Badge variant="outline">Médical</Badge>
            <Badge variant="outline">Juridique</Badge>
            <Badge variant="outline">Technique</Badge>
          </div>
          <Button variant="outline" className="w-full">
            <Target className="w-4 h-4 mr-2" />
            Créer un texte
          </Button>
        </div>
      ) : null}
    </PremiumFeature>
  );
}

export function MultiplayerFeature() {
  return (
    <PremiumFeature
      title="Mode Multijoueur"
      description="Défiez d'autres utilisateurs en temps réel et participez à des tournois."
      icon={<Users className="w-5 h-5" />}
      isPremium={false}
      isLocked={false}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">1,234 joueurs en ligne</span>
        </div>
        <Button variant="outline" className="w-full">
          <Users className="w-4 h-4 mr-2" />
          Rejoindre une partie
        </Button>
      </div>
    </PremiumFeature>
  );
}

export function ThemeCustomizationFeature() {
  const { user, isAuthenticated } = useAuth();
  const hasAccess = isAuthenticated && user?.isPremium;

  return (
    <PremiumFeature
      title="Thèmes Personnalisés"
      description="Personnalisez l'apparence avec des thèmes exclusifs et des options avancées."
      icon={<Palette className="w-5 h-5" />}
      isPremium={true}
      isLocked={!hasAccess}
    >
      {hasAccess ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
            <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
          </div>
          <Button variant="outline" className="w-full">
            <Palette className="w-4 h-4 mr-2" />
            Personnaliser
          </Button>
        </div>
      ) : null}
    </PremiumFeature>
  );
}

export function DataExportFeature() {
  const { user, isAuthenticated } = useAuth();
  const hasAccess = isAuthenticated && user?.isPremium;

  return (
    <PremiumFeature
      title="Export de Données"
      description="Exportez vos statistiques et résultats en PDF ou CSV pour un usage professionnel."
      icon={<Download className="w-5 h-5" />}
      isPremium={true}
      isLocked={!hasAccess}
    >
      {hasAccess ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <Badge variant="outline">PDF</Badge>
            <Badge variant="outline">CSV</Badge>
            <Badge variant="outline">Excel</Badge>
          </div>
          <Button variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Exporter les données
          </Button>
        </div>
      ) : null}
    </PremiumFeature>
  );
}