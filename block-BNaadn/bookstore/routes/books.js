var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var Author = require('../models/author');

router.get('/new', (req, res) => {
  res.render('bookForm');
});

router.post('/', (req, res, next) => {
  Book.create(req.body, (err, book) => {
    console.log(req.body);
    if (err) return next(err);
    res.redirect('/books');
  });
});

//find all book

router.get('/', (req, res) => {
  Book.find({}, (err, book) => {
    if (err) return next(err);
    res.render('allBooks', { books: book });
  });
});

//sigle book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return next(err);
    res.render('singleBook', { books: book });
  });
});

//update

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return next(err);
    res.render('updateBook', { books: book });
  });
});

router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, book) => {
    if (err) return next(err);
    res.redirect('/books/' + id);
  });
});

router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err, book) => {
    if (err) return next(err);
    res.redirect('/books');
  });
});

module.exports = router;