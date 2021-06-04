import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import booksRouter from './routers/booksRouter.js';
import authorsRouter from './routers/authorsRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/authors', authorsRouter);
app.use('/api/books', booksRouter);


mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/soamee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});


app.get('/', (req, res) => {
  res.send('Server is ready!');
});

app.use((error, req, res, next) => {
  res.status(500).send({ message: error.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
