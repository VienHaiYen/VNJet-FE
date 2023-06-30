import axiosClient from "../components/api/axios/axiosClient";
const deleteAirport = async (id) => {
  await axiosClient.delete(`/airport/${id}`).then((res) => {
    if (res.error) alert(res.error);
  });
};

const deleteTicket = async (id) => {
  await axiosClient.delete(`/ticket/${id}`).then((res) => {
    if (res.error) alert(res.error);
    else alert("Đã xóa vé !");
  });
};
const deleteFlight = async (id) => {
  let data = await axiosClient.delete(`/flight/${id}`);
  return data;
};
const DELETE = {
  deleteAirport,
  deleteTicket,
  deleteFlight,
};

export default DELETE;
