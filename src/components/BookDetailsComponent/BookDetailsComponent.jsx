import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BooksSrv from '../../services/BooksSrv';
import './BookDetailsComponent.css';

const BookDetailsComponent = props => {

  const [book, setBook] = useState({});



  useEffect(() => {
    const getBook = async id => {
      const {data: {book}} = await BooksSrv.getBook(id);

      if (book._id) {
        setBook(book);
      } else {
        alert('We couldn\'t find the book you were looking for, try again later!');
        props.history.push('/');
      }
    }

    getBook(props.match.params.bookId);
  }, [props.history, props.match.params.bookId]);


  return (
    <div>
      <div className="create-book-cta fm-abs">
        <Link to={`/`}>
          <button type="button" className="btn btn-success">Go Back</button>
        </Link>
      </div>
      <div className="book-details-container px-5 col-md-4 m-auto fm-p-3 fm-df fm-fldc fm-jucb">
        <h3 className="text-center fm-my-2">
          Book details
        </h3>
        <div className="book-name-container fm-df fm-jucb fm-aliic fm-my-3 fm-w100">
            <label className="col-md-5" htmlFor="name">Book name:</label>
            <p className="fm-m-0">{book.name}</p>
          </div>
          <div className="book-isbn-container fm-df fm-jucb fm-aliic fm-my-3 fm-w100">
            <label className="col-md-5" htmlFor="isbn">Book ISBN:</label>
            <p className="fm-m-0">{book.isbn}</p>
          </div>
          <div className="book-author-container fm-df fm-jucb fm-aliic fm-my-3 fm-w100">
            <label className="col-md-5" htmlFor="isbn">Book author:</label>
            <p className="fm-m-0">{`${book.author?.first_name} ${book.author?.last_name}`}</p>
          </div>
      </div>
    </div>
  );
}

export default BookDetailsComponent;
