import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Clock, Target, Zap, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function Profile() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

  const { data: testResults, isLoading: isLoadingResults } = useQuery({
    queryKey: ["/api/user/test-results"],
    enabled: isAuthenticated,
    retry: false,
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Non autorisé",
        description: "Vous devez être connecté pour accéder à cette page.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <div className="flex justify-center items-center min-h-screen">Redirection...</div>;
  }

  const stats = testResults ? {
    totalTests: testResults.length,
    averageWpm: testResults.reduce((acc: number, result: any) => acc + result.wpm, 0) / testResults.length,
    averageAccuracy: testResults.reduce((acc: number, result: any) => acc + result.accuracy, 0) / testResults.length,
    bestWpm: Math.max(...testResults.map((result: any) => result.wpm)),
    favoriteLanguage: testResults.reduce((acc: any, result: any) => {
      acc[result.language] = (acc[result.language] || 0) + 1;
      return acc;
    }, {}),
  } : null;

  const favoriteLanguage = stats ? Object.entries(stats.favoriteLanguage).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] : null;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Mon Profil</h1>
        <p className="text-muted-foreground">Gérez vos statistiques et votre historique de frappe</p>
      </div>

      {/* User Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Informations du profil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            {user?.profileImageUrl && (
              <img 
                src={user.profileImageUrl} 
                alt="Photo de profil" 
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold">
                {user?.firstName && user?.lastName 
                  ? `${user.firstName} ${user.lastName}`
                  : user?.email || "Utilisateur"}
              </h3>
              <p className="text-muted-foreground">{user?.email}</p>
              <Button 
                variant="outline" 
                size="sm"
                className="mt-2"
                onClick={() => window.location.href = "/api/logout"}
              >
                Se déconnecter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4" />
                Tests complétés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTests}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Vitesse moyenne
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(stats.averageWpm)} WPM</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Précision moyenne
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(stats.averageAccuracy)}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Meilleure vitesse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(stats.bestWpm)} WPM</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des tests</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingResults ? (
            <div className="text-center py-4">Chargement de l'historique...</div>
          ) : testResults && testResults.length > 0 ? (
            <div className="space-y-4">
              {testResults.slice(0, 10).map((result: any) => (
                <div key={result.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2">
                      <Badge variant="outline">{result.mode}</Badge>
                      <Badge variant="outline">{result.difficulty}</Badge>
                      <Badge variant="outline">{result.language}</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(result.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">{result.wpm}</span> WPM
                    </div>
                    <div>
                      <span className="font-semibold">{result.accuracy}%</span> Précision
                    </div>
                    <div>
                      <span className="font-semibold">{result.errors}</span> Erreurs
                    </div>
                    <div>
                      <span className="font-semibold">{result.charactersTyped}</span> Caractères
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Aucun test complété pour le moment.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Complétez votre premier test pour voir vos statistiques ici.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}