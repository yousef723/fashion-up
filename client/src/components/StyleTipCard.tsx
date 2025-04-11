import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { StyleGuide } from "@shared/schema";

interface StyleTipCardProps {
  guide: StyleGuide;
}

const StyleTipCard = ({ guide }: StyleTipCardProps) => {
  return (
    <Card className="bg-white rounded-xl shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={guide.imageUrl} 
          alt={guide.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-100 flex items-end">
          <div className="p-4">
            <span className={`text-white ${
              guide.category === "Guide" ? "bg-primary/80" :
              guide.category === "Color Theory" ? "bg-accent/80" :
              "bg-neutral-dark/80"
            } text-xs py-1 px-2 rounded-full`}>
              {guide.category}
            </span>
            <h3 className="text-white font-semibold mt-2">{guide.title}</h3>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {guide.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{guide.readTime}</span>
          <Link href={`/style-guide/${guide.id}`}>
            <button className="text-primary text-sm font-medium">Read More</button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default StyleTipCard;
