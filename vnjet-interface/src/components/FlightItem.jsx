import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { GET } from "../modules";
import { UTIL } from "../utils";
import Spinner from "./Spinner";

function FlightItem({
  flights,
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
  const [seats, setSeats] = React.useState([]);

  React.useEffect(() => {
    GET.getFlight(flightId, setFlight);
    GET.getAirports(setAirports);
    GET.getTransitions(flightId, setTransitions);
    GET.getSeats(flightId, setSeats);
  }, [flights, flightId]);

  return (
    <>
      <div
        className="rounded-3 border border-secondary mt-3 p-4 hover"
        onClick={() =>
          showDetailFlight({
            id: flightId,
            from: UTIL.convertToAirportName(airports, flight.fromAirport),
            to: UTIL.convertToAirportName(airports, flight.toAirport),
            date: UTIL.getDateTimeFormat(flight.dateTime),
            dateTime: UTIL.getTimeFormat(flight.dateTime),
            duration: flight.flightDuration,
            transition: transitions,
            seats: seats,
          })
        }
      >
        {!flight && <Spinner />}
        {flight && (
          <div className="d-flex justify-content-between">
            <div className="col-5">
              <span style={{ color: "red" }}>Số hiệu: {flightId}</span>
              <h2>
                {UTIL.getTimeFormat(flight.dateTime)}{" "}
                <span style={{ fontSize: "1rem", color: "rgb(163 155 155)" }}>
                  Thời gian: {flight.flightDuration} phút
                </span>
              </h2>
              <h5>{UTIL.getDateTimeFormat(flight.dateTime)}</h5>
              <h5 style={{ color: "orange", cursor: "pointer" }}>
                {UTIL.convertToAirportName(airports, flight.fromAirport)} -{" "}
                {UTIL.convertToAirportName(airports, flight.toAirport)}
              </h5>
              <ul>
                {transitions.length > 0 && <b>Trạm trung gian:</b>}
                {transitions.length > 0 &&
                  transitions.map((transition, index) => (
                    <li key={index}>
                      {UTIL.convertToAirportName(
                        airports,
                        transition.airportId
                      )}
                      , Thời gian: {transition.transitionDuration} phút, Ghi
                      chú: {transition.note}
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
