import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  timeout: 20000,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params),
    // indexes: false
  },
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  config.headers = {
    token: localStorage.getItem("accessToken"),
    refreshtoken: localStorage.getItem("refreshToken"),
  };
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    console.log(error);
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { error: error.message };
    // throw error.response.data;
  }
);

export default axiosClient;
