const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  storeName: { type: String, required: true },
  discount: { type: String, required: true },
  validUntil: { type: Date, required: true },
  offerType: { type: String, default: 'General' }
}, { timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;
