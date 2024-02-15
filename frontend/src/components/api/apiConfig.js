import axios from "axios";

const API_BASE_URL = "http://localhost:5011/api";

const apiConfig = axios.create({
  baseURL: API_BASE_URL,
});

export default apiConfig;
