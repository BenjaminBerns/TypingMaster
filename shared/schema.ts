import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  real,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const testResults = pgTable("test_results", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  wpm: real("wpm").notNull(),
  accuracy: real("accuracy").notNull(),
  errors: integer("errors").notNull(),
  mode: text("mode").notNull(), // "1min", "3min", "5min", "words"
  difficulty: text("difficulty").notNull(), // "easy", "medium", "hard", "random"
  language: text("language").notNull(), // "fr", "en", "es", "de"
  duration: integer("duration").notNull(), // in seconds
  charactersTyped: integer("characters_typed").notNull(),
  wordsTyped: integer("words_typed").notNull(),
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
