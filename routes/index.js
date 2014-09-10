var express = require('express');
var router = express.Router();
var Changeset = require('../models/changesets');

/* GET home page. */
router.get('/', function(req, res) {
  if (!req.user) return res.redirect('/login');
  res.render('./home/index', { user: req.user, title: 'Express' });
});

module.exports = router;
