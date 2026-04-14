const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Store = require('./models/Store');
const Offer = require('./models/Offer');

dotenv.config();

const seedData = async () => {
  try {
    // Attempt connection
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mall_db');
    console.log('✅ Connected to MongoDB for Seeding');

    // Wipe old data to ensure clean slate
    await Store.deleteMany({});
    await Offer.deleteMany({});
    console.log('🧹 Cleared existing empty data');

    // Sample Stores
    const stores = [
      { storeName: "Zara", category: "Fashion", shopNumber: "101", ownerName: "Inditex", status: "Active" },
      { storeName: "H&M", category: "Fashion", shopNumber: "102", ownerName: "H&M Group", status: "Active" },
      { storeName: "Nike", category: "Fashion", shopNumber: "105", ownerName: "Nike Inc.", status: "Active" },
      { storeName: "Apple Store", category: "Technology", shopNumber: "201", ownerName: "Apple Inc.", status: "Active" },
      { storeName: "Samsung Experience", category: "Technology", shopNumber: "202", ownerName: "Samsung", status: "Active" },
      { storeName: "The Cheesecake Factory", category: "Dining", shopNumber: "301", ownerName: "Cravecorps", status: "Active" },
      { storeName: "Starbucks", category: "Dining", shopNumber: "302", ownerName: "Starbucks Corp", status: "Active" },
      { storeName: "AMC Theatres", category: "Entertainment", shopNumber: "401", ownerName: "AMC", status: "Active" },
      { storeName: "Sony Center", category: "Tech", shopNumber: "203", ownerName: "Sony", status: "Active" },
      { storeName: "Sephora", category: "Fashion", shopNumber: "110", ownerName: "LVMH", status: "Active" }
    ];

    await Store.insertMany(stores);
    console.log(`🛍️ Inserted ${stores.length} sample stores`);

    // Dynamic dates so they never expire automatically immediately
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    // Sample Offers
    const offers = [
      { 
        title: "End of Season Sale", 
        description: "Revamp your wardrobe with up to 50% off on all selected premium winter wear.", 
        storeName: "Zara", 
        discount: "50% OFF", 
        validUntil: nextWeek, 
        offerType: "Flash Sale" 
      },
      { 
        title: "Buy 1 Get 1 Free", 
        description: "Double up on basics! Buy any cotton classic tee and get the second absolutely free.", 
        storeName: "H&M", 
        discount: "BOGO", 
        validUntil: nextWeek, 
        offerType: "Promotion" 
      },
      { 
        title: "Back to School Tech", 
        description: "Show a valid student ID at checkout to redeem a permanent 10% educational hardware discount.", 
        storeName: "Apple Store", 
        discount: "10% OFF", 
        validUntil: nextMonth, 
        offerType: "Education" 
      },
      { 
        title: "Cheesecake Tasting", 
        description: "Enjoy a complimentary slice of our signature New York cheesecake with any main course.", 
        storeName: "The Cheesecake Factory", 
        discount: "FREE SLICE", 
        validUntil: nextWeek, 
        offerType: "Dining" 
      },
      { 
        title: "Midnight Sneakers", 
        description: "Early access drop! Grab the newest limited edition Air Max colorway before anyone else.", 
        storeName: "Nike", 
        discount: "EARLY ACCESS", 
        validUntil: today, 
        offerType: "Exclusive" 
      },
      {
        title: "Beauty Box Special",
        description: "Receive a free deluxe sample box on any fragrance purchase over $100.",
        storeName: "Sephora",
        discount: "GIFT w/ PURCHASE",
        validUntil: nextMonth,
        offerType: "General"
      }
    ];

    await Offer.insertMany(offers);
    console.log(`🎁 Inserted ${offers.length} sample offers`);

    // Close Connection
    await mongoose.disconnect();
    console.log('✅ Connection closed successfully.');
    process.exit(0);

  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
};

seedData();
