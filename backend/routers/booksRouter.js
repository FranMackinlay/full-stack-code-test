import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Book from '../models/BooksSchema.js';
import Author from '../models/AuthorSchema.js';


const router = express.Router();

/* GET Books */
router.get('/', expressAsyncHandler(async (req, res) => {
  const books = await Book.find()
  res.send({ books });
}));

/* GET book by _id */
router.get('/:bookId', function (req, res) {

  res.send('index', { title: 'Express' });
});

/* Post new book */
router.post('/', function (req, res) {

  res.send('index', { title: 'Express' });
});

/* PUT update book by _id */
router.put('/:bookId', function (req, res) {

  res.send('index', { title: 'Express' });
});

/* DELETE book by _id. */
router.delete('/:bookId', function (req, res, next) {

  res.render('index', { title: 'Express' });
});



export default router;
