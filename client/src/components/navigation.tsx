import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { 
  Home, 
  Trophy, 
  Crown, 
  User, 
  Keyboard, 
  BarChart3,
  Menu,
  X,
  Users
} from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Test de frappe', icon: <Keyboard className="w-4 h-4" /> },
    { path: '/multiplayer', label: 'Multijoueur', icon: <Users className="w-4 h-4" /> },
    { path: '/leaderboard', label: 'Classement', icon: <Trophy className="w-4 h-4" /> },
    { path: '/premium', label: 'Premium', icon: <Crown className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Keyboard className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TypingMaster</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`flex items-center gap-2 ${
                    isActive(item.path) 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {item.path === '/premium' && !user?.isPremium && (
                    <Badge className="bg-yellow-500 text-white text-xs px-1 py-0 ml-1">
                      NEW
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {/* Profile/Statistics Link */}
            {isAuthenticated && (
              <Link href="/profile">
                <Button
                  variant="ghost"
                  className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden lg:inline">Mes stats</span>
                </Button>
              </Link>
            )}

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2">
                  {user?.isPremium && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  <span className="text-sm text-gray-700 hidden lg:inline">
                    {user?.firstName || user?.email}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = "/api/logout"}
                  className="hidden sm:flex"
                >
                  Se déconnecter
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = "/api/login"}
                className="hidden sm:flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Se connecter
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive(item.path) 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                    {item.path === '/premium' && !user?.isPremium && (
                      <Badge className="bg-yellow-500 text-white text-xs px-1 py-0 ml-auto">
                        NEW
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
              
              {isAuthenticated && (
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Mes statistiques
                  </Button>
                </Link>
              )}

              <div className="border-t border-gray-200 pt-2 mt-2">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-2">
                      {user?.isPremium && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                      <span className="text-sm text-gray-700">
                        {user?.firstName || user?.email}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.location.href = "/api/logout"}
                    >
                      Se déconnecter
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.location.href = "/api/login"}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Se connecter
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}