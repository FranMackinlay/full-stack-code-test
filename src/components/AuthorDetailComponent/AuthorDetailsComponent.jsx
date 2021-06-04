import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthorsSrv from '../../services/AuthorsSrv';
import BooksSrv from '../../services/BooksSrv';
import LoadingBox from '../LoadingBox/LoadingBox';
import './AuthorDetailsComponent.css';

const AuthorDetailsComponent = props => {

  const [author, setAuthor] = useState({});
  const [editMode, setEditMode] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const toggleEditMode = async e => {
    e?.preventDefault();
    setEditMode(!editMode);
  }


  const onChangeInput = e => {
    switch (e.target.name) {
      case 'fistName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      default:
        break;
    }
  }

  const onClickDeleteAuthor = async e => {
    e?.preventDefault();
    const {data} = await AuthorsSrv.deleteAuthor(author._id);
    debugger;
    if (data.success) {
      alert('Author deleted successfully');
      props.history.push('/');
    } else {
      alert('We couldn\'t delete the author, try again later!');
    }
  }

  const onClickSaveAuthor = async e => {
    e?.preventDefault();
    const newAuthor = {
      _id: author._id || '',
      first_name: firstName || author.first_name,
      last_name: lastName || author.last_name,
    };

    const {data} = await BooksSrv.upsertBook(newAuthor);


    if (data.success) {
      alert('Success!');
      setAuthor(data.upsertedAuthor);
      toggleEditMode();
    } else {
      alert(data);
    }
  }

  useEffect(() => {
    const getAuthor = async id => {
      const {data: {author}} = await AuthorsSrv.getAuthor(id);

      if (author?._id) {
        setAuthor(author);
      } else {
        alert('We couldn\'t find the author you were looking for, try again later!');
        props.history.push('/');
      }
    }

    getAuthor(props.match.params.authorId);
  }, [props.history, props.match.params.authorId]);


  return (
    <div>
      <div className="go-back fm-abs">
        <Link to={`/`}>
          <button type="button" className="btn btn-info">Go Back</button>
        </Link>
      </div>
      <div className="edit-author-cta fm-abs fm-right">
        <button type="button" className={`btn btn-${editMode ? 'warning' : 'primary'}`} onClick={toggleEditMode}>{editMode ? 'Cancel changes' : 'Edit Author'}</button>
      </div>
      {!author._id ? (
        <LoadingBox></LoadingBox>
      ) : (
        <div className="author-details-container px-5 col-md-4 m-auto fm-p-3 fm-df fm-fldc fm-jucb">
          <h3 className="text-center fm-my-2">
            {editMode ? 'Edit Author' : 'Author details'}
          </h3>
          <div className="author-name-container fm-df fm-jucb fm-aliic fm-my-3 fm-w100">
              <label className="col-md-5" htmlFor="name">First name:</label>
              {editMode ? (
                <input type="text" name="fistName" id="fistName" value={firstName || author.firstName} onChange={onChangeInput}/>
              ) : (
                <p className="fm-m-0">{author.first_name}</p>
              )}
            </div>
            <div className="author-isbn-container fm-df fm-jucb fm-aliic fm-my-3 fm-w100">
              <label className="col-md-5" htmlFor="isbn">Last name:</label>
              {editMode ? (
                <input type="text" name="lastName" id="lastName" value={lastName || author.last_name} onChange={onChangeInput}/>
              ) : (
                <p className="fm-m-0">{author.last_name}</p>
              )}
            </div>
            {editMode && (
              <div className="details-tas fm-df fm-juce fm-aliic">
                <button type="button" className="btn btn-danger m-auto" onClick={onClickDeleteAuthor}>Delete author</button>
                <button type="button" className="btn btn-success m-auto" onClick={onClickSaveAuthor}>Save changes</button>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export default AuthorDetailsComponent;
