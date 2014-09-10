var express = require('express');
var router = express.Router();
var Changeset = require('../../models/changesets');

/* GET home page. */
router.get('/', function(req, res) {
  Changeset.query().select().limit(1).then(function (resp) {
    console.log(resp);
  });
  res.render('./index', { title: 'Express' });
});

module.exports = router;
