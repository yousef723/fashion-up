import { 
  ClothingItem, 
  InsertClothingItem, 
  Outfit, 
  InsertOutfit,
  StyleGuide,
  InsertStyleGuide,
  ColorPalette,
  InsertColorPalette,
  StyleAnalysis,
  InsertStyleAnalysis,
  clothingItems,
  outfits,
  styleGuides,
  colorPalettes,
  styleAnalysis
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Clothing Items
  getClothingItems(): Promise<ClothingItem[]>;
  getClothingItemsByCategory(category: string): Promise<ClothingItem[]>;
  getClothingItemById(id: number): Promise<ClothingItem | undefined>;
  createClothingItem(item: InsertClothingItem): Promise<ClothingItem>;
  
  // Outfits
  getOutfits(): Promise<Outfit[]>;
  getOutfitsByCategory(category: string): Promise<Outfit[]>;
  getOutfitById(id: number): Promise<Outfit | undefined>;
  createOutfit(outfit: InsertOutfit): Promise<Outfit>;
  
  // Style Guides
  getStyleGuides(): Promise<StyleGuide[]>;
  getStyleGuideById(id: number): Promise<StyleGuide | undefined>;
  createStyleGuide(guide: InsertStyleGuide): Promise<StyleGuide>;
  
  // Color Palettes
  getColorPalettes(): Promise<ColorPalette[]>;
  getColorPaletteById(id: number): Promise<ColorPalette | undefined>;
  createColorPalette(palette: InsertColorPalette): Promise<ColorPalette>;
  
  // Style Analysis
  getStyleAnalyses(): Promise<StyleAnalysis[]>;
  getStyleAnalysisById(id: number): Promise<StyleAnalysis | undefined>;
  createStyleAnalysis(analysis: InsertStyleAnalysis): Promise<StyleAnalysis>;
}

export class MemStorage implements IStorage {
  private clothingItems: Map<number, ClothingItem>;
  private outfits: Map<number, Outfit>;
  private styleGuides: Map<number, StyleGuide>;
  private colorPalettes: Map<number, ColorPalette>;
  private styleAnalyses: Map<number, StyleAnalysis>;
  
  private clothingItemCurrentId: number;
  private outfitCurrentId: number;
  private styleGuideCurrentId: number;
  private colorPaletteCurrentId: number;
  private styleAnalysisCurrentId: number;

