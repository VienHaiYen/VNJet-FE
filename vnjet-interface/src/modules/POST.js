import axiosClient from "../components/api/axios/axiosClient";

const postAirport = async (name) => {
  await axiosClient
    .post("/airport/", {
      name: name,
    })
    .then((res) => {
      if (res.error) alert(res.error);
    });
};
const POST = {
  postAirport,
};

export default POST;
