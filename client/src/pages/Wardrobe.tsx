import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ClothingItem } from "@shared/schema";
import WardrobeItem from "@/components/WardrobeItem";
import CategoryTabs from "@/components/CategoryTabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Wardrobe = () => {
  const [category, setCategory] = useState("All");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Fetch clothing items
  const { data: clothingItems, isLoading } = useQuery<ClothingItem[]>({
    queryKey: ['/api/clothing-items'],
  });

  // Filter items by category
  const filteredItems = category === "All" 
    ? clothingItems 
    : clothingItems?.filter(item => item.category === category);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">My Wardrobe</h1>
      
      {/* Category Filter */}
      <CategoryTabs onCategoryChange={handleCategoryChange} />
      
      {/* Add Item Button */}
      <div className="flex justify-end mb-6">
        <Button 
          className="bg-primary text-white hover:bg-primary/90"
          onClick={() => setIsAddDialogOpen(true)}
        >
          Add New Item
        </Button>
      </div>
      
      {/* Wardrobe Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {isLoading ? (
          // Loading skeletons
          Array(12).fill(0).map((_, i) => (
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
            {filteredItems?.map(item => (
              <WardrobeItem key={item.id} item={item} />
            ))}
            <WardrobeItem isAddItem onAddClick={() => setIsAddDialogOpen(true)} />
          </>
        )}
      </div>
      
      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Clothing Item</DialogTitle>
            <DialogDescription>
              Enter the details of your clothing item to add it to your wardrobe.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" placeholder="Item name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Business Casual">Business Casual</SelectItem>
                  <SelectItem value="Party Wear">Party Wear</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                  <SelectItem value="footwear">Footwear</SelectItem>
                  <SelectItem value="accessory">Accessory</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                Image URL
              </Label>
              <Input id="imageUrl" placeholder="https://example.com/image.jpg" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Main Color
              </Label>
              <Input id="color" placeholder="e.g. blue" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wardrobe;
