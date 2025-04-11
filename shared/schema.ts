import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Clothing item table
export const clothingItems = pgTable("clothing_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // formal, casual, business casual, party wear
  type: text("type").notNull(), // top, bottom, footwear, accessory, etc.
  imageUrl: text("image_url").notNull(),
  colors: text("colors").array().notNull(), // Array of colors in the item
  description: text("description"),
});

// Insert schema for clothing items
export const insertClothingItemSchema = createInsertSchema(clothingItems).omit({
  id: true,
});

// Outfit table
export const outfits = pgTable("outfits", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // formal, casual, business casual, party wear
  imageUrl: text("image_url").notNull(),
  description: text("description"),
  matchScore: text("match_score"), // Perfect Match, Great Match, Good Match
  colors: text("colors").array().notNull(), // Main colors in the outfit
});

// Insert schema for outfits
export const insertOutfitSchema = createInsertSchema(outfits).omit({
  id: true,
});

// Style guides
export const styleGuides = pgTable("style_guides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(), // Guide, Color Theory, Formal Wear, etc.
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
  readTime: text("read_time"),
  content: text("content"),
});

// Insert schema for style guides
export const insertStyleGuideSchema = createInsertSchema(styleGuides).omit({
  id: true,
});

// Color palette table
export const colorPalettes = pgTable("color_palettes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  colors: text("colors").array().notNull(),
  description: text("description"),
});

// Insert schema for color palettes
export const insertColorPaletteSchema = createInsertSchema(colorPalettes).omit({
  id: true,
});

// Style Analysis table for storing AI photo analysis results
export const styleAnalysis = pgTable("style_analysis", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(), // URL to the uploaded image
  bodyType: text("body_type").notNull(),
  skinTone: text("skin_tone").notNull(),
  currentStyle: text("current_style"),
  recommendedStyles: text("recommended_styles").array().notNull(),
  colorRecommendations: text("color_recommendations").array().notNull(),
  outfitSuggestions: text("outfit_suggestions").array().notNull(),
  improvementTips: text("improvement_tips").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schema for style analysis
export const insertStyleAnalysisSchema = createInsertSchema(styleAnalysis).omit({
  id: true,
  createdAt: true,
}).extend({
  // Make currentStyle explicitly optional with z.string().nullish()
  currentStyle: z.string().nullish().transform(val => val || null),
});

// Export types
export type InsertClothingItem = z.infer<typeof insertClothingItemSchema>;
export type ClothingItem = typeof clothingItems.$inferSelect;

export type InsertOutfit = z.infer<typeof insertOutfitSchema>;
export type Outfit = typeof outfits.$inferSelect;

export type InsertStyleGuide = z.infer<typeof insertStyleGuideSchema>;
export type StyleGuide = typeof styleGuides.$inferSelect;

export type InsertColorPalette = z.infer<typeof insertColorPaletteSchema>;
export type ColorPalette = typeof colorPalettes.$inferSelect;

export type InsertStyleAnalysis = z.infer<typeof insertStyleAnalysisSchema>;
export type StyleAnalysis = typeof styleAnalysis.$inferSelect;
