import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import StoreManagement from './pages/StoreManagement';
import Events from './pages/Events';
import ExploreStores from './pages/Explore'; 

// 4. ADD OFFERS IMPORT
import Offers from './pages/Offers';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link to="/" className="text-2xl font-black tracking-tighter text-gray-900">
              MALL<span className="text-blue-600">PRO</span>
            </Link>
            
            <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
              <Link to="/" className="hover:text-blue-600 transition">Home</Link>
              <Link to="/explore" className="hover:text-blue-600 transition">Directory</Link>
              <Link to="/offers" className="hover:text-blue-600 transition">Offers</Link>
              <Link to="/events" className="hover:text-blue-600 transition">Events</Link>
            </div>
          </div>

          {/* Manage Store Button moved here */}
          <Link 
            to="/management" 
            className="bg-gray-900 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition-colors shadow-sm"
          >
            Manage Stores
          </Link>
        </nav>

        {/* Page Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/management" element={<StoreManagement />} />
            <Route path="/explore" element={<ExploreStores />} />
            <Route path="/events" element={<Events />} />
            <Route path="/offers" element={<Offers />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;