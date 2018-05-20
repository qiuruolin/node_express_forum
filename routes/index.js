var express = require('express');
var router = express.Router();
var list_m = require('../models/list');

/* GET home page. */
router.get('/', function(req, res, next) {
  list_m.getIndexList(function(result){
    res.render('index', { data: result });
  })
});

module.exports = router;
