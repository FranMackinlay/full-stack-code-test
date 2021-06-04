import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthorsSrv from '../../services/AuthorsSrv';
import './CreateAuthorComponent.css';

const CreateAuthorComponent = props => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const onChangeInput = e => {
    switch (e.target.name) {
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      default:
        break;
    }
  }


  const onSubmit = async e => {
    e?.preventDefault();
    const newAuthor = {
      first_name: firstName,
      last_name: lastName,
    };

    const {data} = await AuthorsSrv.upsertAuthor(newAuthor);

    if (data.success) {
      alert('Success!');
      props.history.push('/');
    } else {
      alert(data);
    }
  }

  return (
    <div>
      <div className="go-back fm-abs">
        <Link to={`/`}>
          <button type="button" className="btn btn-info">Go Back</button>
        </Link>
      </div>
      <h3 className="text-center fm-py-4">
        Create new author
      </h3>
      <form className="create-author-form col-md-4 m-auto text-center" action="" onSubmit={onSubmit}>
        <div className="author-name-container fm-df fm-juce fm-mb-4 fm-w100" onChange={onChangeInput}>
          <label className="col-md-5" htmlFor="firstName">First name:</label>
          <input type="text" className="col-md-5 offset-1" name="firstName" id="firstName" />
        </div>
        <div className="author-isbn-container fm-df fm-juce fm-mb-4 fm-w100" onChange={onChangeInput}>
          <label className="col-md-5" htmlFor="lastName">Last name:</label>
          <input type="text" className="col-md-5 offset-1" name="lastName" id="lastName" />
        </div>
        <button className="btn btn-success" type="submit">Save author</button>
      </form>
    </div>
  );
}

export default CreateAuthorComponent;
