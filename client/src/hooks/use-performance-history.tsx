import { useState, useEffect } from 'react';
import type { TestResult } from '@shared/schema';

interface PerformanceData {
  date: string;
  wpm: number;
  accuracy: number;
  errors: number;
  mode: string;
  difficulty: string;
  language: string;
  duration: number;
  charactersTyped: number;
}

export function usePerformanceHistory() {
  const [history, setHistory] = useState<PerformanceData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('typingHistory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed);
      } catch (error) {
        console.error('Error parsing performance history:', error);
      }
    }
  }, []);

  const addResult = (result: Omit<PerformanceData, 'date'>) => {
    const newResult: PerformanceData = {
      ...result,
      date: new Date().toISOString(),
    };

    const newHistory = [newResult, ...history].slice(0, 100); // Keep last 100 results
    setHistory(newHistory);
    localStorage.setItem('typingHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('typingHistory');
  };

  const getStats = () => {
    if (history.length === 0) {
      return {
        avgWpm: 0,
        avgAccuracy: 0,
        totalTests: 0,
        bestWpm: 0,
        bestAccuracy: 0,
      };
    }

    const avgWpm = Math.round(history.reduce((sum, result) => sum + result.wpm, 0) / history.length);
    const avgAccuracy = Math.round(history.reduce((sum, result) => sum + result.accuracy, 0) / history.length);
    const bestWpm = Math.max(...history.map(result => result.wpm));
    const bestAccuracy = Math.max(...history.map(result => result.accuracy));

    return {
      avgWpm,
      avgAccuracy,
      totalTests: history.length,
      bestWpm,
      bestAccuracy,
    };
  };

  const getRecentResults = (limit: number = 10) => {
    return history.slice(0, limit);
  };

  return {
    history,
    addResult,
    clearHistory,
    getStats,
    getRecentResults,
  };
}
