var express = require('express');
var router = express.Router();

/* GET Books */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});

/* GET book by _id */
router.get('/:bookId', function (req, res, next) {

  res.render('index', { title: 'Express' });
});

/* Post new book */
router.post('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});

/* PUT update book by _id */
router.put('/:bookId', function (req, res, next) {

  res.render('index', { title: 'Express' });
});

/* DELETE book by _id. */
router.delete('/:bookId', function (req, res, next) {

  res.render('index', { title: 'Express' });
});



module.exports = router;
