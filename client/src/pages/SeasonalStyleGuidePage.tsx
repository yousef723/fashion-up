import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Snowflake, Cloud, Wind, CircleCheck } from "lucide-react";

export default function SeasonalStyleGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Seasonal Style Guide</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Master the art of dressing well for every season with our comprehensive guides
        </p>
      </div>
      
      <Tabs defaultValue="spring" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="spring" className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="mb-1 text-green-400">
                <Cloud className="h-5 w-5" />
              </div>
              <span className="text-xs">Spring</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="summer" className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="mb-1 text-yellow-400">
                <Sun className="h-5 w-5" />
              </div>
              <span className="text-xs">Summer</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="fall" className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="mb-1 text-orange-500">
                <Wind className="h-5 w-5" />
              </div>
              <span className="text-xs">Fall</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="winter" className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="mb-1 text-blue-300">
                <Snowflake className="h-5 w-5" />
              </div>
              <span className="text-xs">Winter</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="spring">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full mr-4 bg-green-100 text-green-400">
                  <Cloud className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-400">
                    Spring Essentials
                  </h3>
                  <p className="text-muted-foreground">
                    Key pieces for navigating this season in style
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <img 
                      src="https://placehold.co/300x400?text=Trench+Coat" 
                      alt="Trench Coat" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 rounded-bl-lg text-xs font-medium">
                      Must Have
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold">Light Trench Coat</h4>
                      <CircleCheck className="text-primary w-5 h-5" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Classic outerwear that provides protection from spring showers
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge variant="outline" className="text-xs">versatile</Badge>
                      <Badge variant="outline" className="text-xs">weather-protection</Badge>
                      <Badge variant="outline" className="text-xs">classic</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <img 
                      src="https://placehold.co/300x400?text=Light+Sweater" 
                      alt="Light Sweater" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold">Light Cotton Sweater</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Perfect for layering on cooler spring days
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge variant="outline" className="text-xs">layering</Badge>
                      <Badge variant="outline" className="text-xs">versatile</Badge>
                      <Badge variant="outline" className="text-xs">breathable</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="p-1 rounded-full mr-2 bg-green-100 text-green-400">
                      <Cloud className="h-5 w-5" />
                    </div>
                    Spring Color Palette
                  </CardTitle>
                  <CardDescription>
                    Seasonal colors that work well together and reflect the mood of spring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4 mb-4">
                    <div className="text-center">
                      <div 
                        className="w-16 h-16 rounded-full border border-gray-200 mb-2" 
                        style={{ backgroundColor: '#8CC084' }}
                      ></div>
                      <span className="text-xs text-muted-foreground">#8CC084</span>
                    </div>
                    <div className="text-center">
                      <div 
                        className="w-16 h-16 rounded-full border border-gray-200 mb-2" 
                        style={{ backgroundColor: '#A8C8F9' }}
                      ></div>
                      <span className="text-xs text-muted-foreground">#A8C8F9</span>
                    </div>
                    <div className="text-center">
                      <div 
                        className="w-16 h-16 rounded-full border border-gray-200 mb-2" 
                        style={{ backgroundColor: '#F5F5F5' }}
                      ></div>
                      <span className="text-xs text-muted-foreground">#F5F5F5</span>
                    </div>
                    <div className="text-center">
                      <div 
                        className="w-16 h-16 rounded-full border border-gray-200 mb-2" 
                        style={{ backgroundColor: '#D3D3D3' }}
                      ></div>
                      <span className="text-xs text-muted-foreground">#D3D3D3</span>
                    </div>
                    <div className="text-center">
                      <div 
                        className="w-16 h-16 rounded-full border border-gray-200 mb-2" 
                        style={{ backgroundColor: '#FFC0CB' }}
                      ></div>
                      <span className="text-xs text-muted-foreground">#FFC0CB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="p-1 rounded-full mr-2 bg-green-100 text-green-400">
                      <Cloud className="h-5 w-5" />
                    </div>
                    Spring Style Tips
                  </CardTitle>
                  <CardDescription>
                    Expert advice for mastering the season's challenges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CircleCheck className="text-primary w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Layer strategically for temperature changes throughout the day</span>
                    </li>
                    <li className="flex items-start">
                      <CircleCheck className="text-primary w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Incorporate lighter colors to reflect the season&apos;s freshness</span>
                    </li>
                    <li className="flex items-start">
                      <CircleCheck className="text-primary w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Choose breathable fabrics that can handle unexpected warmth</span>
                    </li>
                    <li className="flex items-start">
                      <CircleCheck className="text-primary w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Opt for versatile pieces that work in both sunny and rainy conditions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Fabrics</CardTitle>
                  <CardDescription>
                    Optimal materials for comfort and style during spring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CircleCheck className="text-primary w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Cotton - breathable and versatile</span>
                    </li>
                    <li className="flex items-start">
                      <CircleCheck className="text-primary w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Light wool - for cooler days and evenings</span>
                    </li>
                    <li className="flex items-start">
                      <CircleCheck className="text-primary w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Cotton-linen blends - breathable with less wrinkling than pure linen</span>
                    </li>
                    <li className="flex items-start">
                      <CircleCheck className="text-primary w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Lightweight denim - versatile for changing conditions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="summer">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full mr-4 bg-yellow-100 text-yellow-400">
                  <Sun className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400">
                    Summer Essentials
                  </h3>
                  <p className="text-muted-foreground">
                    Key pieces for navigating this season in style
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-lg text-center my-10">
                  Select a season tab to see more seasonal style guides
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="fall">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full mr-4 bg-orange-100 text-orange-500">
                  <Wind className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-orange-500">
                    Fall Essentials
                  </h3>
                  <p className="text-muted-foreground">
                    Key pieces for navigating this season in style
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-lg text-center my-10">
                  Select a season tab to see more seasonal style guides
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="winter">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full mr-4 bg-blue-100 text-blue-300">
                  <Snowflake className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-300">
                    Winter Essentials
                  </h3>
                  <p className="text-muted-foreground">
                    Key pieces for navigating this season in style
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-lg text-center my-10">
                  Select a season tab to see more seasonal style guides
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}