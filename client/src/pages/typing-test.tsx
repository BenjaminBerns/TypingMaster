import { useState, useEffect } from 'react';
import { Keyboard, BarChart3, History, Settings } from 'lucide-react';
import { TestConfig } from '@/components/test-config';
import { StatsDashboard } from '@/components/stats-dashboard';
import { TypingArea } from '@/components/typing-area';
import { VirtualKeyboard } from '@/components/virtual-keyboard';
import { PerformanceHistory } from '@/components/performance-history';
import { useTypingTest } from '@/hooks/use-typing-test';
import { usePerformanceHistory } from '@/hooks/use-performance-history';
import { useQuery } from '@tanstack/react-query';

export default function TypingTest() {
  const { state, startTest, handleKeyPress, resetTest, updateSettings } = useTypingTest();
  const { addResult } = usePerformanceHistory();
  const [currentText, setCurrentText] = useState('');

  // Fetch text sample when settings change
  const { data: textData, refetch: refetchText } = useQuery({
    queryKey: ['/api/text-samples', state.language, state.difficulty],
    enabled: false,
  });

  useEffect(() => {
    if (textData?.text) {
      setCurrentText(textData.text);
    }
  }, [textData]);

  // Save result when test is completed
  useEffect(() => {
    if (state.isCompleted && state.timeElapsed > 0) {
      addResult({
        wpm: state.wpm,
        accuracy: state.accuracy,
        errors: state.errors,
        mode: state.mode,
        difficulty: state.difficulty,
        language: state.language,
        duration: state.timeElapsed,
        charactersTyped: state.currentPosition,
      });
    }
  }, [state.isCompleted, state.wpm, state.accuracy, state.errors, state.mode, state.difficulty, state.language, state.timeElapsed, state.currentPosition, addResult]);

  const handleStart = async () => {
    try {
      await refetchText();
      if (textData?.text) {
        startTest(textData.text);
      }
    } catch (error) {
      console.error('Error fetching text:', error);
      // Fallback to default text
      const fallbackText = "La programmation est l'art de dire à un ordinateur ce qu'il doit faire. C'est un processus créatif qui combine logique et imagination.";
      startTest(fallbackText);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (state.isActive && !state.isCompleted) {
      handleKeyPress(e.key);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isActive, state.isCompleted]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Keyboard className="text-2xl text-blue-500" />
              <h1 className="text-xl font-bold text-gray-900">TypingMaster</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#stats" className="text-gray-600 hover:text-blue-500 transition-colors">
                <BarChart3 className="w-4 h-4 mr-2 inline" />
                Statistiques
              </a>
              <a href="#history" className="text-gray-600 hover:text-blue-500 transition-colors">
                <History className="w-4 h-4 mr-2 inline" />
                Historique
              </a>
              <a href="#settings" className="text-gray-600 hover:text-blue-500 transition-colors">
                <Settings className="w-4 h-4 mr-2 inline" />
                Paramètres
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Test Configuration */}
        <div className="mb-8">
          <TestConfig
            mode={state.mode}
            difficulty={state.difficulty}
            language={state.language}
            onModeChange={(mode) => updateSettings({ mode })}
            onDifficultyChange={(difficulty) => updateSettings({ difficulty })}
            onLanguageChange={(language) => updateSettings({ language })}
            onStart={handleStart}
            isActive={state.isActive}
          />
        </div>

        {/* Statistics Dashboard */}
        <div className="mb-8" id="stats">
          <StatsDashboard
            wpm={state.wpm}
            accuracy={state.accuracy}
            errors={state.errors}
            timeRemaining={state.timeRemaining}
            timeElapsed={state.timeElapsed}
            mode={state.mode}
          />
        </div>

        {/* Typing Test Area */}
        <div className="mb-8">
          <TypingArea
            textToType={state.textToType}
            userInput={state.userInput}
            currentPosition={state.currentPosition}
            isActive={state.isActive}
            isCompleted={state.isCompleted}
            onKeyPress={handleKeyPress}
            onReset={resetTest}
          />
        </div>

        {/* Virtual Keyboard */}
        <div className="mb-8">
          <VirtualKeyboard lastKeyPressed={state.lastKeyPressed} />
        </div>

        {/* Performance History */}
        <div className="mb-8" id="history">
          <PerformanceHistory />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 TypingMaster. Développé pour améliorer vos compétences de frappe.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
