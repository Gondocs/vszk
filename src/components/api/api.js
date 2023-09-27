
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5011/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});


const get = {
    Category: () => {
    return api.get('/Category/GetAll').then((response) => response.data);
  },
  software: (id) => {
    // Assuming 'id' is an integer
    return api.get(`/software/${id}`).then((response) => response.data);
  },
};

const post = {
  registerData: (data) => {
    return api.post('/register', data).then((response) => response.data);
  },
};

export { get, post };
