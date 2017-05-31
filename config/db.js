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
//mongodb://<dbuser>:<dbpassword>@ds157971.mlab.com:57971/heroku_v1688jsj
mongoose.connect(process.env.MONGOLAB_URI)
  .then(() =>  console.log('Kết nối thành công!'))
  .catch((err) => console.error(err));
};
module.exports = {
  open : open
};


