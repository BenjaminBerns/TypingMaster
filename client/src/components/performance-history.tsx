import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Trophy, Medal, Star } from 'lucide-react';
import { usePerformanceHistory } from '@/hooks/use-performance-history';
import { useAuth } from '@/hooks/useAuth';
import { useLocalHistory } from '@/hooks/use-local-history';

export function PerformanceHistory() {
  const { isAuthenticated } = useAuth();
  const { history, getStats, getRecentResults, clearHistory } = usePerformanceHistory();
  const { localHistory, getLocalStats, clearLocalHistory } = useLocalHistory();
  
  // Use local data if not authenticated, otherwise use database data
  const currentHistory = isAuthenticated ? history : localHistory;
  const stats = isAuthenticated ? getStats() : getLocalStats();
  const recentResults = isAuthenticated ? getRecentResults(5) : localHistory.slice(0, 5);
  const handleClearHistory = isAuthenticated ? clearHistory : clearLocalHistory;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case '1min': return 'bg-blue-100 text-blue-800';
      case '3min': return 'bg-violet-100 text-violet-800';
      case '5min': return 'bg-purple-100 text-purple-800';
      case 'words': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDateFromResult = (result: any) => {
    return result.completedAt || result.createdAt || new Date().toISOString();
  };

  const exportData = () => {
    const dataStr = JSON.stringify(currentHistory, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'typing-history.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Historique des Performances</h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportData}
              disabled={currentHistory.length === 0}
            >
              <Download className="w-4 h-4 mr-1" />
              Exporter
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearHistory}
              disabled={currentHistory.length === 0}
            >
              Effacer
            </Button>
          </div>
        </div>

        {currentHistory.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>Aucun test effectué pour le moment.</p>
            <p className="text-sm mt-2">Commencez votre premier test pour voir vos statistiques !</p>
          </div>
        ) : (
          <>
            {/* Statistics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600">WPM Moyen</p>
                <p className="text-2xl font-bold text-blue-700">{stats.avgWpm}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600">Précision Moyenne</p>
                <p className="text-2xl font-bold text-green-700">{stats.avgAccuracy}%</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-600">Tests Effectués</p>
                <p className="text-2xl font-bold text-purple-700">{stats.totalTests}</p>
              </div>
            </div>

            {/* Recent Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Mode</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">WPM</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Précision</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Erreurs</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Difficulté</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentResults.map((result, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{formatDate(getDateFromResult(result))}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={getModeColor(result.mode)}>
                          {result.mode}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-medium text-blue-600">{result.wpm}</td>
                      <td className="px-4 py-3 font-medium text-emerald-600">{result.accuracy}%</td>
                      <td className="px-4 py-3 font-medium text-red-600">{result.errors}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={getDifficultyColor(result.difficulty)}>
                          {result.difficulty}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Achievement Section */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Réalisations</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`flex items-center space-x-3 p-3 rounded-lg border ${stats.bestWpm >= 80 ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex-shrink-0">
                <Trophy className={`text-xl ${stats.bestWpm >= 80 ? 'text-yellow-500' : 'text-gray-400'}`} />
              </div>
              <div>
                <p className={`font-medium ${stats.bestWpm >= 80 ? 'text-yellow-800' : 'text-gray-600'}`}>
                  Vitesse Flash
                </p>
                <p className={`text-sm ${stats.bestWpm >= 80 ? 'text-yellow-600' : 'text-gray-500'}`}>
                  Atteindre 80 WPM
                </p>
              </div>
            </div>
            
            <div className={`flex items-center space-x-3 p-3 rounded-lg border ${stats.bestAccuracy >= 99 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex-shrink-0">
                <Medal className={`text-xl ${stats.bestAccuracy >= 99 ? 'text-green-500' : 'text-gray-400'}`} />
              </div>
              <div>
                <p className={`font-medium ${stats.bestAccuracy >= 99 ? 'text-green-800' : 'text-gray-600'}`}>
                  Précision Parfaite
                </p>
                <p className={`text-sm ${stats.bestAccuracy >= 99 ? 'text-green-600' : 'text-gray-500'}`}>
                  Atteindre 99% de précision
                </p>
              </div>
            </div>
            
            <div className={`flex items-center space-x-3 p-3 rounded-lg border ${stats.totalTests >= 10 ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex-shrink-0">
                <Star className={`text-xl ${stats.totalTests >= 10 ? 'text-purple-500' : 'text-gray-400'}`} />
              </div>
              <div>
                <p className={`font-medium ${stats.totalTests >= 10 ? 'text-purple-800' : 'text-gray-600'}`}>
                  Marathon
                </p>
                <p className={`text-sm ${stats.totalTests >= 10 ? 'text-purple-600' : 'text-gray-500'}`}>
                  Compléter 10 tests
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
