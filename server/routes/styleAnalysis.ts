import { Express, Request, Response } from "express";
import { storage } from "../storage";
import { analyzeUserPhoto } from "../services/openai-service";
import { z } from "zod";
import { log } from "../vite";

// Schema for the photo upload request
const photoUploadSchema = z.object({
  imageData: z.string().min(1, "Image data is required"),
});

export function registerStyleAnalysisRoutes(app: Express): void {
  // Endpoint to upload a photo and get style analysis
  app.post("/api/style-analysis", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validationResult = photoUploadSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          message: "Invalid request data",
          errors: validationResult.error.errors,
        });
      }

      const { imageData } = validationResult.data;
      
      // Strip out the data URL prefix if it exists (e.g., "data:image/jpeg;base64,")
      const base64Image = imageData.split(",")[1] || imageData;

      // Call OpenAI to analyze the photo
      const analysisResult = await analyzeUserPhoto(base64Image);
      
      // Save the analysis result to the database
      const styleSuggestion = await storage.createStyleAnalysis({
        imageUrl: imageData,
        bodyType: analysisResult.bodyType,
        skinTone: analysisResult.skinTone,
        currentStyle: analysisResult.currentStyle,
        recommendedStyles: analysisResult.recommendedStyles,
        colorRecommendations: analysisResult.colorRecommendations,
        outfitSuggestions: analysisResult.outfitSuggestions,
        improvementTips: analysisResult.improvementTips,
      });

      return res.status(200).json(styleSuggestion);
    } catch (error: any) {
      log(`Error analyzing photo: ${error.message}`);
      return res.status(500).json({
        message: "Error analyzing photo",
        error: error.message,
      });
    }
  });

  // Endpoint to get all style analyses
  app.get("/api/style-analysis", async (_req: Request, res: Response) => {
    try {
      const analyses = await storage.getStyleAnalyses();
      return res.status(200).json(analyses);
    } catch (error: any) {
      log(`Error retrieving style analyses: ${error.message}`);
      return res.status(500).json({
        message: "Error retrieving style analyses",
        error: error.message,
      });
    }
  });

  // Endpoint to get a specific style analysis by ID
  app.get("/api/style-analysis/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const analysis = await storage.getStyleAnalysisById(id);
      if (!analysis) {
        return res.status(404).json({ message: "Style analysis not found" });
      }

      return res.status(200).json(analysis);
    } catch (error: any) {
      log(`Error retrieving style analysis: ${error.message}`);
      return res.status(500).json({
        message: "Error retrieving style analysis",
        error: error.message,
      });
    }
  });
}