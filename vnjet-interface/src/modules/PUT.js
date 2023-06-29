import axiosClient from "../components/api/axios/axiosClient";
const editAirport = async (id, name) => {
  await axiosClient
    .put(`/airport/${id}`, {
      name: name,
    })
    .then((res) => {
      if (res.error) alert(res.error);
    });
};

const PUT = {
  editAirport,
};

export default PUT;
