var express     = require('express'),
    router      = express.Router(),
    crypto      = require("crypto"),
    nodemailer  = require('nodemailer'),
    async       = require('async'),
    sgTransport = require('nodemailer-sendgrid-transport'),
    config      = require('../config/config');
//chua su dung
var User = require('../models/user.model');

// requesting password reset and setting the fields resetPasswordToken to a newly generated token
// and resetPasswordExpires to the exact date the form is submitted so we can set/check the validity of the timestamp (token is valid for only one hour)
// after that, the user must request a new password reset.

router.post('/forgot_ntd', function (req, res, next) {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({email: req.body.email, role: 'nhatuyendung'}, function (err, user) {
        if (err) {
          return res.status(403).json({
            title: 'There was an error',
            error: err
          });
        }
        if (!user) {
          return res.status(403).json({
            title: 'Please check if your email is correct',
            error: {message: 'Please check if your email is correct'}
          })
        }
        user.resetPasswordToken   = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
     console.log(user.resetPasswordToken )
       console.log(user.resetPasswordExpires  )
        user.save(function (err) {
          done(err, token, user);
        });
      });
    },
    // sending the notification email to the user with the link and the token created above
    function (token, user, done) {
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
        +'            <p><a href="http://localhost:4200/reset/password-ntd/'+token+'" style="color:blue;font-size:12px;">http://localhost/sdo-web-v3/public/password/reset/'+token+'</a></p>'
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
  ], function (err) {
    if (err) return next(err);
  });
});

module.exports = router;
