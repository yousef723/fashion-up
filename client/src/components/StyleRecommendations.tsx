import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Award, 
  ThumbsUp, 
  Briefcase, 
  HeartHandshake, 
  Utensils, 
  Heart
} from 'lucide-react';

// Define occasion types
type Occasion = 'office' | 'date' | 'casual' | 'formal' | 'interview';

// Define the outfit suggestion type
interface OutfitSuggestion {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  items: string[];
  colors: string[];
  tags: string[];
  occasion: Occasion;
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'all';
  ratings: {
    comfort: number;
    style: number;
    versatility: number;
  };
}

// Sample data for outfit suggestions
const outfitSuggestions: OutfitSuggestion[] = [
  {
    id: 1,
    title: "Business Professional",
    description: "A classic look perfect for important meetings and presentations",
    items: [
      "Navy blue suit",
      "Light blue button-down shirt",
      "Burgundy tie",
      "Black Oxford shoes",
      "Silver watch",
      "Black leather belt"
    ],
    colors: ["#0F2C5F", "#A8C8F9", "#780010", "#000000"],
    tags: ["professional", "meetings", "business", "formal"],
    occasion: "office",
    season: "all",
    ratings: {
      comfort: 4,
      style: 5,
      versatility: 4
    }
  },
  {
    id: 2,
    title: "Smart Casual Office",
    description: "A comfortable yet professional look for regular office days",
    items: [
      "Navy chinos",
      "Light gray button-down shirt",
      "Brown leather loafers",
      "Brown leather belt",
      "Casual watch"
    ],
    colors: ["#1D3557", "#D3D3D3", "#5C3A21"],
    tags: ["business casual", "comfortable", "office", "everyday"],
    occasion: "office",
    season: "all",
    ratings: {
      comfort: 5,
      style: 4,
      versatility: 5
    }
  },
  {
    id: 3,
    title: "First Date Impression",
    description: "A stylish but not overdressed look to make a great first impression",
    items: [
      "Dark jeans",
      "Crisp white button-down shirt",
      "Navy blazer",
      "Brown Chelsea boots",
      "Minimal accessories"
    ],
    colors: ["#101D42", "#FFFFFF", "#0F2C5F", "#5C3A21"],
    tags: ["date night", "stylish", "smart", "balanced"],
    occasion: "date",
    season: "all",
    ratings: {
      comfort: 4,
      style: 5,
      versatility: 4
    }
  },
  {
    id: 4,
    title: "Weekend Casual",
    description: "Comfortable and stylish for weekend outings",
    items: [
      "Well-fitted t-shirt in a solid color",
      "Dark wash jeans",
      "White sneakers",
      "Casual watch",
      "Sunglasses"
    ],
    colors: ["#A8DADC", "#101D42", "#FFFFFF"],
    tags: ["casual", "weekend", "comfortable", "relaxed"],
    occasion: "casual",
    season: "spring",
    ratings: {
      comfort: 5,
      style: 4,
      versatility: 4
    }
  },
  {
    id: 5,
    title: "Summer Wedding Guest",
    description: "Appropriate and stylish for a summer wedding celebration",
    items: [
      "Light gray suit",
      "Pastel shirt (light blue, pink, or mint)",
      "Patterned tie",
      "Brown dress shoes",
      "Matching belt",
      "Pocket square"
    ],
    colors: ["#D3D3D3", "#A8C8F9", "#FFC0CB", "#5C3A21"],
    tags: ["formal", "wedding", "celebration", "dressed up"],
    occasion: "formal",
    season: "summer",
    ratings: {
      comfort: 3,
      style: 5,
      versatility: 3
    }
  },
  {
    id: 6,
    title: "Job Interview Ready",
    description: "Professional and confidence-boosting for that important interview",
    items: [
      "Charcoal gray suit",
      "Crisp white shirt",
      "Subtle patterned tie",
      "Black Oxford shoes",
      "Quality leather portfolio",
      "Simple watch"
    ],
    colors: ["#36454F", "#FFFFFF", "#0F2C5F", "#000000"],
    tags: ["interview", "professional", "formal", "job"],
    occasion: "interview",
    season: "all",
    ratings: {
      comfort: 3,
      style: 5,
      versatility: 4
    }
  }
];

// Helper function to render the rating stars
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {Array(5).fill(0).map((_, i) => (
        <div key={i} className={`w-4 h-4 rounded-full mr-1 ${i < rating ? 'bg-primary' : 'bg-gray-200'}`}></div>
      ))}
    </div>
  );
};

