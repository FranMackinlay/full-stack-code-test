import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const BooksSrv = {
  getBooks: async () => {
    const res = await axios({
      method: 'get',
      url: `${API_URL}/books`,
    });
    return res;
  }
}


export default BooksSrv;
