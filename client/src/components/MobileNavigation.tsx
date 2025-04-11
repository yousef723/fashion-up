import { Link, useLocation } from "wouter";
import { Home, Shirt, Palette, Calendar, Upload, Menu } from "lucide-react";

const MobileNavigation = () => {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:hidden">
      <div className="flex justify-around">
        <Link href="/">
          <div className={`flex flex-col items-center p-3 cursor-pointer ${location === '/' ? 'text-primary' : 'text-gray-500'}`}>
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </div>
        </Link>
        <Link href="/photo-analysis">
          <div className={`flex flex-col items-center p-3 cursor-pointer ${location === '/photo-analysis' ? 'text-primary' : 'text-gray-500'}`}>
            <Upload className="w-5 h-5" />
            <span className="text-xs mt-1">Analyze</span>
          </div>
        </Link>
        <Link href="/wardrobe">
          <div className={`flex flex-col items-center p-3 cursor-pointer ${location === '/wardrobe' ? 'text-primary' : 'text-gray-500'}`}>
            <Shirt className="w-5 h-5" />
            <span className="text-xs mt-1">Wardrobe</span>
          </div>
        </Link>
        <Link href="/style-recommendations">
          <div className={`flex flex-col items-center p-3 cursor-pointer ${location === '/style-recommendations' ? 'text-primary' : 'text-gray-500'}`}>
            <Palette className="w-5 h-5" />
            <span className="text-xs mt-1">Guides</span>
          </div>
        </Link>
        <Link href="/occasion-outfits">
          <div className={`flex flex-col items-center p-3 cursor-pointer ${location === '/occasion-outfits' ? 'text-primary' : 'text-gray-500'}`}>
            <Calendar className="w-5 h-5" />
            <span className="text-xs mt-1">Occasions</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavigation;
