var mongoose = require('mongoose'),
  Schema                  = mongoose.Schema;
 mongooseUniqueValidator = require('mongoose-unique-validator');
const resumeSchema = new mongoose.Schema({
  pathresume : String,
  candidateid :  {type: Schema.Types.ObjectId, ref: 'candidate'}
});

const model = mongoose.model('resume', resumeSchema);
module.exports = model;


