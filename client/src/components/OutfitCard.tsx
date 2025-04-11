import { useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Heart, CheckCircle, ArrowRight } from "lucide-react";
import { Outfit } from "@shared/schema";

interface OutfitCardProps {
  outfit: Outfit;
}

const OutfitCard = ({ outfit }: OutfitCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="aspect-[3/4] relative overflow-hidden">
        <img 
          src={outfit.imageUrl} 
          alt={outfit.name} 
          className="w-full h-full object-cover"
        />
        <button 
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm cursor-pointer hover:bg-gray-100"
          onClick={handleFavoriteClick}
        >
          <Heart className={`text-lg ${isFavorited ? 'fill-accent text-accent' : 'text-gray-700'}`} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className={`text-white font-medium ${
            outfit.category === "Formal" || outfit.category === "Business" 
              ? "bg-primary/90" 
              : "bg-accent/90"
            } py-1 px-3 rounded-full text-sm`}>
            {outfit.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{outfit.name}</h3>
        <div className="flex gap-2 mb-3">
          {outfit.colors.map((color, index) => (
            <span key={index} className={`w-6 h-6 rounded-full border border-gray-200`} style={{ backgroundColor: color }} />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-primary font-medium">{outfit.matchScore}</span>
            <CheckCircle className="ml-1 text-primary w-4 h-4" />
          </div>
          <Link href={`/outfit/${outfit.id}`}>
            <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition">
              <ArrowRight className="text-gray-700 w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default OutfitCard;
