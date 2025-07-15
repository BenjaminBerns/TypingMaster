import { Link } from 'wouter';
import { Shield, Cookie, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Site Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Typing Master</h3>
              <p className="text-gray-400 mb-4">
                Améliorez votre vitesse de frappe avec notre plateforme interactive 
                et rejoignez la communauté des dactylos.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Site sécurisé et conforme RGPD</span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-400 hover:text-white transition-colors">
                  Accueil
                </Link>
                <Link href="/leaderboard" className="block text-gray-400 hover:text-white transition-colors">
                  Classement
                </Link>
                <Link href="/multiplayer" className="block text-gray-400 hover:text-white transition-colors">
                  Multijoueur
                </Link>
                <Link href="/premium" className="block text-gray-400 hover:text-white transition-colors">
                  Premium
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Informations légales</h4>
              <div className="space-y-2">
                <Link href="/privacy-policy" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Shield className="w-4 h-4" />
                  Politique de confidentialité
                </Link>
                <button 
                  onClick={() => {
                    localStorage.removeItem('cookie-consent');
                    window.location.reload();
                  }}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Cookie className="w-4 h-4" />
                  Gestion des cookies
                </button>
                <a 
                  href="https://adssettings.google.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Paramètres Google Ads
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Typing Master. Tous droits réservés.
              </p>
              <div className="text-gray-400 text-sm">
                <p>Publicités fournies par Google AdSense</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}