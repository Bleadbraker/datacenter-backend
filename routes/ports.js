const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 1. Define the Database Structure for Cables
const portSchema = new mongoose.Schema({
  source: String,
  destination: String,
  cableTag: String,
  status: { type: String, default: 'Active' },
  dateAdded: { type: Date, default: Date.now }
});

const PortMap = mongoose.models.PortMap || mongoose.model('PortMap', portSchema);

// --- READ: Get all mapped ports ---
router.get('/', async (req, res) => {
  try {
    const ports = await PortMap.find().sort({ _id: -1 });
    res.json(ports);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch port mappings" });
  }
});

// --- CREATE: Manually add a new cable (Requires JWT) ---
router.post('/', async (req, res) => {
  try {
    const newPort = new PortMap(req.body);
    await newPort.save();
    res.status(201).json(newPort);
  } catch (err) {
    res.status(500).json({ error: "Failed to save port mapping" });
  }
});

// --- DELETE: Remove a cable (Requires JWT) ---
router.delete('/:id', async (req, res) => {
  try {
    await PortMap.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cable mapping deleted' });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete mapping" });
  }
});

module.exports = router;