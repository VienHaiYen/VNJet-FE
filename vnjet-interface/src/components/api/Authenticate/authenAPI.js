import axiosClient from "../axios/axiosClient";

const authenAPI = {
  postLogin: (params) => {
    console.log("called");
    let url = "/auth/login";
    return axiosClient.post(url, {
      email: params.email,
      password: params.password,
    });
  },
};

export default authenAPI;
