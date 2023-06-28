import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../components/api/axios/axiosClient";
import React from "react";

function getDateTimeFormat(_date) {
  var date = new Date(_date);
  var dd = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  var mm = date.getMonth() > 9 ? date.getMonth() : "0" + (date.getMonth() + 1);
  var yyyy = date.getFullYear();
  return dd + "/" + mm + "/" + yyyy;
}
function getTimeFormat(_date) {
  var date = new Date(_date);
  var hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
  var minus =
    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
  return hour + ":" + minus;
}
function FlightItem({
  flightId,
  bookTicket,
  changeFlight,
  deleteFlight,
  showDetailFlight,
  role,
}) {
  const [airports, setAirports] = React.useState([]);
  const [transitions, setTransitions] = React.useState([]);
  const [flight, setFlight] = React.useState();
  const [ticketClasses, setTicketClasses] = React.useState([]);
  const [seats, setSeats] = React.useState([]);
  const convertToAirportName = (id) => {
    let data = airports.filter((airport) => airport._id == id);
    return data.length > 0 ? data[0].name : "";
  };
  const convertToCurrentName = (id) => {
    const data = airports.filter((airport) => airport._id == id);
    return data.length > 0 ? data[0].name : "";
  };
  React.useEffect(() => {
    fetchFlight(flightId);
    getAirports();
    getTransitions();
    getSeats(flightId);
  }, []);
  const fetchTransitions = async () => {
    const data = await axiosClient.get(`/transition-airport/${flightId}`);
    return data;
  };
  const fetchAllAirport = async () => {
    const data = await axiosClient.get("/airport/");
    return data;
  };
  const fetchFlight = async (id) => {
    await axiosClient.get(`/flight/${id}`).then((res) => {
      setFlight(res);
      // console.log("flight", res);
    });
  };

  const fetchSeats = async (flightId) => {
    const data = await axiosClient.get(`/flightStatistic/${flightId}`);
    return data;
  };

  const getSeats = async (id) => {
    let data = await fetchSeats(id);
    await setSeats(data);
    // await console.log("seats", seats);
  };
  const getTransitions = async () => {
    let data = await fetchTransitions();
    await setTransitions(data);
  };
  const getAirports = async () => {
    let data = await fetchAllAirport();
    await setAirports(data);
  };

  return (
    <>
      <div
        className="rounded-3 border border-secondary mt-3 p-4 hover"
        // onClick={() => showDetailFlight(flight)}
        onClick={() =>
          showDetailFlight({
            id: flightId,
            from: convertToCurrentName(flight.fromAirport),
            to: convertToCurrentName(flight.toAirport),
            date: getDateTimeFormat(flight.dateTime),
            dateTime: getTimeFormat(flight.dateTime),
            duration: flight.flightDuration,
            transition: transitions,
            seats: seats,
          })
        }
      >
        {!flight && (
          <div className="spinner-border text-primary " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {flight && (
          <div className="d-flex justify-content-between">
            <div className="col-5">
              <span style={{ color: "red" }}>Số hiệu: {flightId}</span>
              <h2>
                {getTimeFormat(flight.dateTime)}{" "}
                <span style={{ fontSize: "1rem", color: "rgb(163 155 155)" }}>
                  Thời gian: {flight.flightDuration} phút
                </span>
              </h2>
              <h5>{getDateTimeFormat(flight.dateTime)}</h5>
              <h5 style={{ color: "orange", cursor: "pointer" }}>
                {convertToCurrentName(flight.fromAirport)} -{" "}
                {convertToCurrentName(flight.toAirport)}
              </h5>
              <ul>
                {transitions.length > 0 && <b>Trạm trung gian:</b>}
                {transitions.length > 0 &&
                  transitions.map((transition, index) => (
                    <li key={index}>
                      {convertToAirportName(transition.airportId)}, Thời gian:{" "}
                      {transition.transitionDuration} phút, Ghi chú:{" "}
                      {transition.note}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="d-flex flex-column justify-content-center col-5">
              {/* <h6>Tổng thời gian di chuyển: {flight.flightDuration} phút</h6> */}
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center">
              <div className="m-0">
                {role == 1 ? (
                  <button
                    type="button"
                    className="btn btn-warning w-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      bookTicket(flight._id);
                    }}
                  >
                    <h5>Đặt vé</h5>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-warning w-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        changeFlight(flight._id);
                      }}
                    >
                      <FontAwesomeIcon icon={faPen} /> Chỉnh sửa
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mt-2 w-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFlight(flight._id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Xóa chuyến bay
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FlightItem;
