import axiosClient from "../components/api/axios/axiosClient";

// GET METHOD
const getFlights = async (id, setFlightMetaData, setFlights) => {
  await axiosClient.get(`/flight?page=${id}`).then((res) => {
    if (res.error) {
      alert(res.error);
    } else {
      setFlightMetaData(res.metadata);
      setFlights(res.results);
    }
  });
};
const getFlight = async (id, setFlight) => {
  await axiosClient.get(`/flight/${id}`).then((res) => {
    setFlight(res);
    console.log(res);
  });
};
const getAirports = async (setAirports) => {
  await axiosClient.get("/airport/").then((res) => {
    if (res.error) {
      alert(res.error);
    } else {
      setAirports(res);
    }
  });
};
const getTransitions = async (id, setTransitions) => {
  await axiosClient.get(`/transition-airport/${id}`).then((res) => {
    if (res.error) {
      alert(res.error);
    } else {
      setTransitions(res);
    }
  });
};
const getSeats = async (id, setSeats) => {
  const data = await axiosClient.get(`/flightStatistic/${id}`).then((res) => {
    if (res.error) alert(res.error);
    else setSeats(res);
  });
  return data;
};

const GET = {
  getAirports,
  getFlights,
  getFlight,
  getTransitions,
  getSeats,
};

export default GET;
