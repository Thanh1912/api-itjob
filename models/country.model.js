var mongoose =require('mongoose'),
  Schema                  = mongoose.Schema;
 mongooseUniqueValidator = require('mongoose-unique-validator');
const countrySchema = new mongoose.Schema({
  name: String
});
countrySchema.plugin(mongooseUniqueValidator);
const model = mongoose.model('country', countrySchema);
module.exports = model;

