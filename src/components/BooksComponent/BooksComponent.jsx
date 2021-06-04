import React, { useEffect, useState } from 'react'
import BooksSrv from '../../services/BooksSrv';
import LoadingBox from '../LoadingBox/LoadingBox';
import { Link } from 'react-router-dom';
import './BooksComponent.css';
import AuthorsSrv from '../../services/AuthorsSrv';

export default function BooksComponent() {


  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {

    const getBooks = async () => {
      const { data: { books } } = await BooksSrv.getBooks();
      setBooks(books || []);
    }

    const getAuthors = async () => {
      const {data: { authors } } = await AuthorsSrv.getAuthors();
      setAuthors(authors || []);
    }

    getBooks();
    getAuthors();
  }, [])

  return (
    <div>
      <div className="create-book-cta fm-abs fm-right">
        <Link to={`/author/new`} className="fm-mr-2">
          <button type="button" className="btn btn-success">Create author</button>
        </Link>
        <Link to={`/book/new`}>
          <button type="button" className="btn btn-success">Create book</button>
        </Link>
      </div>
      <div className="title-container text-center fm-py-4">
        <h1>
          Welcome to the <br /> Soamee Public Library!
        </h1>
      </div>
      <div className="books-list-container col-md-8 offset-2 text-center">
        {!books.length ? (
          <LoadingBox></LoadingBox>
        ) : (
          <div className="main-container fm-df fm-alist fm-juce">
            <div className="table-container">
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
            </div>
            <div className="table-container">
              <table className="table table-striped fm-m-0">
                <thead>
                  <tr>
                    <th scope="col">Authors</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.map(author => (
                    <tr key={author._id}>
                      <th>
                        <Link className="link-clean" to={`/author/${author._id}`} >
                          {author.first_name} {author.last_name}
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
