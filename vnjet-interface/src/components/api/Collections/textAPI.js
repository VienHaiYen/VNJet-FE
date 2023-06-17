import axiosClient from "../axios/axiosClient";
import refreshAPI from "./refreshAPI";

const testAPI = {
  getData: async () => {
    await refreshAPI.refreshAllToken();
    let url = "/test";
    return axiosClient.get(url);
  },
};

export default testAPI;
