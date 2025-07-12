import {
  users,
  testResults,
  type User,
  type UpsertUser,
  type TestResult,
  type InsertTestResult,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  // Test results operations
  createTestResult(result: InsertTestResult): Promise<TestResult>;
  getTestResults(limit?: number): Promise<TestResult[]>;
  getUserTestResults(userId?: string, limit?: number): Promise<TestResult[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Test results operations
  async createTestResult(result: InsertTestResult): Promise<TestResult> {
    const [testResult] = await db
      .insert(testResults)
      .values(result)
      .returning();
    return testResult;
  }

  async getTestResults(limit: number = 50): Promise<TestResult[]> {
    return await db
      .select()
      .from(testResults)
      .orderBy(desc(testResults.createdAt))
      .limit(limit);
  }

  async getUserTestResults(userId?: string, limit: number = 50): Promise<TestResult[]> {
    if (!userId) {
      return [];
    }
    return await db
      .select()
      .from(testResults)
      .where(eq(testResults.userId, userId))
      .orderBy(desc(testResults.createdAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
