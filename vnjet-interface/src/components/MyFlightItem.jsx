import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../components/api/axios/axiosClient";
import React from "react";

function getDateTimeFormat(_date) {
  var date = new Date(_date);
  var dd = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  var mm = date.getMonth() > 9 ? date.getMonth() : "0" + date.getMonth();
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

function MyFlightItem({ ticket, deleteTicket }) {
  const [airports, setAirports] = React.useState([]);
  const [transitions, setTransitions] = React.useState([]);
  const [flight, setFlight] = React.useState();
  const convertToAirportName = (id) => {
    if (airports) {
      let data = airports.filter((airport) => airport._id == id);
      return data.length > 0 ? data[0].name : "";
    }
  };
  const convertToCurrentName = (id) => {
    const data = airports.filter((airport) => airport._id == id);
    return data.length > 0 ? data[0].name : "";
  };
  const fetchFlight = async (id) => {
    await axiosClient.get(`/flight/${id}`).then((res) => {
      setFlight(res);
      console.log("flight", res);
    });
  };
  const fetchAllAirport = async () => {
    const data = await axiosClient.get("/airport/");
    return data;
  };

  React.useEffect(() => {
    getAirports();
    fetchFlight(ticket.flightId);
    getAirports();
    getTransitions();
  }, []);
  const fetchTransitions = async () => {
    const data = await axiosClient.get(`/transition-airport/${flight._id}`);
    return data;
  };

  const getTransitions = async () => {
    let data = await fetchTransitions();
    await setTransitions(data);
  };
  const getAirports = async () => {
    await fetchAllAirport().then((res) => {
      setAirports(res);
      console.log(res);
    });
  };
  return (
    <div className="rounded-3 border border-secondary mt-3 p-4">
      {flight && (
        <div className="d-flex justify-content-between">
          <div className="col-6">
            <span style={{ color: "red" }}>Số hiệu: {flight._id}</span>
            <h4>{getTimeFormat(flight.dateTime)}</h4>
            <h5 style={{ color: "orange" }}>
              {convertToCurrentName(flight.fromAirport)} -{" "}
              {convertToCurrentName(flight.toAirport)}
            </h5>
            <ul>
              {transitions.length > 0 && <p>Trạm trung gian:</p>}
              {transitions.length > 0 &&
                transitions.map((transition, index) => (
                  <li key={index}>
                    Name: {convertToAirportName(transition.airportId)}, Thời
                    gian: {transition.transitionDuration} phút, Ghi chú:{" "}
                    {transition.note}
                  </li>
                ))}
            </ul>
          </div>
          <div className="d-flex flex-column justify-content-center col-5">
            <h6>{getDateTimeFormat(flight.dateTime)}</h6>
            <h6>Tổng thời gian di chuyển: {flight.flightDuration} phút</h6>
            <h6>Giá vé {new Intl.NumberFormat().format(ticket.price)} VND</h6>
          </div>
          <div className="h-100">
            <>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => deleteTicket(ticket._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyFlightItem;
