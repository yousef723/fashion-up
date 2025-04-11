import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { StyleGuide as StyleGuideType } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Share2, Clock } from "lucide-react";
import ColorCoordinationGuide from "@/components/ColorCoordinationGuide";

const StyleGuide = () => {
  const { id } = useParams();
  
  // Fetch style guide
  const { data: guide, isLoading: guideLoading } = useQuery<StyleGuideType>({
    queryKey: ['/api/style-guides', parseInt(id || "1")],
  });

  // Fetch color palettes for the guide
  const { data: colorPalettes, isLoading: palettesLoading } = useQuery({
    queryKey: ['/api/color-palettes'],
  });

  if (guideLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <div className="flex gap-2 items-center mb-6">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          
          <Skeleton className="aspect-[2/1] w-full rounded-xl mb-8" />
          
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Style Guide Not Found</h2>
          <p className="text-gray-500 mb-6">The style guide you're looking for doesn't exist or has been removed.</p>
          <Button asChild variant="outline">
            <a href="/">Return to Home</a>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" className="mb-8 flex items-center" asChild>
        <a href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to guides
        </a>
      </Button>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{guide.title}</h1>
        
        <div className="flex items-center gap-3 mb-8 text-gray-600">
          <span className={`text-xs py-1 px-2 rounded-full text-white ${
            guide.category === "Guide" ? "bg-primary/80" :
            guide.category === "Color Theory" ? "bg-accent/80" :
            "bg-neutral-dark/80"
          }`}>
            {guide.category}
          </span>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{guide.readTime}</span>
          </div>
          
          <Button variant="ghost" size="sm" className="ml-auto">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
        
        <div className="mb-8 rounded-xl overflow-hidden">
          <img 
            src={guide.imageUrl} 
            alt={guide.title} 
            className="w-full h-auto"
          />
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg font-medium mb-4">{guide.description}</p>
          
          <div className="text-gray-700 leading-relaxed">
            <p>{guide.content || "Content for this style guide is being updated."}</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <ul className="space-y-2">
              <li>Understand how different colors work together to create harmonious outfits</li>
              <li>Learn about the importance of proper fit in enhancing your appearance</li>
              <li>Discover how to mix and match pieces for maximum versatility</li>
              <li>Find out which styles complement your body type best</li>
            </ul>
          </div>
        </div>
        
        {/* Color Coordination Section */}
        {!palettesLoading && colorPalettes && (
          <div className="mt-12">
            <ColorCoordinationGuide colorPalettes={colorPalettes} />
          </div>
        )}
        
        {/* Related Guides Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Guides</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* This would be replaced with actual related guides */}
            {Array(3).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden group">
                <div className="aspect-video relative overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleGuide;
