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
  let tmp = editState.date == "" ? "" : new Date(editState.date);
  console.log(11, tmp);
  console.log({
    tt: editState.dateTime + ":00.000+07:00",
    flightDuration: Number(editState.flightDuration),
    fromAirport: editState.fromAirport,
    toAirport: editState.toAirport,
    tmp,
  });
  const data = await axiosClient.put(`/flight/${flightId}`, {
    dateTime: editState.dateTime + ":00.000+07:00",
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
