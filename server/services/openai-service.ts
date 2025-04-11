import OpenAI from 'openai';
import { log } from '../vite';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface StyleAnalysisResult {
  bodyType: string;
  skinTone: string;
  currentStyle: string;
  recommendedStyles: string[];
  colorRecommendations: string[];
  outfitSuggestions: string[];
  improvementTips: string[];
}

export async function analyzeUserPhoto(
  base64Image: string
): Promise<StyleAnalysisResult> {
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a professional fashion stylist AI. Analyze the person in the image and provide detailed fashion advice.
          Focus on their body type, skin tone, current outfit (if visible), and suggest appropriate styles, colors, and outfits. 
          Be specific with your recommendations, considering the person's features.
          Format your response as JSON with the following structure: 
          {
            "bodyType": "Description of their body type",
            "skinTone": "Description of their skin tone",  
            "currentStyle": "Analysis of their current style if visible in the image",
            "recommendedStyles": ["Style 1", "Style 2", "Style 3"], 
            "colorRecommendations": ["Color 1", "Color 2", "Color 3"],
            "outfitSuggestions": ["Detailed outfit 1", "Detailed outfit 2", "Detailed outfit 3"],
            "improvementTips": ["Specific improvement 1", "Specific improvement 2", "Specific improvement 3"]
          }`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze the person in this photo and provide detailed fashion advice."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 1500,
    });

    if (response.choices && response.choices.length > 0) {
      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error("Empty content received from OpenAI");
      }
      
      log(`OpenAI Analysis completed successfully`);
      const analysisResult = JSON.parse(content) as StyleAnalysisResult;
      return analysisResult;
    } else {
      throw new Error("No analysis result received from OpenAI");
    }
  } catch (error: any) {
    log(`OpenAI Error: ${error.message}`);
    throw new Error(`Failed to analyze photo: ${error.message}`);
  }
}