import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Bookmark
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-dark text-white py-12 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-primary">Style</span>
              <span className="text-accent">Match</span>
            </h3>
            <p className="text-gray-300 text-sm">
              Helping you dress better and feel more confident with personalized style recommendations.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Style Quiz</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Virtual Wardrobe</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Color Matching</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Outfit Recommendations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Style Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Fashion Guides</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Color Theory</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">Subscribe to get style tips and updates.</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="py-2 px-3 text-sm rounded-l-lg bg-gray-700 border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-r-lg text-sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} StyleMatch. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Bookmark className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
