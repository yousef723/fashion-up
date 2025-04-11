import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Wardrobe from "@/pages/Wardrobe";
import Outfit from "@/pages/Outfit";
import StyleGuide from "@/pages/StyleGuide";
import PhotoAnalysisPage from "@/pages/PhotoAnalysisPage";
import StyleRecommendationsPage from "@/pages/StyleRecommendationsPage";
import OccasionOutfitsPage from "@/pages/OccasionOutfitsPage";
import SeasonalStyleGuidePage from "@/pages/SeasonalStyleGuidePage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNavigation from "@/components/MobileNavigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/wardrobe" component={Wardrobe} />
      <Route path="/outfit/:id" component={Outfit} />
      <Route path="/style-guide/:id" component={StyleGuide} />
      <Route path="/photo-analysis" component={PhotoAnalysisPage} />
      <Route path="/style-recommendations" component={StyleRecommendationsPage} />
      <Route path="/occasion-outfits" component={OccasionOutfitsPage} />
      <Route path="/seasonal-style-guide" component={SeasonalStyleGuidePage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20 pb-20 md:pb-6">
          <Router />
        </main>
        <MobileNavigation />
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
