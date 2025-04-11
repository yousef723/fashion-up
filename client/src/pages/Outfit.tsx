import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Outfit as OutfitType } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, ArrowLeft, Share2, Check } from "lucide-react";
import { useState } from "react";

const Outfit = () => {
  const { id } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Fetch outfit data
  const { data: outfit, isLoading } = useQuery<OutfitType>({
    queryKey: ['/api/outfits', parseInt(id || "1")],
    queryFn: async () => {
      const response = await fetch(`/api/outfits/${parseInt(id || "1")}`);
      if (!response.ok) {
        throw new Error('Failed to fetch outfit');
      }
      return await response.json();
    }
  });

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-[3/4] w-full" />
          <div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            
            <div className="flex gap-3 mb-6">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            
            <div className="flex gap-4 mt-8">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!outfit) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Outfit Not Found</h2>
          <p className="text-gray-500 mb-6">The outfit you're looking for doesn't exist or has been removed.</p>
          <Button asChild variant="outline">
            <a href="/">Return to Home</a>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" className="mb-6 flex items-center" asChild>
        <a href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to recommendations
        </a>
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Outfit Image */}
        <div className="rounded-xl overflow-hidden relative">
          <img 
            src={outfit.imageUrl || "https://placehold.co/600x800?text=Outfit+Image"} 
            alt={outfit.name} 
            className="w-full h-auto"
          />
          <span className={`absolute top-4 left-4 text-white font-medium ${
            outfit.category === "Formal" || outfit.category === "Business" 
              ? "bg-primary/90" 
              : "bg-accent/90"
          } py-1 px-4 rounded-full`}>
            {outfit.category}
          </span>
        </div>
        
        {/* Outfit Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{outfit.name}</h1>
          {outfit.matchScore && (
            <div className="flex items-center mb-6">
              <span className="text-primary font-medium">{outfit.matchScore}</span>
              <Check className="ml-1 text-primary w-4 h-4" />
            </div>
          )}
          
          <p className="text-gray-700 mb-6">
            {outfit.description || "A perfect outfit combination that matches your style preferences and body type."}
          </p>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Color Palette</h3>
            <div className="flex gap-3">
              {outfit.colors && outfit.colors.length > 0 ? (
                outfit.colors.map((color, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-10 h-10 rounded-full mb-1 border border-gray-200" 
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-xs text-gray-600 capitalize">{color}</span>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full mb-1 border border-gray-200 bg-gray-200"></div>
                  <span className="text-xs text-gray-600">No colors</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Pairing Suggestions</h3>
            <ul className="text-gray-700 space-y-2 pl-5 list-disc">
              <li>Pair with minimalist accessories to maintain the elegant look</li>
              <li>Choose shoes in a complementary neutral tone</li>
              <li>Consider weather appropriate layering options</li>
            </ul>
          </div>
          
          <div className="flex gap-4">
            <Button 
              className={`flex items-center ${isFavorited ? 'bg-accent text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
              onClick={handleFavoriteClick}
            >
              <Heart className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-white' : ''}`} />
              {isFavorited ? 'Saved' : 'Save to Favorites'}
            </Button>
            <Button variant="outline" className="flex items-center">
              <Share2 className="mr-2 h-4 w-4" />
              Share Outfit
            </Button>
          </div>
        </div>
      </div>
      
      {/* Recommended Items Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Complete This Look</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* This would be replaced with actual recommended items */}
          {Array(4).fill(0).map((_, i) => (
            <Card key={i} className="overflow-hidden group">
              <div className="aspect-square relative overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="p-3">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Outfit;
