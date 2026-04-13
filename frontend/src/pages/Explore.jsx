import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Explore = () => {
  const [stores, setStores] = useState([]);
  const categories = ["Fashion", "Dining", "Tech", "Technology", "Entertainment"];

  // A function to give each store a unique vibrant gradient based on its name
  const getBrandGradient = (name) => {
    const gradients = [
      'from-pink-500 to-orange-400',
      'from-blue-600 to-cyan-400',
      'from-purple-600 to-indigo-400',
      'from-emerald-500 to-teal-400',
      'from-rose-500 to-pink-400',
      'from-amber-500 to-yellow-400'
    ];
    const index = name.length % gradients.length;
    return gradients[index];
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/stores');
        setStores(res.data);
      } catch (err) { console.error(err); }
    };
    fetchStores();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* HERO */}
      <section className="bg-white border-b border-gray-100 py-16 px-8 text-center">
        <Link to="/" className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition mb-4 inline-block">
          ← Back to Mall
        </Link>
        <h1 className="text-6xl font-black text-gray-900 tracking-tighter mb-2">DIRECTORY</h1>
        <p className="text-gray-500 font-medium">Find your favorite brands and boutiques.</p>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-16 space-y-24">
        {categories.map(cat => {
          const categoryStores = stores.filter(s => s.category === cat);
          if (categoryStores.length === 0) return null;

          return (
            <div key={cat}>
              <h2 className="text-sm font-black text-gray-300 uppercase tracking-[0.3em] mb-10 text-center">
                {cat}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {categoryStores.map(store => (
                  <div key={store._id} className="group relative">
                    {/* Visual Brand Box */}
                    <div className="aspect-[16/9] mb-6 rounded-3xl bg-white border border-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 flex flex-col items-center justify-center overflow-hidden">
                      
                      {/* COLORFUL BRAND NAME */}
                      <span className={`text-4xl md:text-5xl font-black italic tracking-tighter bg-gradient-to-br ${getBrandGradient(store.storeName)} bg-clip-text text-transparent transform transition-transform duration-500 group-hover:scale-110`}>
                        {store.storeName}
                      </span>
                      
                      {/* SHOP NUMBER FLOATING TAG */}
                      <span className="mt-4 text-[10px] font-bold text-gray-400 tracking-widest border border-gray-200 px-3 py-1 rounded-full">
                        LEVEL {store.shopNumber}
                      </span>

                      {/* HOVER OVERLAY: DESCRIPTION */}
                      <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-8 rounded-3xl">
                        <div className="text-center">
                          <p className="text-gray-600 font-medium text-sm leading-relaxed mb-4">
                            {store.description || "Discover premium quality and exceptional style at our mall location."}
                          </p>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Managed by {store.ownerName || "Retail Partners"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Explore;