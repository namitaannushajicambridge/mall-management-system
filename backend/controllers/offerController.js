const Offer = require('../models/Offer');

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.status(200).json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOffer = async (req, res) => {
  try {
    const newOffer = new Offer(req.body);
    const savedOffer = await newOffer.save();
    res.status(201).json(savedOffer);
  } catch (err) {
    res.status(400).json({ message: "Error saving offer", error: err.message });
  }
};

exports.updateOffer = async (req, res) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedOffer);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ message: "Offer removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
