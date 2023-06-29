import axiosClient from "../components/api/axios/axiosClient";
const deleteAirport = async (id) => {
  await axiosClient.delete(`/airport/${id}`).then((res) => {
    if (res.error) alert(res.error);
  });
};
const DELETE = {
  deleteAirport,
};

export default DELETE;
