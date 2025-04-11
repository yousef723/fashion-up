import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Landmark, 
  Plane, 
  Wine, 
  UtensilsCrossed, 
  Briefcase, 
  GraduationCap,
  Coffee,
  Music,
  ShoppingBag,
  Sailboat,
  ChevronRight,
  Star,
  Tag
} from 'lucide-react';

interface OutfitOption {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  priceRange: string;
  formality: 'casual' | 'smart casual' | 'business casual' | 'formal' | 'black tie';
  pieces: string[];
  colors: string[];
  featured?: boolean;
  discount?: string;
  new?: boolean;
}

interface OccasionSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  outfits: OutfitOption[];
}

const occasionSections: OccasionSection[] = [
  {
    id: 'restaurant',
    title: 'Restaurant',
    icon: <UtensilsCrossed className="h-5 w-5" />,
    description: 'From casual bistros to fine dining, dress appropriately for any culinary experience',
    outfits: [
      {
        id: 1,
        title: 'Fine Dining Elegance',
        description: 'A sophisticated outfit perfect for upscale restaurants',
        imageUrl: 'https://placehold.co/300x400?text=Fine+Dining',
        priceRange: '$$$',
        formality: 'formal',
        pieces: [
          'Tailored navy suit',
          'White dress shirt',
          'Patterned silk tie',
          'Leather Oxford shoes',
          'Minimalist watch'
        ],
        colors: ['#0F2C5F', '#FFFFFF', '#A8C8F9', '#5C3A21'],
        featured: true
      },
      {
        id: 2,
        title: 'Casual Bistro',
        description: 'Relaxed yet put-together for casual dining establishments',
        imageUrl: 'https://placehold.co/300x400?text=Casual+Bistro',
        priceRange: '$',
        formality: 'smart casual',
        pieces: [
          'Dark jeans',
          'Button-down shirt or quality polo',
          'Casual blazer (optional)',
          'Clean, stylish sneakers or loafers',
          'Simple accessories'
        ],
        colors: ['#101D42', '#A8C8F9', '#5C3A21', '#FFFFFF'],
        new: true
      },
      {
        id: 3,
        title: 'Business Lunch',
        description: 'Professional attire suitable for lunch meetings',
        imageUrl: 'https://placehold.co/300x400?text=Business+Lunch',
        priceRange: '$$',
        formality: 'business casual',
        pieces: [
          'Gray or navy slacks',
          'Light blue or white dress shirt',
          'Leather belt',
          'Polished leather shoes',
          'Professional watch'
        ],
        colors: ['#36454F', '#A8C8F9', '#FFFFFF', '#5C3A21']
      }
    ]
  },
  {
    id: 'travel',
    title: 'Travel',
    icon: <Plane className="h-5 w-5" />,
    description: 'Comfortable yet stylish options for various travel scenarios',
    outfits: [
      {
        id: 4,
        title: 'Long-Haul Flight',
        description: 'Comfortable and versatile for long international flights',
        imageUrl: 'https://placehold.co/300x400?text=Long+Flight',
        priceRange: '$$',
        formality: 'casual',
        pieces: [
          'Stretch chinos or comfortable pants',
          'Breathable t-shirt or henley',
          'Light zip-up jacket or cardigan',
          'Slip-on shoes',
          'Compression socks'
        ],
        colors: ['#D3D3D3', '#E6E6FA', '#101D42', '#5C3A21'],
        discount: '15% OFF'
      },
      {
        id: 5,
        title: 'City Break Explorer',
        description: 'Practical yet stylish for exploring new cities',
        imageUrl: 'https://placehold.co/300x400?text=City+Explorer',
        priceRange: '$$',
        formality: 'smart casual',
        pieces: [
          'Dark jeans or chinos',
          'Quality t-shirt or polo',
          'Light jacket or overshirt',
          'Comfortable walking shoes',
          'Crossbody bag'
        ],
        colors: ['#101D42', '#A8C8F9', '#F5F5F5', '#5C3A21'],
        featured: true
      }
    ]
  },
  {
    id: 'cocktails',
    title: 'Cocktail Bar',
    icon: <Wine className="h-5 w-5" />,
    description: 'Stylish ensembles perfect for evening drinks and socializing',
    outfits: [
      {
        id: 6,
        title: 'Evening Sophistication',
        description: 'Sharp and stylish for upscale cocktail lounges',
        imageUrl: 'https://placehold.co/300x400?text=Cocktail+Lounge',
        priceRange: '$$$',
        formality: 'smart casual',
        pieces: [
          'Dark fitted blazer',
          'Crisp button-down shirt (no tie)',
          'Slim fit dark jeans or trousers',
          'Leather Chelsea boots or loafers',
          'Statement watch'
        ],
        colors: ['#000000', '#FFFFFF', '#101D42', '#5C3A21'],
        new: true
      },
      {
        id: 7,
        title: 'Casual Drinks',
        description: 'Relaxed yet put-together for casual bars',
        imageUrl: 'https://placehold.co/300x400?text=Casual+Bar',
        priceRange: '$',
        formality: 'casual',
        pieces: [
          'Well-fitted t-shirt or henley',
          'Dark jeans',
          'Leather jacket or quality overshirt',
          'Clean sneakers or desert boots',
          'Minimal accessories'
        ],
        colors: ['#101D42', '#36454F', '#5C3A21', '#FFFFFF']
      }
    ]
  },
  {
    id: 'work',
    title: 'Office',
    icon: <Briefcase className="h-5 w-5" />,
    description: 'Professional attire for various workplace environments',
    outfits: [
      {
        id: 8,
        title: 'Corporate Professional',
        description: 'Polished and authoritative for formal business settings',
        imageUrl: 'https://placehold.co/300x400?text=Corporate',
        priceRange: '$$$',
        formality: 'formal',
        pieces: [
          'Navy or charcoal suit',
          'White or light blue dress shirt',
          'Silk tie in complementary color',
          'Oxford or Derby shoes',
          'Leather belt matching shoes',
          'Minimalist watch'
        ],
        colors: ['#0F2C5F', '#36454F', '#FFFFFF', '#A8C8F9', '#780010'],
        featured: true
      },
      {
        id: 9,
        title: 'Creative Office',
        description: 'Expressive yet professional for creative workplaces',
        imageUrl: 'https://placehold.co/300x400?text=Creative+Office',
        priceRange: '$$',
        formality: 'smart casual',
        pieces: [
          'Chinos or dark jeans',
          'Patterned button-down or quality polo',
          'Unstructured blazer (optional)',
          'Desert boots or clean sneakers',
          'Interesting but subtle accessories'
        ],
        colors: ['#101D42', '#008080', '#F5F5F5', '#5C3A21']
      }
    ]
  },
  {
    id: 'formal',
    title: 'Formal Event',
    icon: <Landmark className="h-5 w-5" />,
    description: 'Elegant ensembles for weddings, galas, and special occasions',
    outfits: [
      {
        id: 10,
        title: 'Black Tie Ready',
        description: 'Classic and sophisticated for formal evening events',
        imageUrl: 'https://placehold.co/300x400?text=Black+Tie',
        priceRange: '$$$$',
        formality: 'black tie',
        pieces: [
          'Black tuxedo',
          'White dress shirt with French cuffs',
          'Black bow tie',
          'Cummerbund or vest',
          'Patent leather Oxford shoes',
          'Cufflinks and studs'
        ],
        colors: ['#000000', '#FFFFFF'],
        discount: '20% OFF'
      },
      {
        id: 11,
        title: 'Wedding Guest',
        description: 'Appropriate and stylish for daytime wedding celebrations',
        imageUrl: 'https://placehold.co/300x400?text=Wedding+Guest',
        priceRange: '$$$',
        formality: 'formal',
        pieces: [
          'Light gray or navy suit',
          'Crisp dress shirt in white or pastel',
          'Patterned tie or pocket square',
          'Polished leather dress shoes',
          'Dress watch'
        ],
        colors: ['#0F2C5F', '#D3D3D3', '#FFFFFF', '#A8C8F9', '#FFC0CB']
      }
    ]
  },
  {
    id: 'graduation',
    title: 'Graduation',
    icon: <GraduationCap className="h-5 w-5" />,
    description: 'Commemorative attire for academic milestone celebrations',
    outfits: [
      {
        id: 12,
        title: 'Under the Gown',
        description: 'Professional attire to wear beneath your graduation gown',
        imageUrl: 'https://placehold.co/300x400?text=Graduation',
        priceRange: '$$',
        formality: 'business casual',
        pieces: [
          'Light dress shirt',
          'Dark dress pants',
          'Conservative tie',
          'Comfortable dress shoes',
          'Minimal accessories'
        ],
        colors: ['#FFFFFF', '#0F2C5F', '#101D42', '#5C3A21'],
        new: true
      }
    ]
  },
  {
    id: 'coffee',
    title: 'Coffee Date',
    icon: <Coffee className="h-5 w-5" />,
    description: 'Casual yet thoughtful looks for coffee meetings and dates',
    outfits: [
      {
        id: 13,
        title: 'Casual Sophistication',
        description: 'Relaxed yet put-together for a great first impression',
        imageUrl: 'https://placehold.co/300x400?text=Coffee+Date',
        priceRange: '$$',
        formality: 'smart casual',
        pieces: [
          'Well-fitted dark jeans',
          'Quality button-down shirt or clean sweater',
          'Casual blazer or light jacket',
          'Desert boots or clean sneakers',
          'Simple watch'
        ],
        colors: ['#101D42', '#5C3A21', '#D3D3D3', '#FFFFFF'],
        featured: true
      }
    ]
  },
  {
    id: 'concert',
    title: 'Concert',
    icon: <Music className="h-5 w-5" />,
    description: 'Express your style at music events while staying comfortable',
    outfits: [
      {
        id: 14,
        title: 'Rock Concert Edge',
        description: 'Stylish and practical for standing-room concerts',
        imageUrl: 'https://placehold.co/300x400?text=Rock+Concert',
        priceRange: '$$',
        formality: 'casual',
        pieces: [
          'Band t-shirt or fitted plain tee',
          'Dark jeans or black pants',
          'Leather jacket or denim jacket',
          'Comfortable boots or sneakers',
          'Minimal accessories'
        ],
        colors: ['#000000', '#101D42', '#36454F', '#5C3A21']
      },
      {
        id: 15,
        title: 'Orchestra Night',
        description: 'Refined and appropriate for classical performances',
        imageUrl: 'https://placehold.co/300x400?text=Orchestra',
        priceRange: '$$$',
        formality: 'smart casual',
        pieces: [
          'Navy blazer or sports coat',
          'Dress shirt or fine knit sweater',
          'Dress pants or dark chinos',
          'Leather dress shoes',
          'Optional pocket square'
        ],
        colors: ['#0F2C5F', '#FFFFFF', '#D3D3D3', '#5C3A21']
      }
    ]
  }
];

