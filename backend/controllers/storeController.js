const Store = require('../models/Store');

// DEBUG CHECK
console.log("Checking Store Model in Controller:", Store);
if (typeof Store.find !== 'function') {
  console.error("FATAL ERROR: Store.find is missing! Check models/Store.js export.");
}

// 2. Get All Stores
exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteStore = async (req, res) => {
  try {
    await Store.findByIdAndDelete(req.params.id);
    res.json({ message: "Store removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create Store
exports.createStore = async (req, res) => {
  try {
    // Passing req.body directly captures 'image' automatically
    const newStore = new Store(req.body); 
    const savedStore = await newStore.save();
    res.status(201).json(savedStore);
  } catch (err) {
    res.status(400).json({ message: "Error saving logo/store", error: err.message });
  }
};

// Update Store
exports.updateStore = async (req, res) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(
      req.params.id,
      req.body, // This allows editing ALL fields
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedStore);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};