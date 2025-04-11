import React from 'react';
import SeasonalStyleGuide from '../components/SeasonalStyleGuide';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SeasonalStyleGuidePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-8">
          <SeasonalStyleGuide />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeasonalStyleGuidePage;