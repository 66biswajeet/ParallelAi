// server/src/models/project.ts
import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./user.model.js";

export const websiteProjects = pgTable("website_projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  initialPrompt: text("initial_prompt").notNull(),
  currentCode: text("current_code"), // Raw compiled canvas sandbox code
  currentVersionIndex: uuid("current_version_index"),
  isPublished: boolean("is_published").default(false).notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
