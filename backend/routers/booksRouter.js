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
  const _id = req.params.bookId;

  const book = await Book.findById(_id).populate('author', Author);

  res.send({ book });
}));

/* Post new book */
router.post('/', expressAsyncHandler(async (req, res) => {

  const { book } = req.body;

  try {
    const createdBook = await Book.create(book);

    res.send({ createdBook, success: !!createdBook._id });
  } catch (error) {
    res.send(error.message);
  }

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
