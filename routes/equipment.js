const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  startU: { type: Number, required: true },
  status: { type: String, default: 'online' },
  
  // 👇 THE TWO NEW FIELDS YOU REQUESTED 👇
  serialNumber: { type: String, default: '' },
  modelName: { type: String, default: '' }
});

module.exports = mongoose.model('Equipment', equipmentSchema);