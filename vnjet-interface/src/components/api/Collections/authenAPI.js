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
