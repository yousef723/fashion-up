import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Sun, 
  Snowflake, 
  Wind, 
  Cloud, 
  ThermometerSun, 
  Umbrella, 
  Leaf, 
  SunSnow,
  CircleCheck,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EssentialItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: 'clothing' | 'footwear' | 'accessory';
  mustHave: boolean;
  tags: string[];
}

interface SeasonData {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  essentials: EssentialItem[];
  tips: string[];
  layeringGuide?: {
    base?: string[];
    mid?: string[];
    outer?: string[];
    accessories?: string[];
  };
  colorPalette: string[];
  fabricRecommendations: string[];
  weatherChallenges?: {
    challenge: string;
    solution: string;
  }[];
}

const seasons: SeasonData[] = [
  {
    id: 'spring',
    name: 'Spring',
    icon: <Leaf className="h-5 w-5" />,
    color: '#8CC084',
    essentials: [
      {
        id: 1,
        name: 'Lightweight Chinos',
        description: 'Versatile pants that work for both casual and smart-casual settings',
        imageUrl: 'https://placehold.co/300x400?text=Lightweight+Chinos',
        category: 'clothing',
        mustHave: true,
        tags: ['versatile', 'smart-casual', 'office-appropriate']
      },
      {
        id: 2,
        name: 'Oxford Button-Down Shirt',
        description: 'A crisp, breathable shirt that can be dressed up or down',
        imageUrl: 'https://placehold.co/300x400?text=Oxford+Shirt',
        category: 'clothing',
        mustHave: true,
        tags: ['classic', 'versatile', 'breathable']
      },
      {
        id: 3,
        name: 'Light Merino Sweater',
        description: 'Perfect for layering on cooler spring days',
        imageUrl: 'https://placehold.co/300x400?text=Merino+Sweater',
        category: 'clothing',
        mustHave: false,
        tags: ['layering', 'temperature-regulation', 'smart-casual']
      },
      {
        id: 4,
        name: 'Unlined Blazer',
        description: 'An unstructured, lightweight blazer for a touch of sophistication',
        imageUrl: 'https://placehold.co/300x400?text=Unlined+Blazer',
        category: 'clothing',
        mustHave: false,
        tags: ['smart', 'lightweight', 'versatile']
      },
      {
        id: 5,
        name: 'Desert Boots',
        description: 'Versatile footwear that bridges casual and smart-casual',
        imageUrl: 'https://placehold.co/300x400?text=Desert+Boots',
        category: 'footwear',
        mustHave: true,
        tags: ['versatile', 'comfortable', 'smart-casual']
      },
      {
        id: 6,
        name: 'Lightweight Raincoat',
        description: 'Protection from spring showers without overheating',
        imageUrl: 'https://placehold.co/300x400?text=Raincoat',
        category: 'clothing',
        mustHave: true,
        tags: ['weather-protection', 'practical', 'layering']
      }
    ],
    tips: [
      'Layer strategically for temperature changes throughout the day',
      'Incorporate lighter colors to reflect the season\'s freshness',
      'Choose breathable fabrics that can handle unexpected warmth',
      'Opt for versatile pieces that work in both sunny and rainy conditions',
      'Begin transitioning from winter\'s dark palette to brighter spring tones'
    ],
    layeringGuide: {
      base: ['Breathable t-shirt or lightweight button-down', 'Lightweight chinos or jeans'],
      mid: ['Light merino sweater or cardigan', 'Unstructured blazer for smart occasions'],
      outer: ['Lightweight raincoat or harrington jacket'],
      accessories: ['Light scarf for cooler mornings', 'Sunglasses for bright days']
    },
    colorPalette: ['#8CC084', '#A8C8F9', '#F5F5F5', '#D3D3D3', '#FFC0CB'],
    fabricRecommendations: [
      'Cotton - breathable and versatile',
      'Light wool - for cooler days and evenings',
      'Cotton-linen blends - breathable with less wrinkling than pure linen',
      'Lightweight denim - versatile for changing conditions'
    ],
    weatherChallenges: [
      {
        challenge: 'Unexpected rain showers',
        solution: 'Keep a packable raincoat or small umbrella in your bag or car'
      },
      {
        challenge: 'Temperature fluctuations',
        solution: 'Master the art of layering with pieces that can be easily added or removed'
      },
      {
        challenge: 'Muddy conditions',
        solution: 'Opt for water-resistant footwear with good traction'
      }
    ]
  },
  {
    id: 'summer',
    name: 'Summer',
    icon: <Sun className="h-5 w-5" />,
    color: '#F9D56E',
    essentials: [
      {
        id: 7,
        name: 'Linen Shirt',
        description: 'Breathable and light for hot days, with a relaxed yet put-together look',
        imageUrl: 'https://placehold.co/300x400?text=Linen+Shirt',
        category: 'clothing',
        mustHave: true,
        tags: ['breathable', 'classic', 'cooling']
      },
      {
        id: 8,
        name: 'Lightweight Chino Shorts',
        description: 'Versatile shorts suitable for casual and some smart-casual settings',
        imageUrl: 'https://placehold.co/300x400?text=Chino+Shorts',
        category: 'clothing',
        mustHave: true,
        tags: ['casual', 'comfortable', 'breathable']
      },
      {
        id: 9,
        name: 'Quality Polo Shirt',
        description: 'A step up from t-shirts while maintaining comfort',
        imageUrl: 'https://placehold.co/300x400?text=Polo+Shirt',
        category: 'clothing',
        mustHave: true,
        tags: ['smart-casual', 'breathable', 'versatile']
      },
      {
        id: 10,
        name: 'Lightweight Loafers',
        description: 'Slip-on shoes that add sophistication to casual outfits',
        imageUrl: 'https://placehold.co/300x400?text=Loafers',
        category: 'footwear',
        mustHave: false,
        tags: ['smart-casual', 'comfortable', 'versatile']
      },
      {
        id: 11,
        name: 'Quality Sunglasses',
        description: 'Protective eyewear that complements your face shape',
        imageUrl: 'https://placehold.co/300x400?text=Sunglasses',
        category: 'accessory',
        mustHave: true,
        tags: ['protection', 'style-enhancing', 'essential']
      },
      {
        id: 12,
        name: 'Lightweight Unstructured Blazer',
        description: 'For evening events or air-conditioned environments',
        imageUrl: 'https://placehold.co/300x400?text=Summer+Blazer',
        category: 'clothing',
        mustHave: false,
        tags: ['smart', 'air-conditioning', 'evening-appropriate']
      }
    ],
    tips: [
      'Choose natural fabrics that breathe (cotton, linen, lightweight merino)',
      'Opt for lighter colors that reflect rather than absorb heat',
      'Consider the indoor-outdoor temperature difference with portable layers',
      'Invest in quality sunglasses that offer proper UV protection',
      'Keep a lightweight layer handy for heavily air-conditioned spaces'
    ],
    layeringGuide: {
      base: ['Breathable t-shirt, polo, or linen shirt', 'Lightweight shorts or breathable pants'],
      outer: ['Ultralight cardigan or shirt jacket for air conditioning'],
      accessories: ['Sunglasses', 'Light hat for sun protection']
    },
    colorPalette: ['#FFFFFF', '#F9D56E', '#A8DADC', '#F5F5F5', '#D3D3D3'],
    fabricRecommendations: [
      'Linen - extremely breathable (embrace the wrinkles as part of the look)',
      'Lightweight cotton - breathable and versatile',
      'Seersucker - the texture allows for airflow',
      'Performance fabrics - for active situations with moisture-wicking properties'
    ],
    weatherChallenges: [
      {
        challenge: 'Excessive heat',
        solution: 'Opt for loose fits and natural fibers that allow airflow'
      },
      {
        challenge: 'Strong sun',
        solution: 'Incorporate a breathable hat and quality sunglasses into your outfit'
      },
      {
        challenge: 'Extreme air conditioning',
        solution: 'Keep a lightweight layer in your bag for indoor environments'
      }
    ]
  },
  {
    id: 'fall',
    name: 'Fall',
    icon: <Wind className="h-5 w-5" />,
    color: '#D27D2D',
    essentials: [
      {
        id: 13,
        name: 'Flannel Shirt',
        description: 'Warm, versatile shirt that can be layered or worn alone',
        imageUrl: 'https://placehold.co/300x400?text=Flannel+Shirt',
        category: 'clothing',
        mustHave: true,
        tags: ['layering', 'warm', 'versatile']
      },
      {
        id: 14,
        name: 'Lightweight Sweater',
        description: 'Perfect middle layer for cooler temperatures',
        imageUrl: 'https://placehold.co/300x400?text=Fall+Sweater',
        category: 'clothing',
        mustHave: true,
        tags: ['layering', 'versatile', 'smart-casual']
      },
      {
        id: 15,
        name: 'Chukka Boots',
        description: 'Versatile boots that work with most fall outfits',
        imageUrl: 'https://placehold.co/300x400?text=Chukka+Boots',
        category: 'footwear',
        mustHave: true,
        tags: ['versatile', 'weather-appropriate', 'smart-casual']
      },
      {
        id: 16,
        name: 'Weather-Resistant Jacket',
        description: 'Protection from fall rain and wind while maintaining style',
        imageUrl: 'https://placehold.co/300x400?text=Fall+Jacket',
        category: 'clothing',
        mustHave: true,
        tags: ['weather-protection', 'versatile', 'layering']
      },
      {
        id: 17,
        name: 'Dark Wash Jeans',
        description: 'Versatile pants that offer more warmth than summer options',
        imageUrl: 'https://placehold.co/300x400?text=Dark+Jeans',
        category: 'clothing',
        mustHave: true,
        tags: ['versatile', 'durable', 'smart-casual']
      },
      {
        id: 18,
        name: 'Lightweight Scarf',
        description: 'Functional accessory that adds style and warmth',
        imageUrl: 'https://placehold.co/300x400?text=Fall+Scarf',
        category: 'accessory',
        mustHave: false,
        tags: ['layering', 'style-enhancing', 'warmth']
      }
    ],
    tips: [
      'Master layering for fluctuating temperatures throughout the day',
      'Incorporate warm, rich colors that reflect the changing landscape',
      'Invest in versatile outerwear that handles both rain and cool temperatures',
      'Transition to heavier fabrics that provide more warmth',
      'Consider texture in your outfit choices to add visual interest'
    ],
    layeringGuide: {
      base: ['Cotton t-shirt or light henley', 'Button-down shirt'],
      mid: ['Flannel shirt or lightweight sweater', 'Cardigan or vest for additional warmth'],
      outer: ['Weather-resistant jacket or field coat', 'Lightweight down jacket for colder days'],
      accessories: ['Lightweight scarf', 'Beanie for cooler mornings']
    },
    colorPalette: ['#D27D2D', '#8C6954', '#0F2C5F', '#36454F', '#D3D3D3'],
    fabricRecommendations: [
      'Medium-weight cotton - versatile for fluctuating temperatures',
      'Flannel - warm and soft for cooler days',
      'Light wool - excellent temperature regulation',
      'Corduroy - adds texture and moderate warmth'
    ],
    weatherChallenges: [
      {
        challenge: 'Unexpected temperature drops',
        solution: 'Layer strategically so you can adjust throughout the day'
      },
      {
        challenge: 'Rain and wind',
        solution: 'Invest in a quality weather-resistant jacket with proper ventilation'
      },
      {
        challenge: 'Morning fog and dew',
        solution: 'Water-resistant footwear with good traction'
      }
    ]
  },
  {
    id: 'winter',
    name: 'Winter',
    icon: <Snowflake className="h-5 w-5" />,
    color: '#A8C8F9',
    essentials: [
      {
        id: 19,
        name: 'Quality Wool Overcoat',
        description: 'A smart, warm outer layer for formal and smart-casual situations',
        imageUrl: 'https://placehold.co/300x400?text=Wool+Overcoat',
        category: 'clothing',
        mustHave: true,
        tags: ['smart', 'warm', 'versatile']
      },
      {
        id: 20,
        name: 'Heavy Knit Sweater',
        description: 'Substantial middle layer for serious warmth',
        imageUrl: 'https://placehold.co/300x400?text=Knit+Sweater',
        category: 'clothing',
        mustHave: true,
        tags: ['warm', 'layering', 'comfortable']
      },
      {
        id: 21,
        name: 'Insulated Boots',
        description: 'Footwear that handles cold, wet conditions while maintaining style',
        imageUrl: 'https://placehold.co/300x400?text=Winter+Boots',
        category: 'footwear',
        mustHave: true,
        tags: ['weather-protection', 'warm', 'practical']
      },
      {
        id: 22,
        name: 'Wool Scarf',
        description: 'Essential accessory for neck protection and added warmth',
        imageUrl: 'https://placehold.co/300x400?text=Wool+Scarf',
        category: 'accessory',
        mustHave: true,
        tags: ['warm', 'style-enhancing', 'practical']
      },
      {
        id: 23,
        name: 'Leather Gloves',
        description: 'Hand protection that maintains dexterity and style',
        imageUrl: 'https://placehold.co/300x400?text=Leather+Gloves',
        category: 'accessory',
        mustHave: true,
        tags: ['warm', 'practical', 'style-enhancing']
      },
      {
        id: 24,
        name: 'Thermal Base Layers',
        description: 'Invisible foundation for warmth without bulk',
        imageUrl: 'https://placehold.co/300x400?text=Base+Layers',
        category: 'clothing',
        mustHave: false,
        tags: ['warm', 'practical', 'layering']
      }
    ],
    tips: [
      'Focus on effective layering for maximum warmth without bulk',
      'Invest in quality winter accessories (scarf, gloves, hat) for both style and function',
      'Choose footwear that can handle winter conditions while complementing your outfits',
      'Don\'t compromise style for function - well-designed winter wear can offer both',
      'Consider indoor heating when choosing layers - easy removal options are important'
    ],
    layeringGuide: {
      base: ['Thermal or merino base layer', 'Button-down shirt'],
      mid: ['Heavy sweater or light down vest', 'Flannel shirt for casual looks'],
      outer: ['Wool overcoat for smart looks', 'Insulated parka for casual and extreme cold'],
      accessories: ['Wool scarf', 'Insulated hat', 'Leather or insulated gloves']
    },
    colorPalette: ['#0F2C5F', '#36454F', '#A8C8F9', '#D3D3D3', '#FFFFFF'],
    fabricRecommendations: [
      'Wool - excellent insulation even when damp',
      'Down - highest warmth-to-weight ratio for extreme cold',
      'Merino - moisture-wicking and temperature regulating',
      'Cashmere - lightweight luxury with excellent warmth'
    ],
    weatherChallenges: [
      {
        challenge: 'Extreme cold',
        solution: 'Strategic layering with proper base layers and insulated outerwear'
      },
      {
        challenge: 'Snow and slush',
        solution: 'Waterproof, insulated footwear with good traction'
      },
      {
        challenge: 'Indoor overheating',
        solution: 'Create a layering system that allows for easy adjustment in heated environments'
      }
    ]
  },
  {
    id: 'transitional',
    name: 'Between Seasons',
    icon: <SunSnow className="h-5 w-5" />,
    color: '#7F7F7F',
    essentials: [
      {
        id: 25,
        name: 'Versatile Layering Pieces',
        description: 'Items that can be combined for different temperature needs',
        imageUrl: 'https://placehold.co/300x400?text=Layering+Pieces',
        category: 'clothing',
        mustHave: true,
        tags: ['versatile', 'layering', 'adaptable']
      },
      {
        id: 26,
        name: 'All-Weather Jacket',
        description: 'Adaptable outerwear for unpredictable conditions',
        imageUrl: 'https://placehold.co/300x400?text=All+Weather+Jacket',
        category: 'clothing',
        mustHave: true,
        tags: ['weather-protection', 'versatile', 'practical']
      },
      {
        id: 27,
        name: 'Closed-Toe Shoes with Versatile Weight',
        description: 'Footwear suitable for variable temperatures',
        imageUrl: 'https://placehold.co/300x400?text=Versatile+Shoes',
        category: 'footwear',
        mustHave: true,
        tags: ['versatile', 'practical', 'smart-casual']
      },
      {
        id: 28,
        name: 'Medium-Weight Button-Down Shirts',
        description: 'Can be worn alone or layered as needed',
        imageUrl: 'https://placehold.co/300x400?text=Medium+Shirts',
        category: 'clothing',
        mustHave: true,
        tags: ['versatile', 'layering', 'adaptable']
      }
    ],
    tips: [
      'Build a capsule wardrobe of pieces that easily mix and match',
      'Focus on items that can be worn during multiple seasons',
      'Keep a lightweight emergency layer in your car or bag',
      'Choose neutral colors that work year-round',
      'Invest in quality transitional pieces that will see frequent use'
    ],
    colorPalette: ['#0F2C5F', '#D3D3D3', '#5C3A21', '#8CC084', '#F5F5F5'],
    fabricRecommendations: [
      'Medium-weight cotton - versatile for layering or wearing alone',
      'Light merino wool - natural temperature regulation',
      'Performance blends - moisture-wicking properties for unpredictable weather',
      'Twill - durable and appropriate across seasons'
    ],
    weatherChallenges: [
      {
        challenge: 'Unpredictable temperature swings',
        solution: 'Dress in easily removable layers to adapt throughout the day'
      },
      {
        challenge: 'Mixed precipitation',
        solution: 'Choose a jacket that handles both rain and light cold'
      },
      {
        challenge: 'Morning chill, afternoon warmth',
        solution: 'Plan your outfit with removable outer and mid layers'
      }
    ]
  }
];

