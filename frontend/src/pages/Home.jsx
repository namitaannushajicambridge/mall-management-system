import React from 'react';
import { Link } from 'react-router-dom';
import mallBanner from '../assets/mall.jpg';

const Home = () => {
  
  return (
    <div className="bg-white">
      {/* HERO BANNER SECTION */}
      <div className="relative h-[65vh] md:h-[85vh] w-full overflow-hidden bg-gray-900">
        <img 
          src={mallBanner} 
          alt="MallPro Interior" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80";
          }}
        />
        
        {/* Dark Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter">
              MALL<span className="text-blue-500">PRO</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-100 font-medium mb-10 max-w-2xl mx-auto">
              Experience the future of retail in the heart of the city. Luxury, Dining, and Tech under one roof.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
            {/* 2. Wrap the button in a Link component */}
            <Link to="/explore">
              <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl active:scale-95">
                Explore Stores
              </button>
            </Link>
            
          </div>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">
              About Our Space
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              MallPro is designed to be more than just a marketplace. With open-air atriums, 
              interactive digital displays, and over 300 curated brands, we provide a 
              premium environment for the modern shopper.
            </p>
            <div className="flex gap-10">
              <div>
                <p className="text-3xl font-black text-blue-600">300+</p>
                <p className="text-gray-500 font-bold text-sm">BRANDS</p>
              </div>
              <div>
                <p className="text-3xl font-black text-blue-600">50+</p>
                <p className="text-gray-500 font-bold text-sm">DINING</p>
              </div>
              <div>
                <p className="text-3xl font-black text-blue-600">1M+</p>
                <p className="text-gray-500 font-bold text-sm">SQ. FT.</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src = {mallBanner}
              alt="Fashion at MallPro"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;