import { pgTable, text, serial, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const testResults = pgTable("test_results", {
  id: serial("id").primaryKey(),
  wpm: real("wpm").notNull(),
  accuracy: real("accuracy").notNull(),
  errors: integer("errors").notNull(),
  mode: text("mode").notNull(), // "1min", "3min", "5min", "words"
  difficulty: text("difficulty").notNull(), // "easy", "medium", "hard", "random"
  language: text("language").notNull(), // "fr", "en", "es", "de"
  duration: integer("duration").notNull(), // in seconds
  charactersTyped: integer("characters_typed").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTestResultSchema = createInsertSchema(testResults).omit({
  id: true,
  createdAt: true,
});

export type InsertTestResult = z.infer<typeof insertTestResultSchema>;
export type TestResult = typeof testResults.$inferSelect;

export const testModes = ["1min", "3min", "5min", "words"] as const;
export const difficulties = ["easy", "medium", "hard", "random"] as const;
export const languages = ["fr", "en", "es", "de"] as const;

export type TestMode = typeof testModes[number];
export type Difficulty = typeof difficulties[number];
export type Language = typeof languages[number];
