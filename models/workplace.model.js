var mongoose = require('mongoose');
const workplaceSchema = new mongoose.Schema({
  name: String,
});
const model = mongoose.model('workplace', workplaceSchema);
module.exports = model;
