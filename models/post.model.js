var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const nhattuyendungSchema = new mongoose.Schema({
  title: { type: String, required: true },
  salarycompete: String,
  salarybegin: String,
  salaryend: String,
  descriptionwork: String,
  requirementwork: { type: String,  required: true },
  postimage: { type: String,  required: true },
  workplaceid: String,//
  districtid: String,//
  recruiterid: { type: Schema.Types.ObjectId, ref: 'user' },
  keywords: [
    {
      _id: String
    }
  ]
});

const model = mongoose
  .model('post', nhattuyendungSchema);

module.exports = model;
