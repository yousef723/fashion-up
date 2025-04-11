import { Button } from "@/components/ui/button";
import { 
  Palette, 
  ContrastIcon, 
  PaintbrushVertical, 
  Focus
} from "lucide-react";
import { ColorPalette } from "@shared/schema";

interface ColorCoordinationGuideProps {
  colorPalettes: ColorPalette[];
}

const ColorCoordinationGuide = ({ colorPalettes }: ColorCoordinationGuideProps) => {
  const formalPalette = colorPalettes.find(p => p.name === "Formal Essentials") || {
    id: 0,
    name: "Formal Essentials",
    colors: ["navy", "forest", "amber", "charcoal", "burgundy", "stone"],
    description: "Classic colors that work well for formal attire across various skin tones."
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Color Coordination Guide</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Find Your Color Palette</h3>
            <p className="text-gray-700 mb-4">
              Discover which colors complement your skin tone, hair, and eyes for a harmonious look.
            </p>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              {formalPalette.colors.map((color, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-full aspect-square rounded-lg mb-2"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-sm text-gray-700 capitalize">{color}</span>
                </div>
              ))}
            </div>
            
            <Button className="bg-primary text-white py-2 px-5 rounded-lg font-medium hover:bg-primary/90 transition text-sm">
              Find My Colors
            </Button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Color Combination Rules</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full mt-1">
                  <Palette className="text-primary w-4 h-4" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Complementary Colors</h4>
                  <p className="text-sm text-gray-600">Colors opposite on the color wheel create vibrant contrasts.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full mt-1">
                  <ContrastIcon className="text-primary w-4 h-4" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Monochromatic</h4>
                  <p className="text-sm text-gray-600">Different shades of the same color for a sophisticated look.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full mt-1">
                  <PaintbrushVertical className="text-primary w-4 h-4" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Analogous Colors</h4>
                  <p className="text-sm text-gray-600">Colors that sit beside each other on the color wheel.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full mt-1">
                  <Focus className="text-primary w-4 h-4" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Neutral Base</h4>
                  <p className="text-sm text-gray-600">Build outfits on neutral colors and add pops of color.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorCoordinationGuide;
