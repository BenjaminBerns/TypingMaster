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
}

export function StatsDashboard({ wpm, accuracy, errors, timeRemaining, timeElapsed, mode }: StatsDashboardProps) {
  const displayTime = mode === 'words' ? timeElapsed : timeRemaining;
  
  return (
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
  );
}
