import axiosClient from "../axios/axiosClient";
import refreshAPI from "./refreshAPI";

const authenAPI = {
  postUserInfo: async (params) => {
    await refreshAPI.refreshAllToken();
    let url = "/user/userinfo";
    return axiosClient.post(url, {
      email: params.email,
    });
  },
  postLogin: (params) => {
    let url = "/auth/login";
    return axiosClient.post(url, {
      email: params.email,
      password: params.password,
    });
  },
  postLogout: () => {
    let url = "/auth/logout";
    return axiosClient.post(url);
  },
  postRegister: (params) => {
    let url = "/auth/register";
    console.log({
      email: params.email,
      password: params.password,
      phone: params.phone,
      fullname: params.fullname,
      role: params.role,
      identificationCode: params.identificationCode,
    });
    return axiosClient.post(url, {
      email: params.email,
      password: params.password,
      phone: params.phone,
      fullname: params.fullname,
      role: params.role,
      identificationCode: params.identificationCode,
    });
  },
};

export default authenAPI;
