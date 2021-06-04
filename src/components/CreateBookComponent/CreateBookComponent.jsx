import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthorsSrv from '../../services/AuthorsSrv';
import BooksSrv from '../../services/BooksSrv';
import './CreateBookComponent.css';

const CreateBookComponent = props => {

  const [name, setName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authors, setAuthors] = useState([]);


  useEffect(() => {

    const getAuthors = async () => {
      const { data: { authors } } = await AuthorsSrv.getAuthors();

      if (authors.length) setAuthors(authors);
    }

    getAuthors();
  }, []);

  const onChangeInput = e => {
    console.log(`e.target.name`, e.target.name);
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


  const onSubmit = async e => {
    e?.preventDefault();
    const newBook = {
      name,
      isbn,
      author: authorId
    };

    const {data} = await BooksSrv.upsertBook(newBook);

    if (data.success) {
      alert('Success!');
      props.history.push('/books');
    } else {
      alert(data);
    }
  }

  return (
    <div>
      <div className="go-back fm-abs">
        <Link to={`/`}>
          <button type="button" className="btn btn-success">Go Back</button>
        </Link>
      </div>
      <h3 className="text-center fm-py-4">
        Create new book
      </h3>
      <form className="create-book-form col-md-4 m-auto text-center" action="" onSubmit={onSubmit}>
        <div className="book-name-container fm-df fm-juce fm-mb-4 fm-w100" onChange={onChangeInput}>
          <label className="col-md-5" htmlFor="name">Book name:</label>
          <input type="text" className="col-md-5 offset-1" name="name" id="name" />
        </div>
        <div className="book-isbn-container fm-df fm-juce fm-mb-4 fm-w100" onChange={onChangeInput}>
          <label className="col-md-5" htmlFor="isbn">Book ISBN:</label>
          <input type="text" className="col-md-5 offset-1" name="isbn" id="isbn" />
        </div>
        <div className="book-authors-container fm-df fm-juce fm-mb-4 fm-w100">
          <label  className="col-md-5" htmlFor="author">Author:</label>
          <select className="col-md-5 offset-1" name="author" id="author" defaultValue="default" onChange={onChangeInput}>
            <option value="default" disabled>Choose author</option>
            {
              authors?.map(author => (
                <option key={author._id} value={author._id}>{`${author.first_name} ${author.last_name}`}</option>
              ))
            }
          </select>
        </div>
        <button className="btn btn-success" type="submit">Save book</button>
      </form>
    </div>
  );
}

export default CreateBookComponent;
