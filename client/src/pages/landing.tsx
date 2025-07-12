import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Keyboard, Timer, Trophy, TrendingUp, Globe, User } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Test de Dactylographie
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Améliorez votre vitesse de frappe avec notre plateforme moderne. 
            Suivez vos progrès, défiez-vous avec différents niveaux et langues.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = "/api/login"}
            >
              <User className="w-5 h-5 mr-2" />
              Se connecter
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = "/test"}
            >
              <Keyboard className="w-5 h-5 mr-2" />
              Essayer maintenant
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Timer className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <CardTitle>Tests Chronométrés</CardTitle>
              <CardDescription>
                Modes 1, 3, 5 minutes ou par nombre de mots
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Choisissez votre défi et tapez jusqu'à ce que le temps s'écoule
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Globe className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <CardTitle>Multilingue</CardTitle>
              <CardDescription>
                Français, Anglais, Espagnol, Allemand
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Pratiquez dans votre langue préférée ou apprenez une nouvelle langue
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <CardTitle>Niveaux de Difficulté</CardTitle>
              <CardDescription>
                Facile, Moyen, Difficile, Aléatoire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Progressez à votre rythme avec des textes adaptés à votre niveau
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
              <CardTitle>Statistiques Détaillées</CardTitle>
              <CardDescription>
                WPM, Précision, Erreurs en temps réel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Suivez vos progrès et identifiez vos points d'amélioration
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Keyboard className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <CardTitle>Clavier Virtuel</CardTitle>
              <CardDescription>
                Visualisation des touches en temps réel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Apprenez la position des touches avec le clavier animé
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <User className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
              <CardTitle>Profil Personnel</CardTitle>
              <CardDescription>
                Historique et progression sauvegardés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Créez un compte pour sauvegarder vos performances
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Rejoignez notre communauté et améliorez votre vitesse de frappe dès maintenant !
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => window.location.href = "/api/login"}
          >
            <User className="w-5 h-5 mr-2" />
            Créer un compte
          </Button>
        </div>
      </div>
    </div>
  );
}