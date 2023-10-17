import axios from "axios";

const API_BASE_URL = "http://localhost:5011/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const get = {
  Category: () => {
    return api.get("/Category/GetAll").then((response) => response.data);
  },

  softwareID: (id) => {
    return api.get(`/software/${id}`).then((response) => response.data);
  },

  GettAllInfos: () => {
    return api.get("/Software/GetAllInfos/").then((response) => response.data);
  },

  GetAllWithFunctions: () => {
    return api
      .get("/Category/GetAllWithFunctions")
      .then((response) => response.data);
  },

  CatFuncConnect: () => {
    return api.get("/CatFuncConnect/GetAll").then((response) => response.data);
  },

  Company: () => {
    return api.get("/Company/GetAll").then((response) => response.data);
  },

  Remuneration: () => {
    return api.get("/Remuneration/GetAll").then((response) => response.data);
  },

  SoftwareAll: () => {
    return api.get("Software/GetAll").then((response) => response.data);
  },

  SoftwareCompConnect: () => {
    return api
      .get("/SoftwareCompConnect/GetAll")
      .then((response) => response.data);
  },

  SoftwareFunctions: () => {
    return api
      .get("/SoftwareFunctions/GetAll")
      .then((response) => response.data);
  },

  SoftwareLangConnect: () => {
    return api
      .get("SoftwareLangConnect/GetAll")
      .then((response) => response.data);
  },

  SoftwareModulConnect: () => {
    return api
      .get("SoftwareModulConnect/GetAll")
      .then((response) => response.data);
  },

  SoftwareOSConnect: () => {
    return api
      .get("/SoftwareOSConnect/GetAll")
      .then((response) => response.data);
  },

  Support: () => {
    return api.get("/Support/GetAll").then((response) => response.data);
  },
};

const post = {
  RegisterData: (data) => {
    return api.post("/Auth/register", data).then((response) => response.data);

    /* 
      {
        "lastname": "string",
        "firstname": "string",
        "email": "user@example.com",
        "password": "string",
        "country": "string",
        "settlement": "string"
      }
    */
  },

  LoginData: (data) => {
    // Login endpoint
    return api.post("/Auth/login", data).then((response) => {
      const token = response.data.token;
      const user = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", (user.lastName + " " + user.firstName));
      return token, user;
    });
  },

  Logout: () => {
    // Clear the authentication token from local storage
    localStorage.removeItem("token");
  },

  /*
      {
        "email": "string",
        "password": "string"
      }
    */

  RatingData: (data) => {
    return api.post("/Rating", data).then((response) => response.data);

    /*
      {
        "userID": 0,
        "softwareID": 0,
        "all_star": 0,
        "simplicity": 0,
        "service": 0,
        "characteristic": 0,
        "price_value": 0,
        "recommendation": 0,
        "all_text": "string",
        "positive": "string",
        "negative": "string",
        "reason_of_use": "string",
        "duration_of_use": "string"
      }
    */
  },
};

export { get, post };
