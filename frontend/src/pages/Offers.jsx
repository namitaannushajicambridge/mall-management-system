import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/offers');
        setOffers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-pink-600/10 rounded-[100%] blur-[100px] rotate-45 pointer-events-none"></div>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-8 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Live Promotions</span>
        </div>
        
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
          EXCLUSIVE <br/> DEALS
        </h1>
        <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
          Discover limited-time offers and premium experiences curated just for you.
        </p>
      </section>

      {/* OFFERS GRID */}
      <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-32 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl">
            <h3 className="text-3xl font-black text-gray-400 tracking-tight mb-4">No Active Offers</h3>
            <p className="text-gray-500">Check back later for exclusive deals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, i) => (
              <div 
                key={offer._id || i}
                className="group relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)]"
              >
                {/* Visual Flair Top */}
                <div className="h-32 bg-gradient-to-br from-white/10 to-transparent p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {offer.offerType || "General"}
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                      Valid until {new Date(offer.validUntil).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black italic tracking-tighter text-white truncate">
                    {offer.storeName}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-8 pt-4">
                  <div className="mb-6">
                    <h4 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-2">
                      {offer.discount}
                    </h4>
                    <p className="text-xl font-bold text-gray-200">
                      {offer.title}
                    </p>
                  </div>
                  
                  <p className="text-sm text-gray-400 leading-relaxed font-medium">
                    {offer.description}
                  </p>
                </div>

                {/* Interactive Element */}
                <div className="p-6 pt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  <Link 
                    to="/explore" 
                    className="block w-full py-3 text-center bg-white text-black font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Find Store
                  </Link>
                </div>

                {/* Glare Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rotate-12 scale-150 translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
