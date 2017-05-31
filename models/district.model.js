var mongoose = require('mongoose'),
  Schema                  = mongoose.Schema;
 mongooseUniqueValidator = require('mongoose-unique-validator');
const districtSchema = new mongoose.Schema({
  name: String,
  workplace: String
});

const model = mongoose.model('district', districtSchema);

module.exports = model;
