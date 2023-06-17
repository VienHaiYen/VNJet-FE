import axiosClient from "../axios/axiosClient";

const refreshAPI = {
  refreshAllToken: async () => {
    let url = "/auth/refresh";
    const resp = await axiosClient.get(url);
    if (resp.accessToken) {
      localStorage.setItem("accessToken", resp.accessToken);
    }
  },
};

export default refreshAPI;
