var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
 var mongooseUniqueValidator = require('mongoose-unique-validator');
const keywordSchema = new mongoose.Schema({
  name: String,
});
const model = mongoose.model('keyword', keywordSchema);
module.exports = model;
