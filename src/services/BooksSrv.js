import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const BooksSrv = {
  getBooks: async () => {
    const res = await axios({
      method: 'get',
      url: `${API_URL}/books`,
    });
    return res;
  },
  upsertBook: async book => {
    if (!book._id) return await BooksSrv.createBook(book);
    const res = await axios({
      method: 'put',
      url: `${API_URL}/books/${book._id}`,
      body: {
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
  }
}


export default BooksSrv;
