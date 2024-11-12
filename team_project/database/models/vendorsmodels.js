const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  employee_name: { type: String, required: true },
});

module.exports = mongoose.model('Vendor', vendorSchema);
