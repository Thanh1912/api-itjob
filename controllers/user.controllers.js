var mongoose = require('mongoose');
var model = require('../models/user.model.js')
  , passwordHash = require('password-hash'),
  jwt = require('jsonwebtoken'),
  config = require('../config/config');
// user: admin - nhat tuyen dung
// user register
module.exports.register = function (req, res, next) {
  var nhatuyendung = new model({
    fullname: req.body.fullname,
    email: req.body.email,
    password: passwordHash.generate(req.body.password),
    info_recruiter: {
      namecompany: req.body.namecompany ,
      phone: req.body.phone ,
    },
    role: "nhatuyendung"
  });

  console.log(nhatuyendung);
  console.log(nhatuyendung)
  nhatuyendung.save(function (err, result) {
    if (err) {
      console.log(err)
      console.log(result)
      return res.status(403).json({
        title: 'There was an issue',
        error: { message: 'The email you entered already exists' }
      });
    }
    res.status(200).json({
      message: 'Registration Successfull',
      obj: result
    })
  })
};

module.exports.register_admin = function (req, res, next) {
  var nhatuyendung = new model({
    fullname: req.body.fullname,
    email: req.body.email,
    password: passwordHash.generate(req.body.password),
    role: "admin"
  });
  nhatuyendung.save(function (err, result) {
    if (err) {
      console.log(err)
      console.log(result)
      return res.status(403).json({
        title: 'There was an issue',
        error: { message: 'The email you entered already exists' }
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
  console.log('dang login' + req.body.email.toLowerCase());

  model.findOne(
{
  email:req.body.email,
      role: 'nhatuyendung',
      "info_recruiter.active" : true
}
    , function (err, doc) {
      if (err) {
        return res.status(403).json({
          title: 'There was a problem',
          error: err
        });
      }
      if (!doc) {
        return res.status(403).json({
          title: 'Wrong Email or Password',
          error: { message: 'Please check if your password or email are correct' }
        })
      }
      if (!passwordHash.verify(req.body.password, doc.password)) {
        return res.status(403).json({
          title: 'You cannot log in',
          error: { message: 'Please check your password or email' }
        })
      }
      var token = jwt.sign({ user: doc }, config.secret, { expiresIn: config.jwtExpire });
      return res.status(200).json({
        message: 'Login Successfull',
        token: token,
        userId: doc._id,
        username: doc.email,
        fullname: doc.fullname,
        role: doc.role
      })
    })
};




// user login
module.exports.login_admin = function (req, res, next) {

  model.findOne({ email: req.body.email.toLowerCase(), role: 'admin' }, function (err, doc) {
    if (err) {
      return res.status(403).json({
        title: 'There was a problem',
        error: err
      });
    }
    if (!doc) {
      return res.status(403).json({
        title: 'Wrong Email or Password',
        error: { message: 'Please check if your password or email are correct' }
      })
    }
    if (!passwordHash.verify(req.body.password, doc.password)) {
      return res.status(403).json({
        title: 'You cannot log in',
        error: { message: 'Please check your password or email' }
      })
    }
    var token = jwt.sign({ user: doc }, config.secret, { expiresIn: config.jwtExpire });
    return res.status(200).json({
      message: 'Login Successfull',
      token: token,
      userId: doc._id,
      username: doc.email,
      fullname: doc.fullname,
      role: doc.role
    })
  })
};



// Get all  nha tuyend ung -- theo role -sap theo active
module.exports.getAll_ntd = function (req, res) {
  model.find({role:'nhatuyendung'}).sort({ "info_recruiter.active": 1 }

  ).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  })
};
module.exports.gettop10 = function (req, res) {
  model.find({role:'nhatuyendung'}).sort({ "createddate": 1 }

  ).limit(10).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};
// Count all
module.exports.count_ntd = function (req, res) {
  model.count(function (err, count) {
    if (err) { return console.error(err); }
    res.json(count);
  });
};



// Get by id
module.exports.get_ntd = function (req, res) {
  model.findOne({ _id: req.params.id }, function (err, obj) {
    if (err) { return console.error(err); }
    res.json(obj);
  });
};

// Update by id
module.exports.update_ntd = function (req, res) {
  model.findOneAndUpdate({ _id: req.params.id }, req.body, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
};
// Update by id
module.exports.update_duyet_ntd = function (req, res) {
  var update = {
    'info_recruiter.active': true
  }
    ;
  model.findOneAndUpdate({ _id: req.params.id }, {
    $set:
    update
  }, { new: true }, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
};
// Update by id
module.exports.update_kduyet_ntd = function (req, res) {
  var update = {
   'info_recruiter.active': false
  }
    ;
  model.findOneAndUpdate({ _id: req.params.id }, {
    $set:
    update
  }, { new: true }, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
};

// Delete by id
module.exports.delete_ntd = function (req, res) {
  model.findOneAndRemove({ _id: req.params.id }, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
}

// Get all admin
module.exports.getAll_amdin = function (req, res) {
  model.find({ role: 'admin' },
    function (err, model) {
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
module.exports.count_amdin = function (req, res) {
  model.count({ role: 'admin' }, function (err, count) {
    if (err) { return console.error(err); }
    res.json(count);
  });
};

// Insert
module.exports.insert_amdin = function (req, res) {
  const obj = new model(req.body);
  obj.save({ role: 'admin' }, function (err, item) {
    if (err) { return console.error(err); }
    res.status(200).json(item);
  });
};

// Get by id
module.exports.get_amdin = function (req, res) {
  model.findOne({ _id: req.params.id, role: 'admin' }, function (err, obj) {
    if (err) { return console.error(err); }
    res.json(obj);
  });
};

// Update by id
module.exports.update_amdin = function (req, res) {
  model.findOneAndUpdate({ _id: req.params.id, }, req.body, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
};

// Delete by id
module.exports.delete_amdin = function (req, res) {
  model.findOneAndRemove({ _id: req.params.id }, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
};





module.exports.update_info_company = function (req, res) {
var update={
  "info_recruiter.namecompany": req.body.namecompany,
   "info_recruiter.website": req.body.website,
   "info_recruiter.facebook":req.body.facebook,
   "info_recruiter.phone":req.body.phone,
   "info_recruiter.introduction" : req.body.introduction,
   "info_recruiter.logo" :req.body.logo,
   "info_recruiter.profileimage" :req.body.profileimage,
   "info_recruiter.address":req.body.address,
   "info_recruiter.description":req.body.description,
   "info_recruiter.companysizeid" :req.body.companysizeid,
   "info_recruiter.countryid" : req.body.countryid,

  }
  model.findOneAndUpdate({ _id: req.params.id }, {
    $set:
    update
  }, { new: true }, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
};


