const mongoose = require('mongoose');

const portSchema = new mongoose.Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  cableTag: { type: String, required: true },
  status: { type: String, default: 'active' },
  
  // 👇 THE NEW FIELD FOR PDF EXPORTS 👇
  cableType: { type: String, default: 'CAT6' },
  
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Port', portSchema);