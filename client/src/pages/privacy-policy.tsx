import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, Cookie, Eye, UserCheck, Mail, AlertCircle } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-600" />
                Politique de Confidentialité
              </CardTitle>
              <p className="text-gray-600">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles 
                  lors de votre utilisation de notre site de test de dactylographie.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Collecte des données */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Données collectées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Données personnelles</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Adresse e-mail (lors de la connexion)</li>
                      <li>Nom et prénom (optionnel)</li>
                      <li>Photo de profil (optionnel)</li>
                      <li>Pays et région (pour le classement)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Données de performance</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Vitesse de frappe (WPM)</li>
                      <li>Précision et erreurs</li>
                      <li>Historique des tests</li>
                      <li>Statistiques de progression</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookies et tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cookie className="w-5 h-5" />
                  Cookies et technologies de suivi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-amber-800">Cookies publicitaires</span>
                    </div>
                    <p className="text-amber-700 text-sm">
                      Notre site utilise Google AdSense pour afficher des publicités. Ces services utilisent des cookies 
                      pour personnaliser les annonces en fonction de vos centres d'intérêt.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Types de cookies utilisés</h3>
                    <div className="space-y-3">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium">Cookies essentiels</h4>
                        <p className="text-sm text-gray-600">Nécessaires au fonctionnement du site (authentification, préférences)</p>
                      </div>
                      <div className="border-l-4 border-yellow-500 pl-4">
                        <h4 className="font-medium">Cookies publicitaires (Google AdSense)</h4>
                        <p className="text-sm text-gray-600">Utilisés par Google pour afficher des publicités personnalisées</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium">Cookies analytiques</h4>
                        <p className="text-sm text-gray-600">Permettent d'analyser l'utilisation du site pour l'améliorer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consentement et droits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Vos droits et consentement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Gestion du consentement</h3>
                    <p className="text-gray-700 mb-3">
                      Conformément au RGPD, vous avez le droit de contrôler l'utilisation de vos données personnelles :
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Accepter ou refuser les cookies publicitaires</li>
                      <li>Modifier vos préférences à tout moment</li>
                      <li>Demander la suppression de vos données</li>
                      <li>Exporter vos données personnelles</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Gestion des publicités Google</h4>
                    <p className="text-blue-700 text-sm mb-2">
                      Vous pouvez personnaliser vos préférences publicitaires Google :
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-blue-700 text-sm">
                      <li>
                        <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" 
                           className="underline hover:text-blue-800">
                          Paramètres des annonces Google
                        </a>
                      </li>
                      <li>
                        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" 
                           className="underline hover:text-blue-800">
                          Désactiver Google Analytics
                        </a>
                      </li>
                      <li>
                        <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" 
                           className="underline hover:text-blue-800">
                          Opt-out publicitaire général
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Partenaires et partage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Partenaires et partage des données
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Services tiers utilisés</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">Google AdSense</span>
                        <span className="text-sm text-gray-600">Publicité personnalisée</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">Replit Auth</span>
                        <span className="text-sm text-gray-600">Authentification</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">Neon Database</span>
                        <span className="text-sm text-gray-600">Stockage des données</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Aucune vente de données</h3>
                    <p className="text-gray-700">
                      Nous ne vendons, ne louons, ni ne partageons vos données personnelles avec des tiers 
                      à des fins commerciales, sauf dans les cas mentionnés dans cette politique.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact et questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Pour toute question concernant cette politique de confidentialité ou vos données personnelles, 
                    vous pouvez nous contacter :
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium">Support technique</p>
                    <p className="text-sm text-gray-600">Utilisez le système de support intégré sur le site</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Cette politique peut être mise à jour périodiquement. Les modifications importantes seront notifiées aux utilisateurs.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}