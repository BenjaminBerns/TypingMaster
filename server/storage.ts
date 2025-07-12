import { testResults, type TestResult, type InsertTestResult } from "@shared/schema";

export interface IStorage {
  createTestResult(result: InsertTestResult): Promise<TestResult>;
  getTestResults(limit?: number): Promise<TestResult[]>;
  getUserTestResults(userId?: string, limit?: number): Promise<TestResult[]>;
}

export class MemStorage implements IStorage {
  private testResults: Map<number, TestResult>;
  private currentId: number;

  constructor() {
    this.testResults = new Map();
    this.currentId = 1;
  }

  async createTestResult(insertResult: InsertTestResult): Promise<TestResult> {
    const id = this.currentId++;
    const result: TestResult = {
      ...insertResult,
      id,
      createdAt: new Date(),
    };
    this.testResults.set(id, result);
    return result;
  }

  async getTestResults(limit: number = 50): Promise<TestResult[]> {
    return Array.from(this.testResults.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getUserTestResults(userId?: string, limit: number = 50): Promise<TestResult[]> {
    // In a real app, we would filter by userId
    return this.getTestResults(limit);
  }
}

export const storage = new MemStorage();
