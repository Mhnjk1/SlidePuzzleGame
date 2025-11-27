import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { z } from "zod";
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
});
// Instead of using .pick() with boolean flags, define exact fields:
export const insertUserSchema = z.object({
    username: z.string(),
    password: z.string(),
});
