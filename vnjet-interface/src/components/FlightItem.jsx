import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
  from,
  to,
  flight,
  bookTicket,
  changeFlight,
  deleteFlight,
  showDetailFlight,
  role,
}) {
  const [airports, setAirports] = React.useState([]);
  const [transitions, setTransitions] = React.useState([]);
  const convertToAirportName = (id) => {
    let data = airports.filter((airport) => airport._id == id);
    return data.length > 0 ? data[0].name : "";
  };
  React.useEffect(() => {
    getAirports();
    getTransitions();
  }, []);
  const fetchTransitions = async () => {
    console.log(456, flight._id);
    const data = await axiosClient.get(`/transition-airport/${flight._id}`);
    await console.log("lấy các trạm", flight._id, data);
    return data;
  };
  const fetchAllAirport = async () => {
    const data = await axiosClient.get("/airport/");
    return data;
  };
  const getTransitions = async () => {
    let data = await fetchTransitions();
    await setTransitions(data);
    // await console.log("tram dung", data);
  };
  const getAirports = async () => {
    let data = await fetchAllAirport();
    await setAirports(data);
  };
  return (
    <div className="rounded-3 border border-secondary mt-3 p-4">
      <div className="d-flex justify-content-between">
        <div>
          <span style={{ color: "red" }}>Số hiệu: {flight._id}</span>
          <h4>{getTimeFormat(flight.dateTime)}</h4>
          <h5 style={{ color: "orange" }}>
            {from} - {to}
          </h5>
          <ul>
            {transitions.length > 0 && <p>Trạm trung gian:</p>}
            {transitions.length > 0 &&
              transitions.map((transition, index) => (
                <li key={index}>
                  Name: {convertToAirportName(transition.airportId)}, Thời gian:{" "}
                  {transition.transitionDuration} phút, Ghi chú:{" "}
                  {transition.note}
                </li>
              ))}
          </ul>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <h6>{getDateTimeFormat(flight.dateTime)}</h6>
          <h6>Tổng thời gian di chuyển: {flight.flightDuration} phút</h6>
        </div>
        <div className="h-100">
          {role == 1 ? (
            <button
              type="button"
              className="btn btn-warning w-100"
              onClick={() => bookTicket(flight._id)}
            >
              Đặt vé
            </button>
          ) : (
            <>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-warning w-75"
                  onClick={() => changeFlight(flight._id)}
                >
                  Chỉnh sửa
                </button>
                <button
                  type="button"
                  className="btn btn-dark ml-2 w-25"
                  onClick={() => deleteFlight(flight._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <button
                type="button"
                className="btn btn-primary mt-2 w-100"
                onClick={() => showDetailFlight(flight)}
              >
                Chi tiết
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlightItem;
