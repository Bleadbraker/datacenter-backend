const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 1. Define the Database Structure
const logSchema = new mongoose.Schema({
  logId: String,
  personnel: String,
  role: String,
  clearance: String,
  zone: String,
  timeIn: String,
  status: String
});
// (Safeguard to prevent redefining the model)
const Log = mongoose.models.Log || mongoose.model('Log', logSchema);

// --- READ: Get all logs ---
router.get('/', async (req, res) => {
  try {
    // Get the 20 most recent logs
    const logs = await Log.find().sort({ _id: -1 }).limit(20);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

// --- CREATE: Add a new log (Requires JWT Badge!) ---
router.post('/', async (req, res) => {
  try {
    const newLog = new Log(req.body);
    await newLog.save();

    // The Magic: Broadcast the new log to all connected frontends instantly!
    const io = req.app.get('io');
    if (io) io.emit('log-added', newLog);

    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ error: "Failed to create log" });
  }
});

// --- DELETE: Remove a log (Requires JWT Badge!) ---
router.delete('/:id', async (req, res) => {
  try {
    await Log.findByIdAndDelete(req.params.id);

    // The Magic: Tell all connected frontends to remove this specific ID instantly!
    const io = req.app.get('io');
    if (io) io.emit('log-deleted', req.params.id);

    res.json({ message: 'Log deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete log" });
  }
});

module.exports = router;