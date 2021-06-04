import React, { useEffect, useState } from 'react';
import AuthorsSrv from '../../services/AuthorsSrv';
import './CreateBookComponent.css';

const CreateBookComponent = () => {

  const [name, setName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [authors, setAuthors] = useState([]);


  useEffect(() => {

    const getAuthors = async () => {
      const { data: { authors } } = await AuthorsSrv.getAuthors();

      if (authors.length) setAuthors(authors);
    }

    getAuthors();
  }, [])



  const onChangeInput = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'isbn':
        setIsbn(e.target.value);
        break;
      default:
        break;
    }
  }


  const onSubmit = async e => {
    e?.preventDefault();

  }

  return (
    <div>
      <h3 className="text-center">
        Create new book
      </h3>
      <form className="create-book-form col-md-4 m-auto text-center" action="" onSubmit={onSubmit}>
        <div className="book-name-container fm-df fm-juce fm-mb-4 fm-w100" onChange={onChangeInput}>
          <label htmlFor="name">Book name:</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="book-isbn-container fm-df fm-juce fm-mb-4 fm-w100" onChange={onChangeInput}>
          <label htmlFor="isbn">Book ISBN:</label>
          <input type="text " name="isbn" id="isbn" />
        </div>
        <button className="btn btn-success" type="submit">Save book</button>
      </form>
    </div>
  );
}

export default CreateBookComponent;
