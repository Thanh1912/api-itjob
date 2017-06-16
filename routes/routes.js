var express = require('express');
var router = express.Router();
fs = require('fs'),
  multer = require('multer'),
  mime = require('mime'),
  path = require('path'),
  gm = require('gm').subClass({ imageMagick: true }),
  jwt = require('jsonwebtoken');


  var formidable = require('formidable');
var candidatectrl = require('../controllers/candidate.controllers.js');
var user_nhatuyendungctrl = require('../controllers/user.controllers.js');
var keywordctrl = require('../controllers/keyword.controllers.js');

//*====================/connect mongodb ======================
var connect = require('../config/db');
connect.open();
//*====================./ connect mongodb ======================*/
//  USERADMIN -NTD DANG KY DANG NHAP
router.route('/user/login/').post(user_nhatuyendungctrl.login);
router.route('/admin/login/').post(user_nhatuyendungctrl.login_admin);
router.route('/user/register/').post(user_nhatuyendungctrl.register);
router.route('/admin/register/').post(user_nhatuyendungctrl.register_admin);


router.route('/admin/getall_admin/').get(user_nhatuyendungctrl.getAll_amdin);
router.route('/admin/count').get(user_nhatuyendungctrl.count_amdin);
router.route('/admin').post(user_nhatuyendungctrl.insert_amdin);
router.route('/admin/:id').get(user_nhatuyendungctrl.get_amdin);
router.route('/admin/:id').put(user_nhatuyendungctrl.update_amdin);
router.route('/admin/:id').delete(user_nhatuyendungctrl.delete_amdin);


router.route('/nhatuyendung/getall/').get(user_nhatuyendungctrl.getAll_ntd);
router.route('/nhatuyendung/count').get(user_nhatuyendungctrl.count_ntd);
router.route('/nhatuyendung/:id').get(user_nhatuyendungctrl.get_ntd);
router.route('/nhatuyendung/:id').put(user_nhatuyendungctrl.update_ntd);
router.route('/nhatuyendung/:id').delete(user_nhatuyendungctrl.delete_ntd);
router.route('/nhatuyendung/duyet/:id').put(user_nhatuyendungctrl.update_duyet_ntd);
router.route('/nhatuyendung/kduyet/:id').put(user_nhatuyendungctrl.update_kduyet_ntd);
router.route('/updatenhatuyendung/:id').put(user_nhatuyendungctrl.update_info_company);
router.route('/nhatuyendungget/gettop10company/').get(user_nhatuyendungctrl.gettop10);

//keyword
//  USER -- THANH VIEN DANG KY DANG NHAP
router.route('/thanhvien/login/').post(candidatectrl.login);
router.route('/thanhvien/register/').post(candidatectrl.register);

//
router.route('/thanhvien').get(candidatectrl.getAll);
router.route('/thanhvien/count').get(candidatectrl.count);
router.route('/thanhvien').post(candidatectrl.insert);
router.route('/thanhvien/:id').get(candidatectrl.get);
router.route('/thanhvien/:id').put(candidatectrl.update);
router.route('/thanhvien/:id').delete(candidatectrl.delete);
//keyword
router.route('/keyword').get(keywordctrl.getAll);
router.route('/keyword/count').get(keywordctrl.count);
router.route('/keyword').post(keywordctrl.insert);
router.route('/keyword/:id').get(keywordctrl.get);
router.route('/keyword/:id').put(keywordctrl.update);
router.route('/keyword/:id').delete(keywordctrl.delete);


var districtctrl = require('../controllers/district.controllers.js');
var resumectrl = require('../controllers/resume.controllers.js');
var countryctrl = require('../controllers/country.controllers.js');
var companysizectrl = require('../controllers/companysize.controllers.js');
var workplacectrl = require('../controllers/workplace.controllers.js');
// APIs


router.route('/resume').post(resumectrl.insert);
router.route('/district').get(districtctrl.getAll);
router.route('/district/count').get(districtctrl.count);
router.route('/district').post(districtctrl.insert);
router.route('/district/:id').get(districtctrl.get);
router.route('/district/:id').put(districtctrl.update);
router.route('/district/:id').delete(districtctrl.delete);
router.route('/districtw/:id').get(districtctrl.getidw);


router.route('/country').get(countryctrl.getAll);
router.route('/country/count').get(countryctrl.count);
router.route('/country').post(countryctrl.insert);
router.route('/country/:id').get(countryctrl.get);
router.route('/country/:id').put(countryctrl.update);
router.route('/country/:id').delete(countryctrl.delete);


router.route('/companysize').get(companysizectrl.getAll);
router.route('/companysize/count').get(companysizectrl.count);
router.route('/companysize').post(companysizectrl.insert);
router.route('/companysize/:id').get(companysizectrl.get);
router.route('/companysize/:id').put(companysizectrl.update);
router.route('/companysize/:id').delete(companysizectrl.delete);



router.route('/workplace').get(workplacectrl.getAll);
router.route('/workplace/count').get(workplacectrl.count);
router.route('/workplace').post(workplacectrl.insert);
router.route('/workplace/:id').get(workplacectrl.get);
router.route('/workplace/:id').put(workplacectrl.update);
router.route('/workplace/:id').delete(workplacectrl.delete);
var postctrl = require('../controllers/post.controllers.js');

router.route('/post').get(postctrl.getAll);
router.route('/gettop10post').get(postctrl.top10post);
router.route('/getdemo').get(postctrl.getAlldemo);
router.route('/post/count').get(postctrl.count);
router.route('/post').post(postctrl.insert);
router.route('/post/:id').get(postctrl.get);
router.route('/post/:id').put(postctrl.update);
router.route('/post/:id').delete(postctrl.delete);
router.route('/getpost/:id').get(postctrl.getiduser);
router.route('/search-job-key').post(postctrl.get_job_key)
router.route('/search-job-company/:id').get(postctrl.get_job_company)
//===================UPload================


// up load cv
// cap nhat thong tin user
//get chi tiet job
//get chi tiet company

// select all job search
// add list yeu thich job
// select job
router.route('/getallnewjob').get(postctrl.getalljobs);




module.exports = router;
