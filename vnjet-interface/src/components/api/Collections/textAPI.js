import axiosClient from "../axios/axiosClient";

const testAPI = {
  getData: () => {
    let url = "/test";
    return axiosClient.get(url);
  },
};

export default testAPI;
