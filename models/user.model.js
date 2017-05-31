var mongoose = require('mongoose'),
  Schema  = mongoose.Schema;
const adminSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true, required: true },//, text: true
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: String,
  createddate:{ type: Date, default: Date.now },
  role: { type: String},
  info_recruiter:{
  namecompany: String,
  website: String,
  facebook: String,
  phone: String,
  introduction : String,
  logo : String,
  profileimage : String,
  address: String,

  active :{ type: Boolean , required: true, default:false},
  companysizeid : mongoose.Schema.Types.ObjectId,
  countryid : mongoose.Schema.Types.ObjectId,
  posts : [{
      _post:[{type: Schema.Types.ObjectId, ref: 'post'}],
    }],
  }
});

const model = mongoose.model('user', adminSchema);

module.exports = model;
