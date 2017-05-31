
var mongoose = require('mongoose'),
  Schema  = mongoose.Schema;
const user_candidateSchema = new mongoose.Schema({
  postid: {type: Schema.Types.ObjectId, ref: 'post'},
  cadidateid : {type: Schema.Types.ObjectId, ref: 'cadidate'},
  userid : {type: Schema.Types.ObjectId, ref: 'user'},
  resume_id: {type: Schema.Types.ObjectId, ref: 'resume'},
  Create_date: { type: Date, default: Date.now }
  //checkresume:boolean
});
const model = mongoose.model('user_candidate', user_candidateSchema);
module.exports = model;
