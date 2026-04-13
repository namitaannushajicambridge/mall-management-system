const express = require('express');
const router = express.Router();
const { 
  createStore, 
  getAllStores, 
  deleteStore,
  updateStore 
} = require('../controllers/storeController');

// http://localhost:5000/api/stores
router.post('/', createStore);
router.get('/', getAllStores);
router.delete('/:id', deleteStore);
router.put('/:id', updateStore);


module.exports = router;