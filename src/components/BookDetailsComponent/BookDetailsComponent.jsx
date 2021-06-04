import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthorsSrv from '../../services/AuthorsSrv';
import BooksSrv from '../../services/BooksSrv';
import LoadingBox from '../LoadingBox/LoadingBox';
import './BookDetailsComponent.css';

const BookDetailsComponent = props => {

  const [book, setBook] = useState({});
  const [authors, setAuthors] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [authorId, setAuthorId] = useState('');


  const toggleEditMode = async e => {
    e?.preventDefault();

    if (!authors.length) {
      const { data: { authors } } = await AuthorsSrv.getAuthors();

      if (authors.length) setAuthors(authors);
    }


    setEditMode(!editMode);
  }


  const onChangeInput = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'isbn':
        setIsbn(e.target.value);
        break;
      case 'author':
        setAuthorId(e.target.value);
        break;
      default:
        break;
    }
  }

  const onClickDeleteBook = async e => {
    e?.preventDefault();
    const {data} = await BooksSrv.deleteBook(book._id);
    debugger;
    if (data.success) {
      alert('Book deleted successfully');
      props.history.push('/');
    } else {
      alert('We couldn\'t delete the book, try again later!');
    }
  }

  const onClickSaveBook = async e => {
    e?.preventDefault();
    const newBook = {
      _id: book._id,
      name: name || book.name,
      isbn: isbn || book.isbn,
      author: authorId || book.author._id
    };

    const {data} = await BooksSrv.upsertBook(newBook);


    if (data.success) {
      alert('Success!');
      setBook(data.upsertedBook);
      toggleEditMode();
    } else {
      alert(data);
    }
  }

  useEffect(() => {
    const getBook = async id => {
      const {data: {book}} = await BooksSrv.getBook(id);

      if (book?._id) {
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
          <button type="button" className="btn btn-info">Go Back</button>
        </Link>
      </div>
      <div className="create-book-cta fm-abs fm-right">
        <button type="button" className={`btn btn-${editMode ? 'warning' : 'primary'}`} onClick={toggleEditMode}>{editMode ? 'Cancel changes' : 'Edit Book'}</button>
      </div>
      {!book._id ? (
        <LoadingBox></LoadingBox>
      ) : (
        <div className="book-details-container px-5 col-md-4 m-auto fm-p-3 fm-df fm-fldc fm-jucb">
          <h3 className="text-center fm-my-2">
            {editMode ? 'Edit Book' : 'Book details'}
          </h3>
          <div className="book-name-container fm-df fm-jucb fm-aliic fm-my-3 fm-w100">
              <label className="col-md-5" htmlFor="name">Book name:</label>
              {editMode ? (
                <input type="text" name="name" id="name" value={name || book.name} onChange={onChangeInput}/>
              ) : (
                <p className="fm-m-0">{book.name}</p>
              )}
            </div>
            <div className="book-isbn-container fm-df fm-jucb fm-aliic fm-my-3 fm-w100">
              <label className="col-md-5" htmlFor="isbn">Book ISBN:</label>
              {editMode ? (
                <input type="text" name="isbn" id="isbn" value={isbn || book.isbn} onChange={onChangeInput}/>
              ) : (
                <p className="fm-m-0">{book.isbn}</p>
              )}
            </div>
            <div className="book-author-container fm-df fm-jucb fm-aliic fm-my-3 fm-w100">
              <label className="col-md-5" htmlFor="isbn">Book author:</label>
              {editMode ? (
                <select name="author" id="author" defaultValue="default" onChange={onChangeInput}>
                  <option value="default" selected>Choose author</option>
                  {
                    authors?.map(author => (
                      <option key={author._id} value={author._id}>{`${author.first_name} ${author.last_name}`}</option>
                    ))
                  }
                </select>
              ) : (
                <p className="fm-m-0">{`${book.author?.first_name} ${book.author?.last_name}`}</p>
              )}
            </div>
            {editMode && (
              <div className="details-tas fm-df fm-juce fm-aliic">
                <button type="button" className="btn btn-danger m-auto" onClick={onClickDeleteBook}>Delete book</button>
                <button type="button" className="btn btn-success m-auto" onClick={onClickSaveBook}>Save changes</button>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export default BookDetailsComponent;
