import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Edit, Plus } from "lucide-react";
import { ClothingItem } from "@shared/schema";

interface WardrobeItemProps {
  item?: ClothingItem;
  isAddItem?: boolean;
  onAddClick?: () => void;
}

const WardrobeItem = ({ item, isAddItem, onAddClick }: WardrobeItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (isAddItem) {
    return (
      <Card 
        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer group flex items-center justify-center border-2 border-dashed border-gray-300"
        onClick={onAddClick}
      >
        <div className="text-center p-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Plus className="text-gray-500 w-5 h-5" />
          </div>
          <p className="text-sm text-gray-500">Add Item</p>
        </div>
      </Card>
    );
  }

  if (!item) return null;

  return (
    <Card 
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className={`w-full h-full object-cover ${isHovered ? 'scale-105' : ''} transition duration-300`}
        />
        <div className={`absolute inset-0 bg-black/30 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
          <button className="bg-white text-neutral-dark p-2 rounded-full">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium">{item.name}</h3>
        <span className="text-xs text-gray-500">{item.category}</span>
      </div>
    </Card>
  );
};

export default WardrobeItem;
