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
  boolean,
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
  isPremium: boolean("is_premium").default(false),
  premiumExpiresAt: timestamp("premium_expires_at"),
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

// Custom texts table for premium users
export const customTexts = pgTable("custom_texts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  category: varchar("category").default("custom"),
  language: varchar("language").default("fr"),
  difficulty: varchar("difficulty").default("medium"),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User preferences and settings
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().unique(),
  theme: varchar("theme").default("default"),
  fontSize: integer("font_size").default(16),
  fontFamily: varchar("font_family").default("monospace"),
  soundEnabled: boolean("sound_enabled").default(true),
  showKeyboard: boolean("show_keyboard").default(true),
  colorScheme: varchar("color_scheme").default("light"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Detailed typing statistics for premium users
export const typingStats = pgTable("typing_stats", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  testResultId: integer("test_result_id"),
  keystrokeData: jsonb("keystroke_data"), // Detailed keystroke timing
  errorAnalysis: jsonb("error_analysis"), // Per-key error analysis
  speedByLetter: jsonb("speed_by_letter"), // Speed analysis per letter
  heatmapData: jsonb("heatmap_data"), // Keyboard heatmap data
  createdAt: timestamp("created_at").defaultNow(),
});

// Multiplayer rooms and competitions
export const multiplayerRooms = pgTable("multiplayer_rooms", {
  id: serial("id").primaryKey(),
  roomCode: varchar("room_code").unique().notNull(),
  createdBy: varchar("created_by").notNull(),
  textId: integer("text_id"),
  maxPlayers: integer("max_players").default(10),
  status: varchar("status").default("waiting"), // waiting, active, finished
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Multiplayer participants
export const multiplayerParticipants = pgTable("multiplayer_participants", {
  id: serial("id").primaryKey(),
  roomId: integer("room_id").notNull(),
  userId: varchar("user_id").notNull(),
  wpm: real("wpm").default(0),
  accuracy: real("accuracy").default(0),
  errors: integer("errors").default(0),
  position: integer("position"),
  finishedAt: timestamp("finished_at"),
  joinedAt: timestamp("joined_at").defaultNow(),
});

// Premium subscription plans
export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  price: real("price").notNull(),
  duration: integer("duration").notNull(), // in days
  features: jsonb("features").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// User subscriptions
export const userSubscriptions = pgTable("user_subscriptions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  planId: integer("plan_id").notNull(),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").default(true),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Training programs for premium users
export const trainingPrograms = pgTable("training_programs", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  name: varchar("name").notNull(),
  description: text("description"),
  difficulty: varchar("difficulty").default("medium"),
  exercises: jsonb("exercises").notNull(), // Array of exercise definitions
  progress: jsonb("progress").default("{}"), // User progress tracking
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertCustomTextSchema = createInsertSchema(customTexts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTypingStatsSchema = createInsertSchema(typingStats).omit({
  id: true,
  createdAt: true,
});

export const insertMultiplayerRoomSchema = createInsertSchema(multiplayerRooms).omit({
  id: true,
  createdAt: true,
});

export const insertTrainingProgramSchema = createInsertSchema(trainingPrograms).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type CustomText = typeof customTexts.$inferSelect;
export type InsertCustomText = z.infer<typeof insertCustomTextSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
export type TypingStats = typeof typingStats.$inferSelect;
export type InsertTypingStats = z.infer<typeof insertTypingStatsSchema>;
export type MultiplayerRoom = typeof multiplayerRooms.$inferSelect;
export type InsertMultiplayerRoom = z.infer<typeof insertMultiplayerRoomSchema>;
export type TrainingProgram = typeof trainingPrograms.$inferSelect;
export type InsertTrainingProgram = z.infer<typeof insertTrainingProgramSchema>;
