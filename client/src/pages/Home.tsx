import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Plus } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CategoryTabs from "@/components/CategoryTabs";
import OutfitCard from "@/components/OutfitCard";
import WardrobeItem from "@/components/WardrobeItem";
import StyleTipCard from "@/components/StyleTipCard";
import ColorCoordinationGuide from "@/components/ColorCoordinationGuide";
import { Outfit, ClothingItem, StyleGuide, ColorPalette } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  // Fetch outfits
  const { data: outfits, isLoading: outfitsLoading } = useQuery<Outfit[]>({
    queryKey: ['/api/outfits'],
  });

  // Fetch clothing items
  const { data: clothingItems, isLoading: clothingItemsLoading } = useQuery<ClothingItem[]>({
    queryKey: ['/api/clothing-items'],
  });

  // Fetch style guides
  const { data: styleGuides, isLoading: guidesLoading } = useQuery<StyleGuide[]>({
    queryKey: ['/api/style-guides'],
  });

  // Fetch color palettes
  const { data: colorPalettes, isLoading: palettesLoading } = useQuery<ColorPalette[]>({
    queryKey: ['/api/color-palettes'],
  });

  const handleCategoryChange = (category: string) => {
    // This would typically filter the outfits by category
    // For now, we'll just log it
    console.log(`Category changed to: ${category}`);
  };
  
  return (
    <>
      <HeroSection />
      
      <CategoryTabs onCategoryChange={handleCategoryChange} />
      
      {/* Outfit Recommendations */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <Link href="/outfit/1">
            <button className="text-primary font-medium flex items-center">
              <span>View All</span>
              <ArrowRight className="ml-1 w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {outfitsLoading ? (
            // Loading skeletons
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <Skeleton className="aspect-[3/4] w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <div className="flex gap-2 mb-3">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="w-6 h-6 rounded-full" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            outfits?.map(outfit => <OutfitCard key={outfit.id} outfit={outfit} />)
          )}
        </div>
      </section>
      
      {/* Color Coordination Guide */}
      {!palettesLoading && colorPalettes && (
        <ColorCoordinationGuide colorPalettes={colorPalettes} />
      )}
      
      {/* My Wardrobe Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Wardrobe</h2>
          <Link href="/wardrobe">
            <button className="text-primary font-medium flex items-center">
              <Plus className="mr-1 w-4 h-4" />
              <span>Add Items</span>
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {clothingItemsLoading ? (
            // Loading skeletons
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-3">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))
          ) : (
            <>
              {clothingItems?.slice(0, 5).map(item => (
                <WardrobeItem key={item.id} item={item} />
              ))}
              <WardrobeItem isAddItem onAddClick={() => console.log('Add item clicked')} />
            </>
          )}
        </div>
      </section>
      
      {/* Style Tips Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Style Tips & Guides</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guidesLoading ? (
            // Loading skeletons
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-4">
                  <Skeleton className="h-5 w-1/4 mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            styleGuides?.map(guide => <StyleTipCard key={guide.id} guide={guide} />)
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
