var mongoose = require('mongoose');
var model = require('../models/candidate.model.js')
,passwordHash = require('password-hash'),
  jwt = require('jsonwebtoken'),  config = require('../config/config');

// user register
module.exports.register =function (req, res, next) {
  var user = new model({
   fullname:req.body.fullname,
    email: req.body.email,
    profileimage: req.body.profileimage ,
    password: passwordHash.generate(req.body.password)
  });

  console.log(user)
  user.save(function (err, result) {
    if (err) {
      console.log(err)
      console.log(result)
      return res.status(403).json({
        title: 'There was an issue',
        error: {message: 'The email you entered already exists'}
      });
    }
    res.status(200).json({
      message: 'Registration Successfull',
      obj: result
    })
  })
};
// user login
module.exports.login = function (req, res, next) {
  console.log('dang login'+req.body.email)
  model.findOne({email: req.body.email}, function (err, doc) {
    if (err) {
      return res.status(403).json({
        title: 'There was a problem',
        error: err
      });
    }
    if (!doc) {
      return res.status(403).json({
        title: 'Wrong Email or Password',
        error: {message: 'Please check if your password or email are correct'}
      })
    }
    if (!passwordHash.verify(req.body.password, doc.password)) {
      return res.status(403).json({
        title: 'You cannot log in',
        error: {message: 'Please check your password or email'}
      })
    }
    var token = jwt.sign({user: doc}, config.secret, {expiresIn: config.jwtExpire});
    return res.status(200).json({
      message: 'Login Successfull',
      token: token,
      userId: doc._id,
      username:doc.email,
      role:doc.role,
      fullname:doc.fullname,
    })
  })
};


 // Get all
  module.exports.getAll = function(req, res) {
      model.find(
     function(err, model) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log('getall', model);
      res.status(200).json(model);
    }
  });
  };

  // Count all
  module.exports.count = function(req, res) {
   model.count(function(err, count) {
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
    });
  };

  // Get by id
  module.exports.get = function(req, res) {
    model.findOne({ _id: req.params.id }, function(err, obj) {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  };

  // Update by id
  module.exports.update = function(req, res) {
    model.findOneAndUpdate({ _id: req.params.id }, req.body, function(err) {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  };

  // Delete by id
  module.exports.delete = function(req, res) {
    model.findOneAndRemove({ _id: req.params.id },function (err) {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }
