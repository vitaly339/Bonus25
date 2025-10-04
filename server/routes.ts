import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSalesSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/sales", async (_req, res) => {
    const sales = await storage.getAllSales();
    res.json(sales);
  });

  app.get("/api/sales/:month", async (req, res) => {
    const { month } = req.params;
    const sales = await storage.getSalesByMonth(month);
    res.json(sales);
  });

  app.post("/api/sales", async (req, res) => {
    try {
      const validated = insertSalesSchema.parse(req.body);
      const sale = await storage.createSales(validated);
      res.json(sale);
    } catch (error) {
      res.status(400).json({ error: "Invalid sales data" });
    }
  });

  app.patch("/api/sales/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await storage.updateSales(id, req.body);
      if (!updated) {
        res.status(404).json({ error: "Sale not found" });
        return;
      }
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  app.delete("/api/sales/:id", async (req, res) => {
    const { id } = req.params;
    const deleted = await storage.deleteSales(id);
    if (!deleted) {
      res.status(404).json({ error: "Sale not found" });
      return;
    }
    res.json({ success: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}
