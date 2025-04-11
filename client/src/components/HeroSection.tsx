import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-6 md:p-12">
        <div className="max-w-2xl">
          <h2 className="fancy-title text-3xl md:text-4xl font-semibold mb-4">Elevate Your Style</h2>
          <p className="text-lg text-gray-700 mb-8">
            Discover the perfect outfits that match your style, body type, and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/style-guide/1">
              <Button className="bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition flex items-center justify-center">
                <span>Take Style Quiz</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/outfit/1">
              <Button variant="outline" className="bg-white text-neutral-dark py-3 px-6 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition">
                Browse Outfits
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
