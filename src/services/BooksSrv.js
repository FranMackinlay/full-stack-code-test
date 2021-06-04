import axios from 'axios';

const API_URL = '/api';

const BooksSrv = {
  getBooks: async () => {
    const res = await axios({
      method: 'get',
      url: `${API_URL}/books`,
    });
    return res;
  },
  getBook: async bookId => {
    const res = await axios({
      method: 'GET',
      url: `${API_URL}/books/${bookId}`,
    });
    return res;
  },
  upsertBook: async book => {
    if (!book._id) return await BooksSrv.createBook(book);
    const res = await axios({
      method: 'PUT',
      url: `${API_URL}/books/${book._id}`,
      data: {
        book,
      },
    });
    return res;
  },
  createBook: async book => {
    const res = await axios({
      method: 'POST',
      url: `${API_URL}/books`,
      data: {
        book,
      },
    });
    return res;
  },
  deleteBook: async id => {
    const res = await axios({
      method: 'DELETE',
      url: `${API_URL}/books/${id}`,
    });
    return res;
  }
}


export default BooksSrv;
