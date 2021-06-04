import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Author from '../models/AuthorSchema.js';


const router = express.Router();

/* GET Books */
router.get('/', expressAsyncHandler(async (req, res) => {
  const authors = await Author.find()
  res.send({ authors });
}));

/* GET author by _id */
router.get('/:authorId', expressAsyncHandler(async (req, res) => {
  const _id = req.params.authorId;

  const book = await Author.findById(_id);

  res.send({ book });
}));

/* Post new author */
router.post('/', expressAsyncHandler(async (req, res) => {

  // res.send({ books });
}));

/* PUT update author by _id */
router.put('/:authorId', expressAsyncHandler(async (req, res) => {

  // res.send({ books });
}));

/* DELETE author by _id. */
router.delete('/:bookId', expressAsyncHandler(async (req, res) => {

  // res.send({ books });
}));



export default router;