const SeasonalStyleGuide: React.FC = () => {
  const [activeSeason, setActiveSeason] = useState('spring');
  const [activeCategory, setActiveCategory] = useState<'all' | 'clothing' | 'footwear' | 'accessory'>('all');
  
  const currentSeason = seasons.find(season => season.id === activeSeason);
  
  if (!currentSeason) return null;
  
  const filteredEssentials = activeCategory === 'all' 
    ? currentSeason.essentials 
    : currentSeason.essentials.filter(item => item.category === activeCategory);
  
  const seasonIconStyle = {
    backgroundColor: `${currentSeason.color}20`,
    color: currentSeason.color
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Seasonal Style Guide</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Master the art of dressing well for every season with our comprehensive guides
        </p>
      </div>
      
      <Tabs defaultValue="spring" value={activeSeason} onValueChange={setActiveSeason} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          {seasons.map((season) => (
            <TabsTrigger key={season.id} value={season.id} className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="mb-1" style={{ color: season.id === activeSeason ? season.color : undefined }}>
                  {season.icon}
                </div>
                <span className="text-xs">{season.name}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full mr-4" style={seasonIconStyle}>
                {currentSeason.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: currentSeason.color }}>
                  {currentSeason.name} Essentials
                </h3>
                <p className="text-muted-foreground">
                  Key pieces for navigating this season in style
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex space-x-2 mb-6">
                <Button 
                  variant={activeCategory === 'all' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setActiveCategory('all')}
                >
                  All Items
                </Button>
                <Button 
                  variant={activeCategory === 'clothing' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setActiveCategory('clothing')}
                >
                  Clothing
                </Button>
                <Button 
                  variant={activeCategory === 'footwear' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setActiveCategory('footwear')}
                >
                  Footwear
                </Button>
                <Button 
                  variant={activeCategory === 'accessory' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setActiveCategory('accessory')}
                >
                  Accessories
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEssentials.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                      {item.mustHave && (
                        <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 rounded-bl-lg text-xs font-medium">
                          Must Have
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold">{item.name}</h4>
                        {item.mustHave && (
                          <CircleCheck className="text-primary w-5 h-5" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Color Palette Section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="p-1 rounded-full mr-2" style={seasonIconStyle}>
                    {currentSeason.icon}
                  </div>
                  {currentSeason.name} Color Palette
                </CardTitle>
                <CardDescription>
                  Seasonal colors that work well together and reflect the mood of {currentSeason.name.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-4">
                  {currentSeason.colorPalette.map((color, idx) => (
                    <div key={idx} className="text-center">
                      <div 
                        className="w-16 h-16 rounded-full border border-gray-200 mb-2" 
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-xs text-muted-foreground">{color}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Pro Tip:</strong> When building outfits, select one dominant color, one secondary color, 
                    and use a third as an accent for visual interest.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Fabric Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Fabrics</CardTitle>
                <CardDescription>
                  Optimal materials for comfort and style during {currentSeason.name.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {currentSeason.fabricRecommendations.map((fabric, idx) => (
                    <li key={idx} className="flex items-start">
                      <CircleCheck className="text-primary w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{fabric}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div>
            {/* Styling Tips */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="p-1 rounded-full mr-2" style={seasonIconStyle}>
                    {currentSeason.icon}
                  </div>
                  {currentSeason.name} Style Tips
                </CardTitle>
                <CardDescription>
                  Expert advice for mastering the season's challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {currentSeason.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start">
                      <CircleCheck className="text-primary w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Layering Guide */}
            {currentSeason.layeringGuide && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Layering Guide</CardTitle>
                  <CardDescription>
                    How to build adaptable outfits for {currentSeason.name.toLowerCase()}'s temperature changes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {currentSeason.layeringGuide.base && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Base Layer</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {currentSeason.layeringGuide.base.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {currentSeason.layeringGuide.mid && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Mid Layer</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {currentSeason.layeringGuide.mid.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {currentSeason.layeringGuide.outer && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Outer Layer</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {currentSeason.layeringGuide.outer.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {currentSeason.layeringGuide.accessories && (
                    <div>
                      <h4 className="font-medium mb-2">Accessories</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {currentSeason.layeringGuide.accessories.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* Weather Challenges */}
            {currentSeason.weatherChallenges && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Umbrella className="w-5 h-5 mr-2" />
                    Weather Challenges
                  </CardTitle>
                  <CardDescription>
                    Solutions for {currentSeason.name.toLowerCase()}'s most common weather issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentSeason.weatherChallenges.map((challenge, idx) => (
                      <div key={idx} className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                          <ThermometerSun className="w-4 h-4 mr-2" />
                          {challenge.challenge}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          <strong>Solution:</strong> {challenge.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/10 flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Always check your local forecast
                  </span>
                  <Button variant="ghost" size="sm" className="text-primary flex items-center p-0">
                    Outfit Ideas <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SeasonalStyleGuide;