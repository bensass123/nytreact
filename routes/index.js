var express = require('express');
var router = express.Router();
var Article = require('../models/Article.js');

// api saved get - returns all saved
router.get('/api/saved', function(req, res, next) {
  Article.find({}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// api saved post - adds article to db

router.post('/api/saved', function(req, res, next) {
  // console.log(req.body);
  var obj= req.body;

  console.log(obj);

  Article.update({title: req.body.title}, obj, {upsert: true}, (err, doc) => {
            if (err) {console.log(err);}
            else {console.log(doc);}
        })
});

//delete method

router.delete('/api/saved', function(req, res, next) {
  // console.log(req.body);
  var obj= req.body;

  console.log(obj);

  Article.remove({title: req.body.title}, (err, doc) => {
            if (err) {console.log(err);}
            else {console.log(doc);}
        })
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