const OccasionOutfits: React.FC = () => {
  const [activeTab, setActiveTab] = useState('restaurant');
  const [hoveredOutfit, setHoveredOutfit] = useState<number | null>(null);

  const activeSection = occasionSections.find(section => section.id === activeTab);

  const getFormality = (level: string) => {
    switch(level) {
      case 'casual': return 'Casual';
      case 'smart casual': return 'Smart Casual';
      case 'business casual': return 'Business Casual';
      case 'formal': return 'Formal';
      case 'black tie': return 'Black Tie';
      default: return level;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Occasion-Based Style Guide</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find the perfect outfit for any occasion, from business meetings to social events
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 mb-8">
          {occasionSections.map((section) => (
            <TabsTrigger key={section.id} value={section.id} className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="mb-1">{section.icon}</div>
                <span className="text-xs">{section.title}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {activeSection && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                {activeSection.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold">{activeSection.title} Attire</h3>
                <p className="text-muted-foreground">{activeSection.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {activeSection.outfits.map((outfit) => (
                <Card 
                  key={outfit.id} 
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg relative"
                  onMouseEnter={() => setHoveredOutfit(outfit.id)}
                  onMouseLeave={() => setHoveredOutfit(null)}
                >
                  {outfit.featured && (
                    <div className="absolute top-0 left-0 bg-primary text-primary-foreground py-1 px-3 z-10 rounded-br-lg flex items-center">
                      <Star className="w-3 h-3 mr-1 fill-current" /> Featured
                    </div>
                  )}
                  
                  {outfit.new && (
                    <div className="absolute top-0 left-0 bg-green-500 text-white py-1 px-3 z-10 rounded-br-lg">
                      NEW
                    </div>
                  )}
                  
                  {outfit.discount && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white py-1 px-3 z-10 rounded-bl-lg flex items-center">
                      <Tag className="w-3 h-3 mr-1" /> {outfit.discount}
                    </div>
                  )}
                  
                  <div className="relative">
                    <img 
                      src={outfit.imageUrl} 
                      alt={outfit.title} 
                      className="w-full aspect-[3/4] object-cover transition-transform duration-300"
                      style={{
                        transform: hoveredOutfit === outfit.id ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                      <p className="font-medium">{outfit.title}</p>
                      <div className="flex justify-between items-center">
                        <span>{outfit.priceRange}</span>
                        <span className="text-xs uppercase bg-white/20 px-2 py-0.5 rounded">
                          {getFormality(outfit.formality)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <p className="text-muted-foreground text-sm mb-3">
                      {outfit.description}
                    </p>
                    
                    <h4 className="font-medium text-sm mb-2">Key Pieces:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4 list-disc mb-4">
                      {outfit.pieces.slice(0, 3).map((piece, idx) => (
                        <li key={idx}>{piece}</li>
                      ))}
                      {outfit.pieces.length > 3 && (
                        <li className="text-primary cursor-pointer font-medium list-none">
                          + {outfit.pieces.length - 3} more pieces
                        </li>
                      )}
                    </ul>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">Color Palette:</h4>
                      <div className="flex gap-2">
                        {outfit.colors.map((color, idx) => (
                          <div 
                            key={idx} 
                            className="w-6 h-6 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-muted/20 px-4 py-3 flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      {outfit.formality}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-primary flex items-center p-0">
                      View Details <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Tabs>
      
      {/* Universal Style Tips */}
      <div className="bg-muted/30 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-bold mb-4">Universal Style Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fit Is Everything</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No matter the occasion, well-fitted clothing is the foundation of good style. Invest in tailoring for key pieces and remember:
              </p>
              <ul className="mt-4 space-y-2 pl-5 list-disc">
                <li>Shoulders of jackets should end at your shoulder bone</li>
                <li>Shirt sleeves should hit at your wristbone</li>
                <li>Pants should break slightly at the shoes</li>
                <li>T-shirts should fit near the body without being tight</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Color Coordination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Master these simple color principles for foolproof outfit combinations:
              </p>
              <ul className="mt-4 space-y-2 pl-5 list-disc">
                <li>Navy, gray, and white work with nearly everything</li>
                <li>Limit outfits to 3 colors maximum for cohesion</li>
                <li>For beginners, keep colors subdued and patterns minimal</li>
                <li>Ensure your shoes complement (not necessarily match) your belt</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OccasionOutfits;