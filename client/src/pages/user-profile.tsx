import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Trophy, 
  Crown, 
  Target,
  Zap,
  User,
  Calendar,
  BarChart3,
  ArrowLeft,
  Award,
  Clock,
  MapPin
} from 'lucide-react';
import { Link, useParams } from 'wouter';

interface UserProfileData {
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
  rank: number;
  totalTimeTyping: number;
  favoriteLanguage: string;
  recentTests: Array<{
    id: string;
    wpm: number;
    accuracy: number;
    date: string;
    mode: string;
    language: string;
  }>;
}

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['/api/users', userId],
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Mock data for demonstration
  const mockProfile: UserProfileData = {
    userId: userId || 'user-1',
    username: `Utilisateur ${userId}`,
    wpm: 95,
    accuracy: 97,
    tests: 245,
    country: 'France',
    continent: 'Europe',
    isPremium: true,
    profileImage: null,
    averageWpm: 88,
    bestWpm: 112,
    totalWords: 125000,
    joinDate: '2024-03-15T10:00:00Z',
    rank: 12,
    totalTimeTyping: 1800, // minutes
    favoriteLanguage: 'Français',
    recentTests: [
      { id: '1', wpm: 95, accuracy: 97, date: '2025-01-12T10:00:00Z', mode: '3min', language: 'fr' },
      { id: '2', wpm: 88, accuracy: 94, date: '2025-01-11T15:30:00Z', mode: '1min', language: 'fr' },
      { id: '3', wpm: 92, accuracy: 96, date: '2025-01-10T20:15:00Z', mode: '5min', language: 'en' },
    ]
  };

  const profile = profileData || mockProfile;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/leaderboard">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au classement
            </Button>
          </Link>

          {/* Profile Header */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {profile.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-3xl">{profile.username}</CardTitle>
                      {profile.isPremium && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          <Crown className="w-4 h-4 mr-1" />
                          Premium
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        <Trophy className="w-4 h-4 mr-1" />
                        #{profile.rank}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {profile.country}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Membre depuis {new Date(profile.joinDate).toLocaleDateString('fr-FR', {
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  WPM Actuel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{profile.wpm}</div>
                <div className="text-sm text-muted-foreground">
                  Moyenne: {profile.averageWpm} WPM
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Meilleur Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{profile.bestWpm}</div>
                <div className="text-sm text-muted-foreground">WPM maximum</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Précision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">{profile.accuracy}%</div>
                <div className="text-sm text-muted-foreground">Précision moyenne</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Tests Complétés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{profile.tests}</div>
                <div className="text-sm text-muted-foreground">Tests terminés</div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Statistiques Détaillées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total de mots tapés</span>
                  <span className="font-bold">{profile.totalWords.toLocaleString('fr-FR')}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Temps total de frappe</span>
                  <span className="font-bold">{Math.floor(profile.totalTimeTyping / 60)}h {profile.totalTimeTyping % 60}min</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Langue préférée</span>
                  <span className="font-bold">{profile.favoriteLanguage}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Classement mondial</span>
                  <Badge variant="outline" className="font-bold">
                    #{profile.rank}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Tests Récents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.recentTests.map((test) => (
                    <div key={test.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{test.mode}</Badge>
                          <Badge variant="outline" className="text-xs">{test.language}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {new Date(test.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{test.wpm} WPM</div>
                        <div className="text-sm text-muted-foreground">{test.accuracy}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Target className="w-4 h-4 mr-2" />
                    Défier cet utilisateur
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button variant="outline">
                    <Trophy className="w-4 h-4 mr-2" />
                    Voir le classement
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}