  constructor() {
    this.clothingItems = new Map();
    this.outfits = new Map();
    this.styleGuides = new Map();
    this.colorPalettes = new Map();
    this.styleAnalyses = new Map();
    
    this.clothingItemCurrentId = 1;
    this.outfitCurrentId = 1;
    this.styleGuideCurrentId = 1;
    this.colorPaletteCurrentId = 1;
    this.styleAnalysisCurrentId = 1;
    
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize with sample data
    // Outfits
    const defaultOutfits: InsertOutfit[] = [
      {
        name: "Classic Navy Suit Ensemble",
        category: "Formal",
        imageUrl: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMHN1aXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        description: "A timeless navy suit with complementary accessories for formal occasions.",
        matchScore: "Perfect Match",
        colors: ["navy", "white", "charcoal"]
      },
      {
        name: "Urban Casual Smart Look",
        category: "Casual",
        imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzdWFsJTIwb3V0Zml0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        description: "A stylish yet relaxed outfit perfect for everyday urban activities.",
        matchScore: "Great Match",
        colors: ["light gray", "gray", "blue"]
      },
      {
        name: "Professional Business Attire",
        category: "Business",
        imageUrl: "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBzdWl0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        description: "A sophisticated business outfit that exudes confidence and professionalism.",
        matchScore: "Perfect Match",
        colors: ["navy", "white", "black"]
      },
      {
        name: "Summer Weekend Style",
        category: "Casual",
        imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBjYXN1YWwlMjBvdXRmaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        description: "A light and comfortable summer outfit perfect for weekend outings.",
        matchScore: "Good Match",
        colors: ["white", "pink", "yellow"]
      }
    ];
    
    // Style Guides
    const defaultStyleGuides: InsertStyleGuide[] = [
      {
        title: "Essential Wardrobe Basics for Men",
        category: "Guide",
        imageUrl: "https://images.unsplash.com/photo-1512400930990-e0bc0bd809df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        description: "Learn about the timeless pieces every man should have in his wardrobe to create versatile outfits for any occasion.",
        readTime: "5 min read",
        content: "A well-curated wardrobe starts with essential pieces that can be mixed and matched for various occasions..."
      },
      {
        title: "Color Coordination for Your Skin Tone",
        category: "Color Theory",
        imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        description: "Discover which colors enhance your natural features and how to build a wardrobe palette that complements your unique look.",
        readTime: "7 min read",
        content: "Understanding your skin's undertones is the first step in selecting colors that enhance your natural beauty..."
      },
      {
        title: "Mastering Formal Attire for Special Events",
        category: "Formal Wear",
        imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9ybWFsJTIwYXR0aXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        description: "Navigate dress codes and make the right impression at formal events with our comprehensive guide to elegant attire.",
        readTime: "6 min read",
        content: "Formal events call for attire that respects traditions while allowing for personal expression..."
      }
    ];
    
    // Clothing Items
    const defaultClothingItems: InsertClothingItem[] = [
      {
        name: "Navy Blazer",
        category: "Formal",
        type: "top",
        imageUrl: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3VpdCUyMGphY2tldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        colors: ["navy"],
        description: "A classic navy blazer perfect for formal and business casual occasions."
      },
      {
        name: "White T-Shirt",
        category: "Casual",
        type: "top",
        imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        colors: ["white"],
        description: "A simple yet versatile white t-shirt that goes with everything."
      },
      {
        name: "Blue Jeans",
        category: "Casual",
        type: "bottom",
        imageUrl: "https://images.unsplash.com/photo-1584865288642-42078afe6942?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        colors: ["blue"],
        description: "Classic blue jeans that provide comfort and style for casual outings."
      },
      {
        name: "Brown Shoes",
        category: "Formal",
        type: "footwear",
        imageUrl: "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvd24lMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        colors: ["brown"],
        description: "Elegant brown leather shoes ideal for formal occasions."
      },
      {
        name: "Blue Shirt",
        category: "Business Casual",
        type: "top",
        imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        colors: ["blue"],
        description: "A versatile blue button-down shirt for business casual settings."
      }
    ];
    
    // Color Palettes
    const defaultColorPalettes: InsertColorPalette[] = [
      {
        name: "Formal Essentials",
        colors: ["navy", "forest", "amber", "charcoal", "burgundy", "stone"],
        description: "Classic colors that work well for formal attire across various skin tones."
      },
      {
        name: "Casual Neutrals",
        colors: ["white", "beige", "light blue", "gray", "black", "khaki"],
        description: "Versatile neutral tones that form the foundation of a casual wardrobe."
      }
    ];
    
    // Add default data to storage
    defaultOutfits.forEach(outfit => this.createOutfit(outfit));
    defaultStyleGuides.forEach(guide => this.createStyleGuide(guide));
    defaultClothingItems.forEach(item => this.createClothingItem(item));
    defaultColorPalettes.forEach(palette => this.createColorPalette(palette));
  }

  // Clothing Items methods
  async getClothingItems(): Promise<ClothingItem[]> {
    return Array.from(this.clothingItems.values());
  }

