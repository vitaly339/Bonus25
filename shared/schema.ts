import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sales = pgTable("sales", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: date("date").notNull(),
  month: text("month").notNull(),
  treesAmount: integer("trees_amount").notNull().default(0),
  accessoriesAmount: integer("accessories_amount").notNull().default(0),
});

export const insertSalesSchema = createInsertSchema(sales).omit({
  id: true,
});

export type InsertSales = z.infer<typeof insertSalesSchema>;
export type Sales = typeof sales.$inferSelect;

export type Month = "october" | "november" | "december";

export interface MonthPlan {
  month: Month;
  treesTarget: number;
  accessoriesTarget: number;
}

export const monthPlans: Record<Month, MonthPlan> = {
  october: {
    month: "october",
    treesTarget: 1300000,
    accessoriesTarget: 100000,
  },
  november: {
    month: "november",
    treesTarget: 2500000,
    accessoriesTarget: 250000,
  },
  december: {
    month: "december",
    treesTarget: 2700000,
    accessoriesTarget: 300000,
  },
};
