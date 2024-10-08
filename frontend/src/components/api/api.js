import apiConfig from "./apiConfig";

const get = {
  Category: () => {
    return apiConfig.get("/Category/GetAll").then((response) => response.data);
  },

  softwareById: (id) => {
    return apiConfig.get(`/software/${id}`).then((response) => response.data);
  },

  GettAllInfos: () => {
    return apiConfig
      .get("/Software/GetAllInfos/")
      .then((response) => response.data);
  },

  GetAllWithFunctions: () => {
    return apiConfig
      .get("/Category/GetAllWithFunctions")
      .then((response) => response.data);
  },

  CatFuncConnect: () => {
    return apiConfig
      .get("/CatFuncConnect/GetAll")
      .then((response) => response.data);
  },

  Company: () => {
    return apiConfig.get("/Company/GetAll").then((response) => response.data);
  },

  Remuneration: () => {
    return apiConfig
      .get("/Remuneration/GetAll")
      .then((response) => response.data);
  },

  SoftwareAll: () => {
    return apiConfig.get("Software/GetAll").then((response) => response.data);
  },

  SoftwareCompConnect: () => {
    return apiConfig
      .get("/SoftwareCompConnect/GetAll")
      .then((response) => response.data);
  },

  SoftwareFunctions: () => {
    return apiConfig
      .get("/SoftwareFunctions/GetAll")
      .then((response) => response.data);
  },

  SoftwareLangConnect: () => {
    return apiConfig
      .get("SoftwareLangConnect/GetAll")
      .then((response) => response.data);
  },

  SoftwareModulConnect: () => {
    return apiConfig
      .get("SoftwareModulConnect/GetAll")
      .then((response) => response.data);
  },

  SoftwareOSConnect: () => {
    return apiConfig
      .get("/SoftwareOSConnect/GetAll")
      .then((response) => response.data);
  },

  Support: () => {
    return apiConfig.get("/Support/GetAll").then((response) => response.data);
  },

  GetUserFavoriteSoftware: (id) => {
    return apiConfig
      .get(`/Software/GetUserFavoriteSoftware`, {
        params: {
          id: id,
        },
      })
      .then((response) => response.data);
  },

  IsUserFavoriteSoftwareById: (userId, softwareId) => {
    return apiConfig
      .get(`/Software/IsUserFavoriteSoftwareById`, {
        params: {
          userId: userId,
          softwareId: softwareId,
        },
      })
      .then((response) => response.data);
  },

  RecommendedSoftwares: () => {
    return apiConfig
      .get("/Software/RecommendedSoftwares")
      .then((response) => response.data);
  },

  GetUserDataById: (userId) => {
    return apiConfig
      .get("/User/GetById", { params: { id: userId } })
      .then((response) => response.data);
  },

  GetUserDataByEmail: (email) => {
    return apiConfig
      .get("/User/GetUserDataByEmail", { params: { email: email } })
      .then((response) => response.data);
  },

  GetAllUsers: () => {
    return apiConfig.get("/User/GetAll").then((response) => response.data);
  },

  GetAllModuls: () => {
    return apiConfig
      .get("/SoftwareModulConnect/GetAll")
      .then((response) => response.data);
  },

  GetAllLevels: () => {
    return apiConfig
      .get("/Remuneration/GetAllLevels")
      .then((response) => response.data);
  },

  GetAllTypes: () => {
    return apiConfig
      .get("/Remuneration/GetAllTypes")
      .then((response) => response.data);
  },

  GetRatingByUserId: (userId, softwareId) => {
      return apiConfig
        .get(`/Rating/GetRatingByUserIdAndSoftwareId/${userId}/${softwareId}`)
        .then((response) => response.data);
    },

};

const post = {
  RegisterData: (data) => {
    return apiConfig
      .post("/Auth/register", data)
      .then((response) => response.data);

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
    return apiConfig.post("/Auth/login", data).then((response) => {
      const token = response.data;
      return { token };
    });
  },

  /*
      {
        "email": "string",
        "password": "string"
      }
    */

  RatingData: (data) => {
    return apiConfig.post("/Rating", data).then((response) => response.data);

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

  AddUserFavoriteSoftware: (data) => {
    return apiConfig
      .post("/Software/AddUserFavoriteSoftware", data)
      .then((response) => response.data);
  },

  ChangePassword: (data) => {
    return apiConfig
      .post("/Auth/changepassword", data)
      .then((response) => response.data);
  },
};

const put = {
  UpdateUserData: (data) => {
    return apiConfig
      .put("/User/UpdateUserData", data)
      .then((response) => response.data);
  },

  UpdateUserDataAdmin: (data) => {
    return apiConfig
      .put("/User/UpdateUserDataAdmin", data)
      .then((response) => response.data);
  },
};

const del = {
  RemoveUserFavoriteSoftware: (data) => {
    return apiConfig
      .delete("/Software/RemoveUserFavoriteSoftware", { data })
      .then((response) => response.data);
  },

  DeleteUser: (id) => {
    return apiConfig
      .delete("/User/DeleteUser", { params: { id } })
      .then((response) => response.data);
  },
};

export { get, post, put, del };
