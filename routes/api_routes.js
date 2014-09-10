/*This api is used to implement paging. The pagenumber for selected route
is passed as parameter and rows corresponding to that page are returned */

var express = require('express');
var router = express.Router();
var Changeset = require('../models/changesets');
var max_rows=10;
var app=require('../app');
var knex=app.get('knex');

router.use(function(req,res,next) {
  //Check if user is authenticated before doing anything else
  if (!req.user) return res.send({error: "Authentication needed"});
  //continue as normal if no authentication needed
  next();
});

router.param('pagenum',function(req,res,next,pagenum) {
  //Check if pagenumber is valid
  var n=Number(pagenum);
  if (isNaN(n) || n<0) return res.send({error: 'Invalid pagenum'});
  req.pagenum=pagenum;
  next();
});

//This will give latest updates first
router.get('/latest/:pagenum', function(req,res) {
  var pagenum=req.pagenum;
  Changeset.query().select('id','uuid','properties','operation','operation_at',
  'editor_name').orderBy('id','desc').limit(max_rows).offset(max_rows*(pagenum-1)).then(function (resp) {
    res.send({data: resp});
  });
  
});

//This will give latest updates first
router.get('/priority/:pagenum', function(req,res) {
  var pagenum=req.pagenum;
  Changeset.query().select('id','uuid','properties','operation','operation_at',
  'editor_name').orderBy('priority','desc').limit(max_rows).offset(max_rows*(pagenum-1)).then(function (resp) {
    res.send({data: resp});
  });
/*  knex.raw('select id,uuid,properties,operation,operation_at,editor_name,priority from changesets2 inner join (select id from changesets2 order by priority desc limit 1 offset '+pagenum+') as my_results USING(id)')
  .then(function(resp) {
    res.send({data: resp});
  }); */
});

module.exports = router;