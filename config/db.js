/*const config = {
  url : 'mongodb://localhost:27017/cats'
};
exports.config=config;
*/
var mongoose = require('mongoose');
var open = function() {
 // config files
// Use native Node promises
mongoose.Promise = global.Promise;
// connect to MongoDB
  //
  //mongodb://heroku_v1688jsj:5680b3qqfm9fa3a1rg0n3acnhv@ds157971.mlab.com:57971/heroku_v1688jsj
mongoose.connect('mongodb://localhost:27017/Mean_Job')
  .then(() =>  console.log('Kết nối thành công!'))
  .catch((err) => console.error(err));
};
module.exports = {
  open : open
};


