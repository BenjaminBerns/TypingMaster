import { useState, useEffect, useCallback, useRef } from 'react';
import { calculateWPM, calculateAccuracy } from '@/lib/typing-utils';
import type { TestMode, Difficulty, Language } from '@shared/schema';

interface TypingTestState {
  textToType: string;
  userInput: string;
  currentPosition: number;
  errors: number;
  isActive: boolean;
  isCompleted: boolean;
  startTime: number | null;
  timeElapsed: number;
  timeRemaining: number;
  wpm: number;
  accuracy: number;
  mode: TestMode;
  difficulty: Difficulty;
  language: Language;
  lastKeyPressed: string;
}

export function useTypingTest() {
  const [state, setState] = useState<TypingTestState>({
    textToType: '',
    userInput: '',
    currentPosition: 0,
    errors: 0,
    isActive: false,
    isCompleted: false,
    startTime: null,
    timeElapsed: 0,
    timeRemaining: 60,
    wpm: 0,
    accuracy: 100,
    mode: '1min',
    difficulty: 'medium',
    language: 'fr',
    lastKeyPressed: '',
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getTimeLimit = useCallback((mode: TestMode): number => {
    switch (mode) {
      case '1min': return 60;
      case '3min': return 180;
      case '5min': return 300;
      case 'words': return 999999; // No time limit for word mode
      default: return 60;
    }
  }, []);

  const updateTimer = useCallback(() => {
    setState(prev => {
      if (!prev.isActive || prev.isCompleted || !prev.startTime) return prev;

      const now = Date.now();
      const elapsed = Math.floor((now - prev.startTime) / 1000);
      const remaining = Math.max(0, getTimeLimit(prev.mode) - elapsed);

      // Calculate real-time stats
      const wpm = calculateWPM(prev.currentPosition, elapsed);
      const accuracy = calculateAccuracy(prev.currentPosition, prev.errors);

      if (remaining === 0) {
        return {
          ...prev,
          timeElapsed: elapsed,
          timeRemaining: 0,
          wpm,
          accuracy,
          isActive: false,
          isCompleted: true,
        };
      }

      return {
        ...prev,
        timeElapsed: elapsed,
        timeRemaining: remaining,
        wpm,
        accuracy,
      };
    });
  }, [getTimeLimit]);

  useEffect(() => {
    if (state.isActive && !state.isCompleted) {
      intervalRef.current = setInterval(updateTimer, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isActive, state.isCompleted, updateTimer]);

  const startTest = useCallback((textToType: string) => {
    setState(prev => ({
      ...prev,
      textToType,
      userInput: '',
      currentPosition: 0,
      errors: 0,
      isActive: true,
      isCompleted: false,
      startTime: Date.now(),
      timeElapsed: 0,
      timeRemaining: getTimeLimit(prev.mode),
      wpm: 0,
      accuracy: 100,
    }));
  }, [getTimeLimit]);

  const handleKeyPress = useCallback((key: string) => {
    setState(prev => {
      if (!prev.isActive || prev.isCompleted) return prev;

      let newUserInput = prev.userInput;
      let newPosition = prev.currentPosition;
      let newErrors = prev.errors;

      // Start timer on first key press
      const startTime = prev.startTime || Date.now();

      if (key === 'Backspace') {
        if (newUserInput.length > 0) {
          newUserInput = newUserInput.slice(0, -1);
          newPosition = Math.max(0, newPosition - 1);
        }
      } else if (key.length === 1) {
        newUserInput += key;
        
        // Check if character is correct
        if (newPosition < prev.textToType.length) {
          const expectedChar = prev.textToType[newPosition];
          if (key !== expectedChar) {
            newErrors++;
          }
          newPosition++;
        }
      }

      // Check if test is completed (for word mode or if all text is typed)
      const isCompleted = prev.mode === 'words' ? 
        newPosition >= prev.textToType.length : 
        (prev.timeRemaining <= 0 || newPosition >= prev.textToType.length);

      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const wpm = calculateWPM(newPosition, elapsed);
      const accuracy = calculateAccuracy(newPosition, newErrors);

      return {
        ...prev,
        userInput: newUserInput,
        currentPosition: newPosition,
        errors: newErrors,
        isCompleted,
        isActive: !isCompleted,
        startTime,
        wpm,
        accuracy,
        lastKeyPressed: key,
      };
    });
  }, []);

  const resetTest = useCallback(() => {
    setState(prev => ({
      ...prev,
      userInput: '',
      currentPosition: 0,
      errors: 0,
      isActive: false,
      isCompleted: false,
      startTime: null,
      timeElapsed: 0,
      timeRemaining: getTimeLimit(prev.mode),
      wpm: 0,
      accuracy: 100,
      lastKeyPressed: '',
    }));
  }, [getTimeLimit]);

  const updateSettings = useCallback((updates: Partial<Pick<TypingTestState, 'mode' | 'difficulty' | 'language'>>) => {
    setState(prev => ({
      ...prev,
      ...updates,
      timeRemaining: updates.mode ? getTimeLimit(updates.mode) : prev.timeRemaining,
    }));
  }, [getTimeLimit]);

  return {
    state,
    startTest,
    handleKeyPress,
    resetTest,
    updateSettings,
  };
}