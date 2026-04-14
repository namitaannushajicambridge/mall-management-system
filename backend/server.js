const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser'); // You can keep using this
const app = express();

// 1. CORS first
app.use(cors());

// 2. THE LIMITS (Use ONLY these two lines for body parsing)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// 3. ROUTES MUST COME AFTER THE LIMITS
const storeRoutes = require('./routes/storeRoutes');
const offerRoutes = require('./routes/offerRoutes');
app.use('/api/stores', storeRoutes);
app.use('/api/offers', offerRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mall_db')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});