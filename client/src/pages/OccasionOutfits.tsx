import React from 'react';
import OccasionOutfits from '../components/OccasionOutfits';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OccasionOutfitsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-8">
          <OccasionOutfits />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OccasionOutfitsPage;