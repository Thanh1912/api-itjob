// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const app = express();
  var  crypto  = require("crypto");
  var formidable = require('formidable');
var cors = require('cors');
var multer  = require('multer');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.options('*', cors());
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});
app.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.writeHead(200, {'Content-Type': 'text/plain'});
 });
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'src')));
// Get our API routes
const api_forget = require('./routes/forgetPassword');
app.use('/api/nhatuyendung/', api_forget);

app.use('/uploads', express.static(__dirname + '/uploads'));
// Cross Origin middleware
//==================API TRANG WEB O DAY=========
// Set our api routes
var setRoutes =require('./routes/routes')
app.use('/api', setRoutes);
var Routes_forgetPassword =require('./routes/forgetPassword')
app.use('/api', Routes_forgetPassword);









app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});
//=======Upload cach 2====
 var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./uploads/forms/post");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });
  var upload = multer({
     storage: Storage
 }).single('file');
app.post("/api/uploadpostbaidang", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
         console.log(req.file.filename)
         return res.end(req.file.filename);
     });
 });

//Upload logo
 var Storage_logo = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./uploads/forms/logo");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });
  var upload_logo = multer({
     storage: Storage_logo
 }).single('file_logo');
app.post("/api/uploadlogo", function(req, res) {
     upload_logo (req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
         console.log(req.file.filename)
         return res.end(req.file.filename);
     });
 });
 //UploadANH DAI DIEN CONG TY
 var Storage_cogty = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./uploads/forms/image");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });
  var upload_cogty = multer({
     storage: Storage_cogty
 }).single('file_co');
app.post("/api/uploadcogty", function(req, res) {
     upload_cogty (req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
         console.log(req.file.filename)
         return res.end(req.file.filename);
     });
 });

//Upload anhdaidien
var Storage_anhdaidien = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./uploads/forms/anhdaidien");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});
var upload_anhdaidien = multer({
  storage: Storage_anhdaidien
}).single('anhdaidien');
app.post("/api/anhdaidien", function(req, res) {
  upload_logo (req, res, function(err) {
    if (err) {
      return res.end("Something went wrong!");
    }
    console.log(req.file.filename)
    return res.end(req.file.filename);
  });
});
//Upload cv
var Storage_cv = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./uploads/forms/filecv");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});
var upload_cv = multer({
  storage: Storage_logo
}).single('file_cv');
app.post("/api/uploadcv", function(req, res) {
  upload_cv (req, res, function(err) {
    if (err) {
      return res.end("Something went wrong!");
    }
    console.log(req.file.filename)
    return res.end(req.file.filename);
  });
});



//==================API TRANG WEB O DAY=========

// Catch all other routes and return the index file
app.get('/api/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});
//==================SET API =========




/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
