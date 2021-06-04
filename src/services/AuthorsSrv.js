import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const AuthorsSrv = {
  getAuthors: async () => {
    const res = await axios({
      method: 'get',
      url: `${API_URL}/authors`,
    });
    return res;
  },
  getAuthor: async id => {
    const res = await axios({
      method: 'get',
      url: `${API_URL}/authors/${id}`,
    });
    return res;
  },
  upsertAuthor: async author => {
    if (!author._id) return await AuthorsSrv.createAuthor(author);
    const res = await axios({
      method: 'PUT',
      url: `${API_URL}/authors/${author._id}`,
      data: {
        author,
      },
    });
    return res;
  },
  createAuthor: async author => {
    const res = await axios({
      method: 'POST',
      url: `${API_URL}/authors`,
      data: {
        author,
      },
    });
    return res;
  },
  deleteAuthor: async id => {
    const res = await axios({
      method: 'DELETE',
      url: `${API_URL}/authors/${id}`,
    });
    return res;
  }
}


export default AuthorsSrv;
