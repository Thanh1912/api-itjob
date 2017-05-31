var express = require('express'),
    router = express.Router(),
    crypto = require("crypto"),
    nodemailer = require('nodemailer'),
    async = require('async'),
    sgTransport = require('nodemailer-sendgrid-transport'),
    passwordHash = require('password-hash'),
    config = require('../config/config');
//chua su dung
var User = require('../models/user.model');


 // getting token from email and checking if it's valid
router.get('/:token', function(req, res) {
  var token = req.params.token;
  User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if(err) {
      return res.status(403).json({
        title: 'An error occured',
        error: err
      });
    }
    if(!user) {
      return res.status(403).json({
        title: 'Password cannot be changed!',
        error: {message: 'Password reset token is invalid or has expired.'}
      })
    }
    return res.status(200).json({
      message: 'Success',
      token: token
    })
  });

});

// after getting token from email, check if it's still valid and then proceed in password reset by
// getting the user new password, hashing it and then reset the passwordToken and passwordExpires fields to undefined

router.post('/:token', function(req, res) {
  async.waterfall([
    function(done) {
      var token = req.params.token;
      User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if(err) {
          return res.status(403).json({
            title: 'An error occured',
            error: err
          });
        }
        if(!user) {
          return res.status(403).json({
            title: 'There was an error',
            error: {message: 'Please check if your email is correct'}
          })
        }
        user.password = passwordHash.generate(req.body.password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          done(err, user);
        });
      });
    },

    // sending notification email to user that his password has changed
    function(user, done) {
 //================Send email =====================
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'htp1912@gmail.com',
    pass: 'spkt19129595'
  }
});

var mailOptions = {
  from: 'htp1912@gmail.com',
  to: user.email,
  subject: 'Sending Email using Node.js',
  html: ''
  +'<table style="width: 100%;">'
   +'   <tr>'
    +'    <td></td>'
   +'     <td bgcolor="#FFFFFF ">'
  +'        <div style="padding: 15px; max-width: 600px;margin: 0 auto;display: block; border-radius: 0px;padding: 0px; border: 1px solid lightseagreen;">'
   +'         <table style="width: 100%;background: #00b6e2 ;">'
    +'          <tr>'
    +'            <td></td>'
   +'             <td>'
    +'              <div>'
    +'                <table width="100%">'
    +'                  <tr>'
    +'                    <td rowspan="2" style="text-align:center;padding:10px;">'
		+'					<img style="float:left; "  src="https://image.ibb.co/c0Ofkk/Logomakr_2v_QXUH.png" />'

			+'				<span style="color:white;float:right;font-size: 13px;font-style: italic;margin-top: 20px; padding:10px; font-size: 14px; font-weight:normal;">'
			+'				"When you want, where you want."<span></span></span></td>'
      +'                </tr>'
      +'              </table>'
       +'           </div>'
       +'         </td>'
       +'         <td></td>'
       +'       </tr>'
        +'    </table>'
       +'     <table style="padding: 10px;font-size:14px; width:100%;">'
        +'      <tr>'
        +'        <td style="padding:10px;font-size:14px; width:100%;">'
        +'            <p>Hi Nagoor,</p>'
        +'            <p><br /> You have requested to reset your password. Please click below to reset.</p>'
        +'            <p><a href="http://localhost/sdo-web-v3/public/password/reset/c5c52274fdc00ba7db13da3da13e1c89be5c3ca2c88d1cc53def29d619a93c10?email=haneefamsit%40gmail.com" style="color:blue;font-size:12px;">http://localhost/sdo-web-v3/public/password/reset/c5c52274fdc00ba7db13da3da13e1c89be5c3ca2c88d1cc53def29d619a93c10?email=haneefamsit%40gmail.com</a></p>'
        +'            <p>Change password<br /> You need to complete the password reset within 24 hours. If this was not done by you, please contact support@seedoconline.com</p>'
         +'           <p> </p>'
       +'             <p>Thanks for choosing JobIT,</p>'
        +'            <p>JobIT Team.</p>'

    +'             </td>'
     +'         </tr>'
		+'	  <tr>'
		+'	  <td>'
		+'		 <div align="center" style="font-size:12px; margin-top:20px; padding:5px; width:100%; background:#eee;">'
     +'               © 2016 <a href="http://localhost:4200" target="_blank" style="color:#333; text-decoration: none;">JobIT</a>'
   +'               </div>'
   +'             </td>'
		+'	  </tr>'
     +'       </table>'
     +'     </div>'

};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

 console.log('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        return res.status(200).json({
          message: 'Success'
        })






     //========================Send Email ================
    }
  ], function(err) {
    if (err) {
    }
  });
});

module.exports = router;
