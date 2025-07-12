import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown, 
  Globe, 
  Calendar,
  Target,
  Zap,
  User,
  MapPin,
  Clock,
  Eye
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'wouter';

type Region = 'world' | 'continent' | 'country';
type Continent = 'Europe' | 'Amérique du Nord' | 'Amérique du Sud' | 'Asie' | 'Afrique' | 'Océanie';
type Country = 'France' | 'Canada' | 'Belgique' | 'Suisse' | 'États-Unis' | 'Royaume-Uni' | 'Allemagne' | 'Espagne' | 'Italie' | 'Portugal' | 'Pays-Bas' | 'Autriche' | 'Brésil' | 'Argentine' | 'Chili' | 'Japon' | 'Corée du Sud' | 'Chine' | 'Inde' | 'Australie' | 'Nouvelle-Zélande';
type TimeRange = 'all-time' | 'year' | 'month' | 'week' | 'day';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  wpm: number;
  accuracy: number;
  tests: number;
  country?: string;
  continent?: string;
  isPremium?: boolean;
  profileImage?: string;
  averageWpm: number;
  bestWpm: number;
  totalWords: number;
  joinDate: string;
}

const regions = [
  { value: 'world', label: 'Monde', icon: <Globe className="w-4 h-4" /> },
  { value: 'continent', label: 'Continent', icon: <MapPin className="w-4 h-4" /> },
  { value: 'country', label: 'Pays', icon: <MapPin className="w-4 h-4" /> }
];

const continents = [
  { value: 'Europe', label: 'Europe' },
  { value: 'Amérique du Nord', label: 'Amérique du Nord' },
  { value: 'Amérique du Sud', label: 'Amérique du Sud' },
  { value: 'Asie', label: 'Asie' },
  { value: 'Afrique', label: 'Afrique' },
  { value: 'Océanie', label: 'Océanie' }
];