  async getClothingItemsByCategory(category: string): Promise<ClothingItem[]> {
    return Array.from(this.clothingItems.values()).filter(
      item => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getClothingItemById(id: number): Promise<ClothingItem | undefined> {
    return this.clothingItems.get(id);
  }

  async createClothingItem(item: InsertClothingItem): Promise<ClothingItem> {
    const id = this.clothingItemCurrentId++;
    const newItem: ClothingItem = { 
      ...item, 
      id,
      description: item.description || null 
    };
    this.clothingItems.set(id, newItem);
    return newItem;
  }

  // Outfits methods
  async getOutfits(): Promise<Outfit[]> {
    return Array.from(this.outfits.values());
  }

  async getOutfitsByCategory(category: string): Promise<Outfit[]> {
    return Array.from(this.outfits.values()).filter(
      outfit => outfit.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getOutfitById(id: number): Promise<Outfit | undefined> {
    return this.outfits.get(id);
  }

  async createOutfit(outfit: InsertOutfit): Promise<Outfit> {
    const id = this.outfitCurrentId++;
    const newOutfit: Outfit = { 
      ...outfit, 
      id,
      description: outfit.description || null,
      matchScore: outfit.matchScore || null 
    };
    this.outfits.set(id, newOutfit);
    return newOutfit;
  }

  // Style Guides methods
  async getStyleGuides(): Promise<StyleGuide[]> {
    return Array.from(this.styleGuides.values());
  }

  async getStyleGuideById(id: number): Promise<StyleGuide | undefined> {
    return this.styleGuides.get(id);
  }

  async createStyleGuide(guide: InsertStyleGuide): Promise<StyleGuide> {
    const id = this.styleGuideCurrentId++;
    const newGuide: StyleGuide = { 
      ...guide, 
      id,
      readTime: guide.readTime || null,
      content: guide.content || null 
    };
    this.styleGuides.set(id, newGuide);
    return newGuide;
  }

  // Color Palettes methods
  async getColorPalettes(): Promise<ColorPalette[]> {
    return Array.from(this.colorPalettes.values());
  }

  async getColorPaletteById(id: number): Promise<ColorPalette | undefined> {
    return this.colorPalettes.get(id);
  }

  async createColorPalette(palette: InsertColorPalette): Promise<ColorPalette> {
    const id = this.colorPaletteCurrentId++;
    const newPalette: ColorPalette = { 
      ...palette, 
      id,
      description: palette.description || null 
    };
    this.colorPalettes.set(id, newPalette);
    return newPalette;
  }
  
  // Style Analysis methods
  async getStyleAnalyses(): Promise<StyleAnalysis[]> {
    return Array.from(this.styleAnalyses.values());
  }

  async getStyleAnalysisById(id: number): Promise<StyleAnalysis | undefined> {
    return this.styleAnalyses.get(id);
  }

  async createStyleAnalysis(analysis: InsertStyleAnalysis): Promise<StyleAnalysis> {
    const id = this.styleAnalysisCurrentId++;
    const now = new Date();
    const newAnalysis: StyleAnalysis = {
      ...analysis,
      id,
      currentStyle: analysis.currentStyle || null,
      createdAt: now
    };
    this.styleAnalyses.set(id, newAnalysis);
    return newAnalysis;
  }
}

export class DatabaseStorage implements IStorage {
  // Clothing Items methods
  async getClothingItems(): Promise<ClothingItem[]> {
    return await db.select().from(clothingItems);
  }

  async getClothingItemsByCategory(category: string): Promise<ClothingItem[]> {
    return await db.select()
      .from(clothingItems)
      .where(eq(clothingItems.category, category));
  }

  async getClothingItemById(id: number): Promise<ClothingItem | undefined> {
    const [item] = await db.select()
      .from(clothingItems)
      .where(eq(clothingItems.id, id));
    return item;
  }

  async createClothingItem(item: InsertClothingItem): Promise<ClothingItem> {
    const [newItem] = await db.insert(clothingItems)
      .values(item)
      .returning();
    return newItem;
  }

  // Outfits methods
  async getOutfits(): Promise<Outfit[]> {
    return await db.select().from(outfits);
  }

  async getOutfitsByCategory(category: string): Promise<Outfit[]> {
    return await db.select()
      .from(outfits)
      .where(eq(outfits.category, category));
  }

  async getOutfitById(id: number): Promise<Outfit | undefined> {
    const [outfit] = await db.select()
      .from(outfits)
      .where(eq(outfits.id, id));
    return outfit;
  }

  async createOutfit(outfit: InsertOutfit): Promise<Outfit> {
    const [newOutfit] = await db.insert(outfits)
      .values(outfit)
      .returning();
    return newOutfit;
  }

  // Style Guides methods
  async getStyleGuides(): Promise<StyleGuide[]> {
    return await db.select().from(styleGuides);
  }

  async getStyleGuideById(id: number): Promise<StyleGuide | undefined> {
    const [guide] = await db.select()
      .from(styleGuides)
      .where(eq(styleGuides.id, id));
    return guide;
  }

  async createStyleGuide(guide: InsertStyleGuide): Promise<StyleGuide> {
    const [newGuide] = await db.insert(styleGuides)
      .values(guide)
      .returning();
    return newGuide;
  }

  // Color Palettes methods
  async getColorPalettes(): Promise<ColorPalette[]> {
    return await db.select().from(colorPalettes);
  }

  async getColorPaletteById(id: number): Promise<ColorPalette | undefined> {
    const [palette] = await db.select()
      .from(colorPalettes)
      .where(eq(colorPalettes.id, id));
    return palette;
  }

  async createColorPalette(palette: InsertColorPalette): Promise<ColorPalette> {
    const [newPalette] = await db.insert(colorPalettes)
      .values(palette)
      .returning();
    return newPalette;
  }
  
  // Style Analysis methods
  async getStyleAnalyses(): Promise<StyleAnalysis[]> {
    return await db.select().from(styleAnalysis);
  }

  async getStyleAnalysisById(id: number): Promise<StyleAnalysis | undefined> {
    const [analysis] = await db.select()
      .from(styleAnalysis)
      .where(eq(styleAnalysis.id, id));
    return analysis;
  }

  async createStyleAnalysis(analysis: InsertStyleAnalysis): Promise<StyleAnalysis> {
    const [newAnalysis] = await db.insert(styleAnalysis)
      .values(analysis)
      .returning();
    return newAnalysis;
  }

  // Initialize database with sample data if empty
  async initializeDefaultDataIfEmpty() {
    // Check if tables are empty
    const existingItems = await this.getClothingItems();
    if (existingItems.length > 0) {
      return; // Data already exists, no need to initialize
    }
    
    // Initialize with sample data
    // Outfits
    const defaultOutfits: InsertOutfit[] = [
      {
        name: "Classic Navy Suit Ensemble",
        category: "Formal",
        imageUrl: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMHN1aXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        description: "A timeless navy suit with complementary accessories for formal occasions.",
        matchScore: "Perfect Match",
        colors: ["navy", "white", "charcoal"]
      },
      {
        name: "Urban Casual Smart Look",
        category: "Casual",
        imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzdWFsJTIwb3V0Zml0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        description: "A stylish yet relaxed outfit perfect for everyday urban activities.",
        matchScore: "Great Match",
        colors: ["light gray", "gray", "blue"]
      },
      {
        name: "Professional Business Attire",
        category: "Business",
        imageUrl: "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBzdWl0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        description: "A sophisticated business outfit that exudes confidence and professionalism.",
        matchScore: "Perfect Match",
        colors: ["navy", "white", "black"]
      },
      {
        name: "Summer Weekend Style",
        category: "Casual",
        imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBjYXN1YWwlMjBvdXRmaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        description: "A light and comfortable summer outfit perfect for weekend outings.",
        matchScore: "Good Match",
        colors: ["white", "pink", "yellow"]
      }
    ];
    
    // Style Guides
    const defaultStyleGuides: InsertStyleGuide[] = [
      {
        title: "Essential Wardrobe Basics for Men",
        category: "Guide",
        imageUrl: "https://images.unsplash.com/photo-1512400930990-e0bc0bd809df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        description: "Learn about the timeless pieces every man should have in his wardrobe to create versatile outfits for any occasion.",
        readTime: "5 min read",
        content: "A well-curated wardrobe starts with essential pieces that can be mixed and matched for various occasions..."
      },
      {
        title: "Color Coordination for Your Skin Tone",
        category: "Color Theory",
        imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        description: "Discover which colors enhance your natural features and how to build a wardrobe palette that complements your unique look.",
        readTime: "7 min read",
        content: "Understanding your skin's undertones is the first step in selecting colors that enhance your natural beauty..."
      },
      {
        title: "Mastering Formal Attire for Special Events",
        category: "Formal Wear",
        imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9ybWFsJTIwYXR0aXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        description: "Navigate dress codes and make the right impression at formal events with our comprehensive guide to elegant attire.",
        readTime: "6 min read",
        content: "Formal events call for attire that respects traditions while allowing for personal expression..."
      }
    ];
    
    // Clothing Items
    const defaultClothingItems: InsertClothingItem[] = [
      {
        name: "Navy Blazer",
        category: "Formal",
        type: "top",
        imageUrl: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3VpdCUyMGphY2tldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        colors: ["navy"],
        description: "A classic navy blazer perfect for formal and business casual occasions."
      },
      {
        name: "White T-Shirt",
        category: "Casual",
        type: "top",
        imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        colors: ["white"],
        description: "A simple yet versatile white t-shirt that goes with everything."
      },
      {
        name: "Blue Jeans",
        category: "Casual",
        type: "bottom",
        imageUrl: "https://images.unsplash.com/photo-1584865288642-42078afe6942?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        colors: ["blue"],
        description: "Classic blue jeans that provide comfort and style for casual outings."
      },
      {
        name: "Brown Shoes",
        category: "Formal",
        type: "footwear",
        imageUrl: "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvd24lMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        colors: ["brown"],
        description: "Elegant brown leather shoes ideal for formal occasions."
      },
      {
        name: "Blue Shirt",
        category: "Business Casual",
        type: "top",
        imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        colors: ["blue"],
        description: "A versatile blue button-down shirt for business casual settings."
      }
    ];
    
    // Color Palettes
    const defaultColorPalettes: InsertColorPalette[] = [
      {
        name: "Formal Essentials",
        colors: ["navy", "forest", "amber", "charcoal", "burgundy", "stone"],
        description: "Classic colors that work well for formal attire across various skin tones."
      },
      {
        name: "Casual Neutrals",
        colors: ["white", "beige", "light blue", "gray", "black", "khaki"],
        description: "Versatile neutral tones that form the foundation of a casual wardrobe."
      }
    ];
    
    // Add default data to database
    for (const outfit of defaultOutfits) {
      await this.createOutfit(outfit);
    }
    
    for (const guide of defaultStyleGuides) {
      await this.createStyleGuide(guide);
    }
    
    for (const item of defaultClothingItems) {
      await this.createClothingItem(item);
    }
    
    for (const palette of defaultColorPalettes) {
      await this.createColorPalette(palette);
    }
  }
}

// Instantiate and export a DatabaseStorage object
export const storage = new DatabaseStorage();
