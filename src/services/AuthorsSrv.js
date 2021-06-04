import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const AuthorsSrv = {
  getAuthors: async () => {
    const res = await axios({
      method: 'get',
      url: `${API_URL}/authors`,
    });
    return res;
  }
}


export default AuthorsSrv;
