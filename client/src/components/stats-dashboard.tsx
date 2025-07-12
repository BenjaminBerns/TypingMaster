import { Card, CardContent } from '@/components/ui/card';
import { Gauge, Target, AlertTriangle, Clock } from 'lucide-react';
import { formatTime } from '@/lib/typing-utils';

interface StatsDashboardProps {
  wpm: number;
  accuracy: number;
  errors: number;
  timeRemaining: number;
  timeElapsed: number;
  mode: string;
  targetWpm?: number | null;
  challengeUserId?: string | null;
}

export function StatsDashboard({ wpm, accuracy, errors, timeRemaining, timeElapsed, mode, targetWpm, challengeUserId }: StatsDashboardProps) {
  const displayTime = mode === 'words' ? timeElapsed : timeRemaining;
  
  return (
    <div className="space-y-6">
      {/* Challenge Banner */}
      {targetWpm && challengeUserId && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">🎯 Mode Défi Activé</h3>
              <p className="text-blue-100">Dépassez {targetWpm} WPM pour remporter ce défi !</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{targetWpm} WPM</div>
              <div className="text-sm text-blue-100">Objectif à battre</div>
            </div>
          </div>
          {/* Progress indicator */}
          <div className="mt-3">
            <div className="bg-blue-700 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  wpm >= targetWpm ? 'bg-green-400' : 'bg-white'
                }`}
                style={{ width: `${Math.min(100, (wpm / targetWpm) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-blue-100 mt-1">
              <span>Votre vitesse: {wpm} WPM</span>
              <span className={wpm >= targetWpm ? 'text-green-400 font-bold' : ''}>
                {wpm >= targetWpm ? '✅ Défi réussi !' : `${Math.max(0, targetWpm - wpm)} WPM restants`}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Vitesse (WPM)</p>
              <p className="text-3xl font-bold text-blue-500">{wpm}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <Gauge className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Précision (%)</p>
              <p className="text-3xl font-bold text-emerald-500">{accuracy}</p>
            </div>
            <div className="bg-emerald-100 rounded-full p-3">
              <Target className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Erreurs</p>
              <p className="text-3xl font-bold text-red-500">{errors}</p>
            </div>
            <div className="bg-red-100 rounded-full p-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Temps</p>
              <p className="text-3xl font-bold text-violet-500">{formatTime(displayTime)}</p>
            </div>
            <div className="bg-violet-100 rounded-full p-3">
              <Clock className="h-5 w-5 text-violet-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
