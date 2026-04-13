import React from 'react';

const Events = () => {
  // Static dummy data to visualize the layout
  const staticEvents = [
    {
      id: 1,
      title: "Summer Fashion Week 2026",
      date: "May 15, 2026",
      time: "4:00 PM - 9:00 PM",
      location: "Main Atrium, Ground Floor",
      category: "Fashion",
      description: "Experience the latest trends from international brands. Live runway show and celebrity guests.",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Tech Expo & Gadget Show",
      date: "June 02, 2026",
      time: "10:00 AM - 8:00 PM",
      location: "Hall B, Level 2",
      category: "Technology",
      description: "Interactive zones for VR gaming, new smartphone launches, and exclusive tech discounts.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Gourmet Food Festival",
      date: "June 10, 2026",
      time: "12:00 PM - 11:00 PM",
      location: "Food Court Terrace",
      category: "Dining",
      description: "Live cooking demos by master chefs and tasting sessions from 20+ global cuisines.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Mall Events</h1>
        <p className="text-gray-500 text-lg">Discover what's happening at MallPro this month.</p>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {staticEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
            
            {/* Image Container */}
            <div className="h-48 overflow-hidden relative">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {event.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-blue-600 text-sm font-bold mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {event.date}
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h2>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {event.description}
              </p>

              <div className="space-y-2 border-t pt-4 border-gray-50">
                <div className="flex items-center text-xs text-gray-400 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {event.time}
                </div>
                <div className="flex items-center text-xs text-gray-400 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>
              </div>
              
              <button className="w-full mt-6 py-3 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-colors active:scale-95 duration-200">
                Remind Me
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;