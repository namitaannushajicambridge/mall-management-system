const mongoose = require('mongoose');

console.log("--- Store Model File Loaded ---");

const storeSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  category: { type: String, required: true },
  shopNumber: { type: String, required: true },
  ownerName: { type: String },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;