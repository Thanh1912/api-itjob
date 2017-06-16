/**
 * Created by PC01 on 6/11/2017.
 */
var mongoose = require('mongoose');
var model = require('../models/resume.model.js');


// Insert
module.exports.insert = function(req, res) {
  const obj = new model(req.body);
  obj.save(function(err, item)  {
    if (err) { return console.error(err); }
    res.status(200).json(item);
  });
};
