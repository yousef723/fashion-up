import React from 'react';
import PhotoAnalysisSimple from '../components/PhotoAnalysisSimple';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PhotoAnalysisPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-8">
          <PhotoAnalysisSimple />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PhotoAnalysisPage;