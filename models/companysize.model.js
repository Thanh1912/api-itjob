var mongoose =require('mongoose')
 mongooseUniqueValidator = require('mongoose-unique-validator'),
  Schema                  = mongoose.Schema;
const companysizeSchema = new mongoose.Schema({
  name: String

});
companysizeSchema.plugin(mongooseUniqueValidator);
const model = mongoose.model('companysize', companysizeSchema);
module.exports = model;
