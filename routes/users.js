var express = require('express');
var router = express.Router();
var user_m = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'index'});
});
router.get('/reg', function (req, res, next) {
  res.render('reg', {errmsg: ''})
})
router.post('/reg', function(req, res, next){
  var username = req.body.username || '',
      password = req.body.password || '',
      repeatPas = req.body.repeatPas || '';

  if(password != repeatPas){
    res.render('reg', {errmsg: '密码不一致'});
    return;
  }
  var password_hash = user_m.hash(password),
      regtime = parseInt(Date.now()/1000);

  user_m.reg(username, password_hash, regtime, function(result){
    if(result.isExisted){
      res.render('reg', {errmsg: '用户名已存在'});
    }
    else if(result.affectedRows){
      res.redirect('/')
    }
    else{
      res.render('reg', {errmsg: '注册失败，请重新尝试'})
    }
  })
})
router.get('/login', function(req, res, next){
  res.render('login', {errmsg: ''});
})
router.post('/login', function (req, res, next) {
  var username = req.body.username || '',
      password = req.body.password || '';
    
  var password_hash = user_m.hash(password);

  user_m.login(username, password_hash, function (result) {
    if(result.length){
      // res.send('登录成功');
      req.session.user = {
        uid: result[0].id,
        username: username
      }
      res.redirect('/')
    }
    else{
      res.render('login', {errmsg: '用户名或密码错误'})
    }
  })
})

module.exports = router;
