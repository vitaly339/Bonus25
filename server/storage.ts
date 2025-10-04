import { type Sales, type InsertSales } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllSales(): Promise<Sales[]>;
  getSalesByMonth(month: string): Promise<Sales[]>;
  createSales(sales: InsertSales): Promise<Sales>;
  updateSales(id: string, sales: Partial<InsertSales>): Promise<Sales | undefined>;
  deleteSales(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private sales: Map<string, Sales>;

  constructor() {
    this.sales = new Map();
  }

  async getAllSales(): Promise<Sales[]> {
    return Array.from(this.sales.values());
  }

  async getSalesByMonth(month: string): Promise<Sales[]> {
    return Array.from(this.sales.values()).filter((sale) => sale.month === month);
  }

  async createSales(insertSales: InsertSales): Promise<Sales> {
    const id = randomUUID();
    const sale: Sales = { 
      ...insertSales, 
      id,
      treesAmount: insertSales.treesAmount ?? 0,
      accessoriesAmount: insertSales.accessoriesAmount ?? 0,
    };
    this.sales.set(id, sale);
    return sale;
  }

  async updateSales(id: string, updates: Partial<InsertSales>): Promise<Sales | undefined> {
    const existing = this.sales.get(id);
    if (!existing) return undefined;
    
    const updated: Sales = { ...existing, ...updates };
    this.sales.set(id, updated);
    return updated;
  }

  async deleteSales(id: string): Promise<boolean> {
    return this.sales.delete(id);
  }
}

export const storage = new MemStorage();
