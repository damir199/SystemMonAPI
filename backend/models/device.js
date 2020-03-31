const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
  id: { type: String, required: true },
  pc_name: { type: String, required: true },
  ip_address: { type: String, required: true },
  MAC_address: { type: String, required: true },
  dns_address: { type: String, required: true },
  default_gateway: { type: String, required: true },
  hdd_space: { type: String, required: true },
  free_hdd_space: { type: String, required: true }
});

module.exports = mongoose.model('Device', deviceSchema);
