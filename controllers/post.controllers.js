var mongoose = require('mongoose');
var model = require('../models/post.model.js');
var keyword = require('../models/keyword.model.js');
var workplace = require('../models/workplace.model.js');
var _ = require("underscore");

//get lien ket bang


// Get all
module.exports.getAlldemo = function (req, res) {
   model.aggregate([
    { "$lookup": {
      "from": "users",
      "localField": "recruiterid",
      "foreignField": "_id",
      "as": "listuser"
    }}
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });

};










// Get all
module.exports.getAll = function (req, res) {
  model.find(
    function (err, model) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        res.status(200).json(model);
      }
    });
};
module.exports.get_job_key = function (req, res) {

  console.log(req.body);

  var array=[];
  array=req.body;
  model.find({ keywords : { $in : array } }).sort({ "createddate": 1 }
  ).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });

};





module.exports.top10post = function (req, res) {
  model.find().sort({ "createddate": 1 }

  ).limit(10).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};
module.exports.getalljobs = function (req, res) {
  model.find().exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};

module.exports.getiduser = function (req, res) {

  model.find(
 {
'recruiterid' :req.params.id
 },
    function (err, model) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        res.status(200).json(model);
      }
    });
};
// Count all
module.exports.count = function (req, res) {
  model.count(function (err, count) {
    if (err) { return console.error(err); }
    res.json(count);
  });
};
  // Insert
  module.exports.insert = function(req, res) {
    const obj = new model(req.body);
    obj.save(function(err, item)  {
      if (err) { return console.error(err); }
      res.status(200).json(item);
     //save user



    });
  };

// Get by id
module.exports.get = function (req, res) {
  model.findOne({ _id: req.params.id }, function (err, obj) {
    if (err) { return console.error(err); }
    res.json(obj);
  });
};
module.exports.get_job_company = function (req, res) {
  model.find({ recruiterid: req.params.id }, function (err, obj) {
    if (err) { return console.error(err); }
    res.json(obj);
  });
};

// Update by id
module.exports.update = function (req, res) {
  model.findOneAndUpdate({ _id: req.params.id }, req.body, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
};

// Delete by id
module.exports.delete = function (req, res) {
  model.findOneAndRemove({ _id: req.params.id }, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
}

