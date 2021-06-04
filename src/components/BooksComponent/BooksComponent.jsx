import React, { useEffect, useState } from 'react'
import BooksSrv from '../../services/BooksSrv';
import LoadingBox from '../LoadingBox/LoadingBox';
import { Link } from 'react-router-dom';
import './BooksComponent.css';

export default function BooksComponent() {


  const [books, setBooks] = useState([]);

  const openCreateBookModal = () => {

  }


  useEffect(() => {

    const getBooks = async () => {
      const { data: { books } } = await BooksSrv.getBooks();
      setBooks(books || []);
    }

    getBooks();
  }, [])

  return (
    <div className="fm-p-3">
      <div className="create-book-cta fm-abs fm-right">
        <Link to={openCreateBookModal}>
          <button type="button" class="btn btn-success">Create book</button>
        </Link>
      </div>
      <div className="title-container text-center fm-my-4">
        <h1>
          Welcome to the <br /> Soamee Public Library!
        </h1>
      </div>
      <div className="books-list-container col-md-4 offset-4 text-center">
        {!books.length ? (
          <LoadingBox></LoadingBox>
        ) : (
          <table className="table table-striped fm-m-0">
            <thead>
              <tr>
                <th scope="col">Books available</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book._id}>
                  <Link className="fm-df fm-jucc link-clean" to={`/book/${book._id}`} >
                    <th>{book.name}</th>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
