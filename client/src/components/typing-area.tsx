import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { getCharacterClass } from '@/lib/typing-utils';
import { useEffect, useRef } from 'react';

interface TypingAreaProps {
  textToType: string;
  userInput: string;
  currentPosition: number;
  isActive: boolean;
  isCompleted: boolean;
  onKeyPress: (key: string) => void;
  onReset: () => void;
}

export function TypingArea({
  textToType,
  userInput,
  currentPosition,
  isActive,
  isCompleted,
  onKeyPress,
  onReset,
}: TypingAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current && isActive) {
      textAreaRef.current.focus();
    }
  }, [isActive]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      return;
    }
    
    onKeyPress(e.key);
  };

  const renderTextWithHighlighting = () => {
    if (!textToType) return null;

    return (
      <div className="font-mono text-lg leading-relaxed">
        {textToType.split('').map((char, index) => {
          const isCurrentPosition = index === currentPosition;
          const typedChar = userInput[index];
          const className = getCharacterClass(char, typedChar, isCurrentPosition);
          
          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  if (!textToType) {
    return (
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-8">
          <div className="text-center text-gray-500">
            <p>Sélectionnez vos paramètres et cliquez sur "Commencer" pour débuter le test.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Zone de Test</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-gray-500 hover:text-blue-500"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 min-h-32">
            {renderTextWithHighlighting()}
          </div>

          <div className="relative">
            <textarea
              ref={textAreaRef}
              value={userInput}
              onChange={() => {}} // Controlled by onKeyDown
              onKeyDown={handleKeyDown}
              disabled={!isActive || isCompleted}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-lg leading-relaxed"
              placeholder={isActive ? "Tapez le texte ci-dessus..." : "Cliquez sur Commencer pour débuter"}
              spellCheck={false}
            />
            
            {isCompleted && (
              <div className="absolute inset-0 bg-green-50 bg-opacity-80 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-semibold text-green-700">Test terminé !</p>
                  <Button onClick={onReset} className="mt-2">
                    Recommencer
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
