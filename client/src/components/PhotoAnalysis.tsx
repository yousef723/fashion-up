import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Upload, Camera, Loader2, ImageIcon, History, ChevronRight, AlertCircle } from 'lucide-react';
import { queryClient } from '../lib/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { StyleAnalysis } from '@shared/schema';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export const PhotoAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [mainTab, setMainTab] = useState<string>('new-analysis');
  const [analysisResult, setAnalysisResult] = useState<StyleAnalysis | null>(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<StyleAnalysis | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Fetch analysis history
  const { data: analysisHistory = [], isLoading: isHistoryLoading } = useQuery({
    queryKey: ['/api/style-analysis'],
    queryFn: async () => {
      const response = await fetch('/api/style-analysis');
      if (!response.ok) {
        throw new Error('Failed to fetch analysis history');
      }
      return await response.json() as StyleAnalysis[];
    }
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: async (imageData: string) => {
      const response = await fetch('/api/style-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData }),
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to analyze photo');
      }
      
      return await response.json() as StyleAnalysis;
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      queryClient.invalidateQueries({ queryKey: ['/api/style-analysis'] });
      toast({
        title: 'Analysis complete!',
        description: 'Your personalized style recommendations are ready.',
        variant: 'default',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Analysis failed',
        description: error.message || 'Failed to analyze photo. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // Trigger the file input programmatically
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Simulate upload progress
  useEffect(() => {
    if (uploadPhotoMutation.isPending) {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);
      
      return () => clearInterval(interval);
    } else if (!uploadPhotoMutation.isPending && uploadProgress > 0) {
      setUploadProgress(100);
      const timeout = setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [uploadPhotoMutation.isPending, uploadProgress]);

  const handleAnalyzePhoto = () => {
    if (selectedImage) {
      uploadPhotoMutation.mutate(selectedImage);
    } else {
      toast({
        title: 'No image selected',
        description: 'Please upload or capture a photo first.',
        variant: 'destructive',
      });
    }
  };
  
  const handleHistoryItemClick = (item: StyleAnalysis) => {
    setSelectedHistoryItem(item);
    setMainTab('history-detail');
  };

  const renderAnalysisResult = (analysis: StyleAnalysis) => {
    return (
      <div className="mt-6 space-y-6">
        <h3 className="text-xl font-semibold text-center">Your Personalized Style Analysis</h3>
        
        {/* Analysis date if viewing from history */}
        {mainTab === 'history-detail' && (
          <div className="text-center text-muted-foreground mb-4">
            <p>Analyzed on {format(new Date(analysis.createdAt), 'MMMM d, yyyy')}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <span className="text-primary font-semibold">1</span>
                </div>
                Body Type & Skin Tone
              </CardTitle>
              <CardDescription>Your physical attributes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <h4 className="font-medium">Body Type:</h4>
                  <p>{analysis.bodyType}</p>
                </div>
                <div>
                  <h4 className="font-medium">Skin Tone:</h4>
                  <p>{analysis.skinTone}</p>
                </div>
                {analysis.currentStyle && (
                  <div>
                    <h4 className="font-medium">Current Style:</h4>
                    <p>{analysis.currentStyle}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <span className="text-primary font-semibold">2</span>
                </div>
                Style Recommendations
              </CardTitle>
              <CardDescription>Styles that would suit you</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.recommendedStyles.map((style, index) => (
                  <li key={index}>{style}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <span className="text-primary font-semibold">3</span>
                </div>
                Color Recommendations
              </CardTitle>
              <CardDescription>Colors that complement your features</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.colorRecommendations.map((color, index) => (
                  <li key={index}>{color}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <span className="text-primary font-semibold">4</span>
                </div>
                Improvement Tips
              </CardTitle>
              <CardDescription>Style enhancements to consider</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.improvementTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                <span className="text-primary font-semibold">5</span>
              </div>
              Outfit Suggestions
            </CardTitle>
            <CardDescription>Complete looks for different occasions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-3">
              {analysis.outfitSuggestions.map((outfit, index) => (
                <li key={index}>{outfit}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  const renderHistoryList = () => {
    if (isHistoryLoading) {
      return (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Loading analysis history...</p>
        </div>
      );
    }
    
    if (analysisHistory.length === 0) {
      return (
        <div className="text-center py-8">
          <AlertCircle className="w-8 h-8 mx-auto text-muted-foreground" />
          <h3 className="mt-2 font-medium">No analysis history found</h3>
          <p className="text-muted-foreground">Upload a photo to get style recommendations</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {analysisHistory
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((item) => (
          <Card key={item.id} className="cursor-pointer hover:bg-accent/5 transition-colors" onClick={() => handleHistoryItemClick(item)}>
            <CardContent className="p-4 flex items-center">
              <div className="w-16 h-16 mr-4 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={item.imageUrl} 
                  alt="Analysis" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">Style Analysis #{item.id}</h3>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(item.createdAt), 'MMMM d, yyyy')}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.recommendedStyles.slice(0, 2).map((style, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {style.split(' ')[0]}
                    </Badge>
                  ))}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
      <h2 className="text-3xl font-bold text-center mb-8">AI Style Analysis</h2>
      
      {/* Main tabs - New Analysis vs History */}
      <Tabs value={mainTab} onValueChange={setMainTab} className="w-full mb-6">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
          <TabsTrigger value="new-analysis" className="flex items-center justify-center">
            <Camera className="w-4 h-4 mr-2" /> New Analysis
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center justify-center">
            <History className="w-4 h-4 mr-2" /> Analysis History
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* New Analysis Tab Content */}
      <TabsContent value="new-analysis" className="mt-0 space-y-6">
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="upload">Upload Photo</TabsTrigger>
                <TabsTrigger value="capture">Take Photo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-0">
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg mb-6">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden" 
                    ref={fileInputRef}
                  />
                  {selectedImage ? (
                    <div className="w-full">
                      <img 
                        src={selectedImage} 
                        alt="Uploaded" 
                        className="max-h-[300px] mx-auto rounded-md object-contain mb-4" 
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" /> Choose Different Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="mb-4 p-4 bg-muted rounded-full inline-flex items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">Upload a photo of yourself</h3>
                      <p className="text-muted-foreground text-sm mb-4">For best results, use a full-body photo with clear lighting</p>
                      <Button onClick={() => fileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" /> Select Photo
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="capture" className="mt-0">
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg mb-6">
                  {selectedImage ? (
                    <div className="w-full">
                      <img 
                        src={selectedImage} 
                        alt="Captured" 
                        className="max-h-[300px] mx-auto rounded-md object-contain mb-4" 
                      />
                      <Button 
                        variant="outline" 
                        onClick={handleCameraCapture}
                        className="w-full"
                      >
                        <Camera className="mr-2 h-4 w-4" /> Take Another Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="mb-4 p-4 bg-muted rounded-full inline-flex items-center justify-center">
                        <Camera className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">Take a photo of yourself</h3>
                      <p className="text-muted-foreground text-sm mb-4">Ensure you're in a well-lit area for the best analysis</p>
                      <Button onClick={handleCameraCapture}>
                        <Camera className="mr-2 h-4 w-4" /> Capture Photo
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            {uploadProgress > 0 && (
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2 text-center">
                  {uploadProgress < 100 ? 'Analyzing your photo...' : 'Analysis complete!'}
                </p>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div 
                    className="h-full bg-primary transition-all" 
                    style={{ width: `${uploadProgress}%` }} 
                  />
                </div>
              </div>
            )}
            
            <Separator className="my-6" />
            
            <div className="flex justify-center">
              <Button 
                size="lg" 
                onClick={handleAnalyzePhoto}
                disabled={!selectedImage || uploadPhotoMutation.isPending}
                className="px-8"
              >
                {uploadPhotoMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                  </>
                ) : (
                  'Analyze My Style'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {analysisResult && renderAnalysisResult(analysisResult)}
      </TabsContent>
      
      {/* History Tab Content */}
      <TabsContent value="history" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Previous Style Analyses</CardTitle>
            <CardDescription>
              View your past style analyses and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderHistoryList()}
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* History Detail Tab Content */}
      <TabsContent value="history-detail" className="mt-0">
        {selectedHistoryItem && (
          <>
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    className="p-2 mr-2" 
                    onClick={() => setMainTab('history')}
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </Button>
                  <div>
                    <h3 className="font-medium">Style Analysis #{selectedHistoryItem.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(selectedHistoryItem.createdAt), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="w-full md:w-1/3">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Photo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img 
                      src={selectedHistoryItem.imageUrl} 
                      alt="Analyzed" 
                      className="w-full rounded-md object-cover max-h-[300px] object-top" 
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="w-full md:w-2/3">
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Body Type</h4>
                        <p>{selectedHistoryItem.bodyType}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Skin Tone</h4>
                        <p>{selectedHistoryItem.skinTone}</p>
                      </div>
                      {selectedHistoryItem.currentStyle && (
                        <div>
                          <h4 className="font-medium mb-1">Current Style</h4>
                          <p>{selectedHistoryItem.currentStyle}</p>
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium mb-1">Recommended Styles</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedHistoryItem.recommendedStyles.slice(0, 3).map((style, index) => (
                            <Badge key={index} variant="outline">
                              {style.split(' ')[0]}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {renderAnalysisResult(selectedHistoryItem)}
          </>
        )}
      </TabsContent>
    </div>
  );
};

export default PhotoAnalysis;