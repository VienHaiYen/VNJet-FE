import axiosClient from "../axios/axiosClient";

const authenAPI = {
  postLogin: (params) => {
    let url = "/auth/login";
    return axiosClient.post(url, {
      email: params.email,
      password: params.password,
    });
  },
  postLogout: () => {
    console.log("called");
    let url = "/auth/logout";
    return axiosClient.post(url);
  },
};

export default authenAPI;
