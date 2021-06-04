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
router.get('/:bookId', expressAsyncHandler(async (req, res) => {
  const books = await Book.find()
  res.send({ books });
}));

/* Post new book */
router.post('/', expressAsyncHandler(async (req, res) => {

  // res.send({ books });
}));

/* PUT update book by _id */
router.put('/:bookId', expressAsyncHandler(async (req, res) => {

  // res.send({ books });
}));

/* DELETE book by _id. */
router.delete('/:bookId', expressAsyncHandler(async (req, res) => {

  // res.send({ books });
}));



export default router;
