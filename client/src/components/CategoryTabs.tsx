import { useState } from "react";
import { Button } from "@/components/ui/button";

type Category = "All" | "Formal" | "Casual" | "Business Casual" | "Party Wear";

interface CategoryTabsProps {
  onCategoryChange: (category: Category) => void;
}

const CategoryTabs = ({ onCategoryChange }: CategoryTabsProps) => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="flex overflow-x-auto pb-2 gap-2 md:gap-4 md:justify-center">
        <Button
          className={`py-2 px-6 rounded-full font-medium whitespace-nowrap ${
            activeCategory === "All" 
              ? "bg-primary text-white" 
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => handleCategoryChange("All")}
        >
          All Items
        </Button>
        <Button
          className={`py-2 px-6 rounded-full font-medium whitespace-nowrap ${
            activeCategory === "Formal" 
              ? "bg-primary text-white" 
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => handleCategoryChange("Formal")}
        >
          Formal
        </Button>
        <Button
          className={`py-2 px-6 rounded-full font-medium whitespace-nowrap ${
            activeCategory === "Casual" 
              ? "bg-primary text-white" 
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => handleCategoryChange("Casual")}
        >
          Casual
        </Button>
        <Button
          className={`py-2 px-6 rounded-full font-medium whitespace-nowrap ${
            activeCategory === "Business Casual" 
              ? "bg-primary text-white" 
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => handleCategoryChange("Business Casual")}
        >
          Business Casual
        </Button>
        <Button
          className={`py-2 px-6 rounded-full font-medium whitespace-nowrap ${
            activeCategory === "Party Wear" 
              ? "bg-primary text-white" 
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => handleCategoryChange("Party Wear")}
        >
          Party Wear
        </Button>
      </div>
    </section>
  );
};

export default CategoryTabs;