const countries = [
  { value: 'France', label: 'France' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Belgique', label: 'Belgique' },
  { value: 'Suisse', label: 'Suisse' },
  { value: 'États-Unis', label: 'États-Unis' },
  { value: 'Royaume-Uni', label: 'Royaume-Uni' },
  { value: 'Allemagne', label: 'Allemagne' },
  { value: 'Espagne', label: 'Espagne' },
  { value: 'Italie', label: 'Italie' },
  { value: 'Portugal', label: 'Portugal' },
  { value: 'Pays-Bas', label: 'Pays-Bas' },
  { value: 'Autriche', label: 'Autriche' },
  { value: 'Brésil', label: 'Brésil' },
  { value: 'Argentine', label: 'Argentine' },
  { value: 'Chili', label: 'Chili' },
  { value: 'Japon', label: 'Japon' },
  { value: 'Corée du Sud', label: 'Corée du Sud' },
  { value: 'Chine', label: 'Chine' },
  { value: 'Inde', label: 'Inde' },
  { value: 'Australie', label: 'Australie' },
  { value: 'Nouvelle-Zélande', label: 'Nouvelle-Zélande' }
];

const timeRanges = [
  { value: 'all-time', label: 'Depuis toujours', icon: <Clock className="w-4 h-4" /> },
  { value: 'year', label: 'Cette année', icon: <Calendar className="w-4 h-4" /> },
  { value: 'month', label: 'Ce mois', icon: <Calendar className="w-4 h-4" /> },
  { value: 'week', label: 'Cette semaine', icon: <Calendar className="w-4 h-4" /> },
  { value: 'day', label: 'Aujourd\'hui', icon: <Calendar className="w-4 h-4" /> }
];

export default function Leaderboard() {
  const { user, isAuthenticated } = useAuth();
  const [selectedRegion, setSelectedRegion] = useState<Region>('world');
  const [selectedContinent, setSelectedContinent] = useState<Continent>('Europe');
  const [selectedCountry, setSelectedCountry] = useState<Country>('France');
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('all-time');

  const { data: leaderboard, isLoading, error } = useQuery({
    queryKey: [`/api/leaderboard/${selectedRegion}/${selectedContinent}/${selectedCountry}/${selectedTimeRange}`],
    retry: false,
  });

  // Debug logging
  console.log('Leaderboard data:', leaderboard);
  console.log('Is loading:', isLoading);
  console.log('Error:', error);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-500" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRegionLabel = (region: Region) => {
    if (region === 'world') return 'Monde';
    if (region === 'continent') return selectedContinent;
    if (region === 'country') return selectedCountry;
    return 'Monde';
  };

  const getTimeRangeLabel = (timeRange: TimeRange) => {
    return timeRanges.find(t => t.value === timeRange)?.label || 'Depuis toujours';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-yellow-300" />
                    Classement Global
                  </CardTitle>
                  <p className="text-blue-100 mt-2">
                    Découvrez les meilleurs dactylos de la communauté
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <Target className="w-6 h-6 text-yellow-300" />
                  <span className="text-sm text-blue-100">
                    {getRegionLabel(selectedRegion)} • {getTimeRangeLabel(selectedTimeRange)}
                  </span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Filtres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Région</label>
                  <Select value={selectedRegion} onValueChange={(value: Region) => setSelectedRegion(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une région" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.value} value={region.value}>
                          <div className="flex items-center gap-2">
                            {region.icon}
                            {region.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedRegion === 'continent' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Continent</label>
                    <Select value={selectedContinent} onValueChange={(value: Continent) => setSelectedContinent(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un continent" />
                      </SelectTrigger>
                      <SelectContent>
                        {continents.map((continent) => (
                          <SelectItem key={continent.value} value={continent.value}>
                            {continent.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {selectedRegion === 'country' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Pays</label>
                    <Select value={selectedCountry} onValueChange={(value: Country) => setSelectedCountry(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un pays" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-2">Période</label>
                  <Select value={selectedTimeRange} onValueChange={(value: TimeRange) => setSelectedTimeRange(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une période" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeRanges.map((timeRange) => (
                        <SelectItem key={timeRange.value} value={timeRange.value}>
                          <div className="flex items-center gap-2">
                            {timeRange.icon}
                            {timeRange.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current User Position */}
          {isAuthenticated && user && (
            <Card className="mb-6 border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Votre Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold">#42</span>
                    </div>
                    <div>
                      <p className="font-medium">{user.firstName || user.email}</p>
                      <p className="text-sm text-muted-foreground">85 WPM • 96% de précision</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Target className="w-4 h-4 mr-2" />
                    Améliorer
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Top 100 - {getRegionLabel(selectedRegion)} ({getTimeRangeLabel(selectedTimeRange)})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-muted-foreground mt-2">Chargement du classement...</p>
                </div>
              ) : leaderboard && Array.isArray(leaderboard) && leaderboard.length > 0 ? (
                <div className="space-y-2">
                  {(leaderboard as LeaderboardEntry[]).map((entry) => (
                    <TooltipProvider key={entry.userId}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/users/${entry.userId}`}>
                            <div
                              className={`
                                flex items-center justify-between p-4 rounded-lg border transition-colors cursor-pointer
                                ${entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-white border-gray-200'}
                                hover:bg-gray-50 hover:shadow-md
                              `}>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-8">
                                  {getRankIcon(entry.rank)}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">
                                    {entry.username.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{entry.username}</span>
                                    {entry.isPremium && (
                                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                                        <Crown className="w-3 h-3 mr-1" />
                                        Premium
                                      </Badge>
                                    )}
                                    <Badge variant="outline" className="text-xs">
                                      #{entry.rank}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {entry.tests} tests • {entry.country}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="text-right">
                                  <div className="font-bold text-lg">{entry.wpm}</div>
                                  <div className="text-xs text-muted-foreground">WPM</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-lg">{entry.accuracy}%</div>
                                  <div className="text-xs text-muted-foreground">Précision</div>
                                </div>
                                <div className="text-gray-400">
                                  <Eye className="w-4 h-4" />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-xs">
                          <div className="p-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                <span className="text-white font-bold text-xs">
                                  {entry.username.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{entry.username}</p>
                                <p className="text-xs text-muted-foreground">Rang #{entry.rank}</p>
                              </div>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">WPM actuel</p>
                                <p className="font-bold">{entry.wpm}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Meilleur WPM</p>
                                <p className="font-bold">{entry.bestWpm}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Précision</p>
                                <p className="font-bold">{entry.accuracy}%</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Tests</p>
                                <p className="font-bold">{entry.tests}</p>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Membre depuis {new Date(entry.joinDate).toLocaleDateString('fr-FR', { 
                                month: 'long', 
                                year: 'numeric' 
                              })}
                            </div>
                            <div className="text-xs text-center text-blue-600 font-medium">
                              Cliquez pour voir le profil complet
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Aucun utilisateur trouvé</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Essayez de modifier les filtres ou revenez plus tard
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="mt-6 bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Rejoignez la compétition !</h3>
                <p className="text-green-100 mb-4">
                  Améliorez votre vitesse de frappe et grimpez dans le classement
                </p>
                <div className="flex gap-4 justify-center">
                  <Link to="/">
                    <Button className="bg-white text-green-600 hover:bg-gray-100">
                      <Target className="w-4 h-4 mr-2" />
                      Commencer un test
                    </Button>
                  </Link>
                  <Link to="/premium">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                      <Crown className="w-4 h-4 mr-2" />
                      Devenir Premium
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}