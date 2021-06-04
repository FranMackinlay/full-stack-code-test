import React, { useEffect, useState } from 'react'
import BooksSrv from '../../services/BooksSrv';
import LoadingBox from '../LoadingBox/LoadingBox';
import { Link } from 'react-router-dom';
import './BooksComponent.css';

export default function BooksComponent() {


  const [books, setBooks] = useState([]);

  useEffect(() => {

    const getBooks = async () => {
      const { data: { books } } = await BooksSrv.getBooks();
      setBooks(books || []);
    }

    getBooks();
  }, [])

  return (
    <div>
      <div className="create-book-cta fm-abs fm-right">
        <Link to={`/book/new`}>
          <button type="button" className="btn btn-success">Create book</button>
        </Link>
      </div>
      <div className="title-container text-center fm-py-4">
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
                  <th>
                    <Link className="link-clean" to={`/book/${book._id}`} >
                      {book.name}
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
