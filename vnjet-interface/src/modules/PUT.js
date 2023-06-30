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
const editFlight = async (flightId, editState) => {
  const data = await axiosClient.put(`/flight/${flightId}`, {
    dateTime: editState.dateTime,
    flightDuration: Number(editState.flightDuration),
    fromAirport: editState.fromAirport,
    toAirport: editState.toAirport,
  });
  return data;
};
const PUT = {
  editAirport,
  editFlight,
};

export default PUT;
