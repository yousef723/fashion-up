import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertClothingItemSchema, insertOutfitSchema, insertStyleGuideSchema, insertColorPaletteSchema } from "@shared/schema";
import { z } from "zod";
import { registerStyleAnalysisRoutes } from "./routes/styleAnalysis";

export async function registerRoutes(app: Express): Promise<Server> {
  // Clothing Items Routes
  app.get("/api/clothing-items", async (req, res) => {
    try {
      const items = await storage.getClothingItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clothing items" });
    }
  });

  app.get("/api/clothing-items/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const items = await storage.getClothingItemsByCategory(category);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clothing items by category" });
    }
  });

  app.get("/api/clothing-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const item = await storage.getClothingItemById(id);
      if (!item) {
        return res.status(404).json({ message: "Clothing item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clothing item" });
    }
  });

  app.post("/api/clothing-items", async (req, res) => {
    try {
      const validatedData = insertClothingItemSchema.parse(req.body);
      const newItem = await storage.createClothingItem(validatedData);
      res.status(201).json(newItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create clothing item" });
    }
  });

  // Outfits Routes
  app.get("/api/outfits", async (req, res) => {
    try {
      const outfits = await storage.getOutfits();
      res.json(outfits);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch outfits" });
    }
  });

  app.get("/api/outfits/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const outfits = await storage.getOutfitsByCategory(category);
      res.json(outfits);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch outfits by category" });
    }
  });

  app.get("/api/outfits/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const outfit = await storage.getOutfitById(id);
      if (!outfit) {
        return res.status(404).json({ message: "Outfit not found" });
      }
      
      res.json(outfit);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch outfit" });
    }
  });

  app.post("/api/outfits", async (req, res) => {
    try {
      const validatedData = insertOutfitSchema.parse(req.body);
      const newOutfit = await storage.createOutfit(validatedData);
      res.status(201).json(newOutfit);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create outfit" });
    }
  });

  // Style Guides Routes
  app.get("/api/style-guides", async (req, res) => {
    try {
      const guides = await storage.getStyleGuides();
      res.json(guides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch style guides" });
    }
  });

  app.get("/api/style-guides/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const guide = await storage.getStyleGuideById(id);
      if (!guide) {
        return res.status(404).json({ message: "Style guide not found" });
      }
      
      res.json(guide);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch style guide" });
    }
  });

  app.post("/api/style-guides", async (req, res) => {
    try {
      const validatedData = insertStyleGuideSchema.parse(req.body);
      const newGuide = await storage.createStyleGuide(validatedData);
      res.status(201).json(newGuide);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create style guide" });
    }
  });

  // Color Palettes Routes
  app.get("/api/color-palettes", async (req, res) => {
    try {
      const palettes = await storage.getColorPalettes();
      res.json(palettes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch color palettes" });
    }
  });

  app.get("/api/color-palettes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const palette = await storage.getColorPaletteById(id);
      if (!palette) {
        return res.status(404).json({ message: "Color palette not found" });
      }
      
      res.json(palette);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch color palette" });
    }
  });

  app.post("/api/color-palettes", async (req, res) => {
    try {
      const validatedData = insertColorPaletteSchema.parse(req.body);
      const newPalette = await storage.createColorPalette(validatedData);
      res.status(201).json(newPalette);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create color palette" });
    }
  });

  // Register style analysis routes
  registerStyleAnalysisRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
