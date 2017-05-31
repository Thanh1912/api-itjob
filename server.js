// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const app = express();
var crypto = require("crypto");
var formidable = require('formidable');
var cors = require('cors');
var multer = require('multer');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function (req, res) {
	// ejs render automatically looks in the views folder
	res.render('index');
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);


app.listen(port, function () {

});