var mongoose =require('mongoose')
const candidateSchema = new mongoose.Schema({
   email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  fullname : String,
  profileimage : String
});
const model = mongoose.model('candidate', candidateSchema);
module.exports = model;
