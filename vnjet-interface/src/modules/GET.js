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
    // console.log(res);
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
const getYearReport = async (year, setYearReport) => {
  axiosClient.get(`/report/${year}`).then((res) => {
    if (res.error) alert(res.error);
    else {
      setYearReport(res);
    }
  });
};
const getReportFlight = async (setReport) => {
  axiosClient.get("/report").then((res) => {
    if (res.error) alert(res.error);
    else setReport(res);
  });
};

const getTicketClasses = async (setTicketClasses) => {
  await axiosClient.get("/ticket-class/").then((res) => {
    if (res.error) alert(res.error);
    else setTicketClasses(res);
  });
};
const getRules = async (setRules) => {
  await axiosClient.get("/terms").then((res) => {
    if (res.error) alert(res.error);
    else setRules(res);
  });
};

const getMyTickets = async (page, setFlightMetaData, setTickets) => {
  await axiosClient.get(`/ticket?page=${page}`).then((res) => {
    if (res.error) alert(res.error);
    else {
      setFlightMetaData(res.metadata);
      setTickets(res.results);
    }
  });
};
const searchFlight = async (findingState, setFlightMetaData, setFlights) => {
  let tmp = findingState.date == "" ? "" : new Date(findingState.date);
  const data = await axiosClient
    .get(
      `/flight/${findingState.from != "" ? findingState.from : "undefined"}/${
        findingState.to != "" ? findingState.to : "undefined"
      }/${
        tmp != ""
          ? tmp.toISOString().replace("00:00:00.000Z", "00:00:00.000+07:00")
          : "undefined"
      }`
    )
    .then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setFlightMetaData(res.metadata);
        setFlights(res.results);
      }
    });
  return data;
};
const GET = {
  getAirports,
  getFlights,
  getFlight,
  getTransitions,
  getSeats,
  getYearReport,
  getReportFlight,
  getTicketClasses,
  getRules,
  getMyTickets,
  searchFlight,
};

export default GET;
