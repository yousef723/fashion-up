import React from 'react';
import StyleRecommendations from '../components/StyleRecommendations';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StyleRecommendationsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-8">
          <StyleRecommendations />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StyleRecommendationsPage;