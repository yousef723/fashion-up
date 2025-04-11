import { Link, useLocation } from "wouter";
import { 
  Search, 
  User,
  Upload
} from "lucide-react";

const Header = () => {
  const [location] = useLocation();

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-2xl font-bold cursor-pointer">
              <span className="text-primary">Style</span>
              <span className="text-accent">Match</span>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/">
            <div className={`font-medium cursor-pointer ${location === '/' ? 'text-primary' : 'text-gray-500 hover:text-primary transition'}`}>
              Home
            </div>
          </Link>
          <Link href="/photo-analysis">
            <div className={`font-medium cursor-pointer flex items-center ${location === '/photo-analysis' ? 'text-primary' : 'text-gray-500 hover:text-primary transition'}`}>
              <Upload className="w-4 h-4 mr-1" />
              Photo Analysis
            </div>
          </Link>
          <Link href="/wardrobe">
            <div className={`font-medium cursor-pointer ${location === '/wardrobe' ? 'text-primary' : 'text-gray-500 hover:text-primary transition'}`}>
              My Wardrobe
            </div>
          </Link>
          <Link href="/style-recommendations">
            <div className={`font-medium cursor-pointer ${location === '/style-recommendations' ? 'text-primary' : 'text-gray-500 hover:text-primary transition'}`}>
              Style Guides
            </div>
          </Link>
          <Link href="/occasion-outfits">
            <div className={`font-medium cursor-pointer ${location === '/occasion-outfits' ? 'text-primary' : 'text-gray-500 hover:text-primary transition'}`}>
              Occasions
            </div>
          </Link>
          <Link href="/seasonal-style-guide">
            <div className={`font-medium cursor-pointer ${location === '/seasonal-style-guide' ? 'text-primary' : 'text-gray-500 hover:text-primary transition'}`}>
              Seasonal
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 ml-2">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
