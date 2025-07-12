import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Play } from 'lucide-react';
import type { TestMode, Difficulty, Language } from '@shared/schema';

interface TestConfigProps {
  mode: TestMode;
  difficulty: Difficulty;
  language: Language;
  onModeChange: (mode: TestMode) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onLanguageChange: (language: Language) => void;
  onStart: () => void;
  isActive: boolean;
}

export function TestConfig({
  mode,
  difficulty,
  language,
  onModeChange,
  onDifficultyChange,
  onLanguageChange,
  onStart,
  isActive,
}: TestConfigProps) {
  return (
    <Card className="shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">Mode</Label>
            <Select value={mode} onValueChange={onModeChange} disabled={isActive}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1min">1 minute</SelectItem>
                <SelectItem value="3min">3 minutes</SelectItem>
                <SelectItem value="5min">5 minutes</SelectItem>
                <SelectItem value="words">Nombre de mots</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">Difficulté</Label>
            <Select value={difficulty} onValueChange={onDifficultyChange} disabled={isActive}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Facile</SelectItem>
                <SelectItem value="medium">Moyen</SelectItem>
                <SelectItem value="hard">Difficile</SelectItem>
                <SelectItem value="random">Aléatoire</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">Langue</Label>
            <Select value={language} onValueChange={onLanguageChange} disabled={isActive}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">Anglais</SelectItem>
                <SelectItem value="es">Espagnol</SelectItem>
                <SelectItem value="de">Allemand</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={onStart}
              disabled={isActive}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              <Play className="w-4 h-4 mr-2" />
              Commencer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
