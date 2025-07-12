import { useState, useEffect } from 'react';

interface LocalTestResult {
  id: string;
  wpm: number;
  accuracy: number;
  errors: number;
  mode: string;
  difficulty: string;
  language: string;
  duration: number;
  charactersTyped: number;
  wordsTyped: number;
  completedAt: string;
}

const LOCAL_STORAGE_KEY = 'typing-test-history';

export function useLocalHistory() {
  const [localHistory, setLocalHistory] = useState<LocalTestResult[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setLocalHistory(parsed);
      }
    } catch (error) {
      console.error('Error loading local history:', error);
    }
  }, []);

  // Save result to localStorage
  const saveLocalResult = (result: Omit<LocalTestResult, 'id' | 'completedAt'>) => {
    try {
      const newResult: LocalTestResult = {
        ...result,
        id: Date.now().toString(),
        completedAt: new Date().toISOString(),
      };

      const updatedHistory = [newResult, ...localHistory].slice(0, 50); // Keep last 50 results
      setLocalHistory(updatedHistory);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving local result:', error);
    }
  };

  // Clear local history
  const clearLocalHistory = () => {
    setLocalHistory([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  // Get stats from local history
  const getLocalStats = () => {
    if (localHistory.length === 0) {
      return {
        totalTests: 0,
        avgWpm: 0,
        avgAccuracy: 0,
        bestWpm: 0,
        recentTests: [],
      };
    }

    const avgWpm = Math.round(localHistory.reduce((sum, test) => sum + test.wpm, 0) / localHistory.length);
    const avgAccuracy = Math.round(localHistory.reduce((sum, test) => sum + test.accuracy, 0) / localHistory.length);
    const bestWpm = Math.max(...localHistory.map(test => test.wpm));
    const recentTests = localHistory.slice(0, 10);

    return {
      totalTests: localHistory.length,
      avgWpm,
      avgAccuracy,
      bestWpm,
      recentTests,
    };
  };

  return {
    localHistory,
    saveLocalResult,
    clearLocalHistory,
    getLocalStats,
  };
}