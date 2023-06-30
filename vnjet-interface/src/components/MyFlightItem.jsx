import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GET } from "../modules";
import { UTIL } from "../utils";
import React from "react";

function MyFlightItem({ ticket, deleteTicket }) {
  const [airports, setAirports] = React.useState([]);
  const [transitions, setTransitions] = React.useState([]);
  const [flight, setFlight] = React.useState();

  React.useEffect(() => {
    GET.getAirports(setAirports);
    GET.getFlight(ticket.flightId, setFlight);
    GET.getTransitions(ticket.flightId, setTransitions);
  }, [ticket.flightId]);

  return (
    <div className="rounded-3 border border-secondary mt-3 p-4">
      {flight && (
        <div className="d-flex justify-content-between">
          <div className="col-6">
            <span style={{ color: "red" }}>Số hiệu: {flight._id}</span>
            <h4>{UTIL.getTimeFormat(flight.dateTime)}</h4>
            <h5 style={{ color: "orange" }}>
              {UTIL.convertToAirportName(airports, flight.fromAirport)} -{" "}
              {UTIL.convertToAirportName(airports, flight.toAirport)}
            </h5>
            <ul>
              {transitions.length > 0 && <p>Trạm trung gian:</p>}
              {transitions.length > 0 &&
                transitions.map((transition, index) => (
                  <li key={index}>
                    Name:{" "}
                    {UTIL.convertToAirportName(airports, transition.airportId)},
                    Thời gian: {transition.transitionDuration} phút, Ghi chú:{" "}
                    {transition.note}
                  </li>
                ))}
            </ul>
          </div>
          <div className="d-flex flex-column justify-content-center col-5">
            <h6>{UTIL.getDateTimeFormat(flight.dateTime)}</h6>
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