// Main component
const StyleRecommendations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Occasion>('office');
  const [favoriteOutfits, setFavoriteOutfits] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    if (favoriteOutfits.includes(id)) {
      setFavoriteOutfits(favoriteOutfits.filter(outfitId => outfitId !== id));
    } else {
      setFavoriteOutfits([...favoriteOutfits, id]);
    }
  };

  const filteredOutfits = outfitSuggestions.filter(outfit => outfit.occasion === activeTab);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Personalized Style Recommendations</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover outfit suggestions tailored for different occasions to enhance your style and confidence.
        </p>
      </div>

      <Tabs defaultValue="office" value={activeTab} onValueChange={(value) => setActiveTab(value as Occasion)} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="office" className="flex items-center justify-center">
            <Briefcase className="w-4 h-4 mr-2" /> Office
          </TabsTrigger>
          <TabsTrigger value="date" className="flex items-center justify-center">
            <HeartHandshake className="w-4 h-4 mr-2" /> Date Night
          </TabsTrigger>
          <TabsTrigger value="casual" className="flex items-center justify-center">
            <ThumbsUp className="w-4 h-4 mr-2" /> Casual
          </TabsTrigger>
          <TabsTrigger value="formal" className="flex items-center justify-center">
            <Award className="w-4 h-4 mr-2" /> Formal
          </TabsTrigger>
          <TabsTrigger value="interview" className="flex items-center justify-center">
            <Sparkles className="w-4 h-4 mr-2" /> Interview
          </TabsTrigger>
        </TabsList>

        {(['office', 'date', 'casual', 'formal', 'interview'] as Occasion[]).map((occasion) => (
          <TabsContent key={occasion} value={occasion} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredOutfits.map((outfit) => (
                <Card key={outfit.id} className="overflow-hidden">
                  <div className="flex justify-between items-start p-6">
                    <div>
                      <CardTitle className="text-xl mb-1">{outfit.title}</CardTitle>
                      <CardDescription>{outfit.description}</CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleFavorite(outfit.id)}
                      className="h-8 w-8"
                    >
                      <Heart 
                        className={`w-5 h-5 ${favoriteOutfits.includes(outfit.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                      />
                    </Button>
                  </div>
                  
                  <div className="px-6 pb-2 flex flex-wrap gap-1">
                    {outfit.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-3">Key Pieces:</h3>
                    <ul className="list-disc pl-5 space-y-1 mb-6">
                      {outfit.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    
                    <h3 className="font-medium mb-3">Color Palette:</h3>
                    <div className="flex gap-2 mb-6">
                      {outfit.colors.map((color, index) => (
                        <div 
                          key={index} 
                          className="w-8 h-8 rounded-full border border-gray-200" 
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Comfort</p>
                        <RatingStars rating={outfit.ratings.comfort} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Style</p>
                        <RatingStars rating={outfit.ratings.style} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Versatility</p>
                        <RatingStars rating={outfit.ratings.versatility} />
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-muted/20 px-6 py-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="mr-4">Season: {outfit.season.charAt(0).toUpperCase() + outfit.season.slice(1)}</span>
                      
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="capitalize">
                        {outfit.occasion === 'office' 
                          ? 'Workplace' 
                          : outfit.occasion === 'date' 
                            ? 'Date night' 
                            : outfit.occasion}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredOutfits.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-muted inline-flex rounded-full p-4 mb-4">
                  <Clock className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We're working on recommendations for this occasion type. Check back soon!
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-12 bg-muted/30 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Style Tips & Etiquette</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-primary" /> Office Attire Tips
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Always dress slightly more formal than the required dress code</li>
              <li>Invest in quality shoes - they're noticed more than you think</li>
              <li>Keep patterns subtle and professional</li>
              <li>Ensure all clothes are well-pressed and neat</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <HeartHandshake className="w-4 h-4 mr-2 text-primary" /> Date Night Guidance
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Dress for the venue, but elevate slightly to show effort</li>
              <li>Wear something that makes you feel confident</li>
              <li>Avoid overpowering cologne or fragrance</li>
              <li>Choose comfortable shoes - you might be walking</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <Award className="w-4 h-4 mr-2 text-primary" /> Formal Event Etiquette
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Check the invitation for specific dress codes</li>
              <li>Black tie means tuxedo, not just any dark suit</li>
              <li>Accessories should be minimal and elegant</li>
              <li>Polish your shoes before the event</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-primary" /> Interview Success
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Research the company culture before deciding what to wear</li>
              <li>Aim for one level more formal than the everyday office attire</li>
              <li>Ensure clothes are perfectly clean and pressed</li>
              <li>Keep accessories minimal to avoid distractions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleRecommendations;