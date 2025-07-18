import { useState, useEffect, useRef } from 'react';
import { Keyboard, BarChart3, History, Settings, User, LogOut } from 'lucide-react';
import { TestConfig } from '@/components/test-config';
import { StatsDashboard } from '@/components/stats-dashboard';
import { TypingArea } from '@/components/typing-area';
import { VirtualKeyboard } from '@/components/virtual-keyboard';
import { PerformanceHistory } from '@/components/performance-history';
import { useTypingTest } from '@/hooks/use-typing-test';
import { useTestResults } from '@/hooks/use-test-results';
import { useAuth } from '@/hooks/useAuth';
import { useLocalHistory } from '@/hooks/use-local-history';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { SignupModal } from '@/components/signup-modal';
import { PremiumBanner } from '@/components/premium-banner';
import { HorizontalAdBanner } from '@/components/ad-banner';
import { Crown, Trophy } from 'lucide-react';

export default function TypingTest() {
  const { state, startTest, handleKeyPress, resetTest, updateSettings, extendText } = useTypingTest();
  const { saveTestResult, isSaving } = useTestResults();
  const { user, isAuthenticated } = useAuth();
  const { saveLocalResult } = useLocalHistory();
  const [currentText, setCurrentText] = useState('');
  const resultSavedRef = useRef(false);
  const isExtendingText = useRef(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const hasCompletedFirstTest = useRef(false);
  
  // Challenge parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const challengeUserId = urlParams.get('challenge');
  const challengeTarget = urlParams.get('target');
  const targetWpm = challengeTarget ? parseInt(challengeTarget) : null;

  // Fetch text sample when settings change
  const { data: textData, refetch: refetchText } = useQuery({
    queryKey: ['/api/text-samples', state.language, state.difficulty, state.mode],
    enabled: false,
  });

  useEffect(() => {
    if (textData?.text) {
      setCurrentText(textData.text);
    }
  }, [textData]);

  // Save result when test is completed (only once) and show signup modal for first test
  useEffect(() => {
    if (state.isCompleted && state.timeElapsed > 0 && !resultSavedRef.current) {
      resultSavedRef.current = true;
      
      // Show signup modal for first test if user is not authenticated
      if (!isAuthenticated && !hasCompletedFirstTest.current) {
        hasCompletedFirstTest.current = true;
        setShowSignupModal(true);
      }
      
      const wordsTyped = Math.floor(state.currentPosition / 5); // Standard calculation: 5 characters = 1 word
      const resultData = {
        wpm: Math.round(state.wpm),
        accuracy: Math.round(state.accuracy),
        errors: state.errors,
        mode: state.mode,
        difficulty: state.difficulty,
        language: state.language,
        duration: state.timeElapsed,
        charactersTyped: state.currentPosition,
        wordsTyped,
      };

      // Save result to database if authenticated, otherwise to localStorage
      if (isAuthenticated) {
        saveTestResult(resultData);
      } else {
        saveLocalResult(resultData);
      }
    }
  }, [state.isCompleted, state.wpm, state.accuracy, state.errors, state.mode, state.difficulty, state.language, state.timeElapsed, state.currentPosition, saveTestResult, isAuthenticated, saveLocalResult]);

  // Reset the result saved flag when test is reset
  useEffect(() => {
    if (!state.isCompleted) {
      resultSavedRef.current = false;
    }
  }, [state.isCompleted]);

  // Extend text for time-based modes when approaching the end
  useEffect(() => {
    if (state.isActive && 
        !state.isCompleted && 
        (state.mode === '1min' || state.mode === '3min' || state.mode === '5min') &&
        state.currentPosition >= state.textToType.length - 50 && 
        !isExtendingText.current) {
      
      isExtendingText.current = true;
      
      // Fetch more text to extend the current text
      fetch(`/api/text-samples?language=${state.language}&difficulty=${state.difficulty}&mode=${state.mode}`)
        .then(response => response.json())
        .then(data => {
          if (data.text) {
            extendText(data.text);
          }
        })
        .catch(error => {
          console.error('Error extending text:', error);
        })
        .finally(() => {
          isExtendingText.current = false;
        });
    }
  }, [state.isActive, state.isCompleted, state.mode, state.currentPosition, state.textToType.length, state.language, state.difficulty, extendText]);

  const handleStart = async () => {
    try {
      const result = await refetchText();
      if (result.data?.text) {
        startTest(result.data.text);
      } else {
        // Fallback to default text
        const fallbackText = "La programmation est l'art de dire à un ordinateur ce qu'il doit faire. C'est un processus créatif qui combine logique et imagination.";
        startTest(fallbackText);
      }
    } catch (error) {
      console.error('Error fetching text:', error);
      // Fallback to default text
      const fallbackText = "La programmation est l'art de dire à un ordinateur ce qu'il doit faire. C'est un processus créatif qui combine logique et imagination.";
      startTest(fallbackText);
    }
  };

  // Removed global keydown handler to prevent double input

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Banner */}
        {(!isAuthenticated || !user?.isPremium) && (
          <div className="mb-8">
            <PremiumBanner context="typing-test" />
          </div>
        )}
        
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
            targetWpm={targetWpm}
            challengeUserId={challengeUserId}
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

        {/* Ad Banner - Horizontal */}
        <div className="mb-8">
          <HorizontalAdBanner 
            slot="1234567890" 
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          />
        </div>

        {/* Performance History */}
        <div className="mb-8" id="history">
          <PerformanceHistory />
        </div>

        {/* Ad Banner - Bottom */}
        <div className="mb-8">
          <HorizontalAdBanner 
            slot="0987654321" 
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          />
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; 2024 TypingMaster. Développé pour améliorer vos compétences de frappe.</p>
            </div>
          </div>
        </footer>

        {/* Signup Modal */}
        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          wpm={state.wpm}
          accuracy={state.accuracy}
        />
      </div>
  );
}
