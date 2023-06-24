import axiosClient from "../components/api/axios/axiosClient";
import React from "react";
import { useLocation } from "react-router-dom";

function DetailFlight() {
  const role = 0;
  const location = useLocation();
  const flight = location.state.flight;
  const [airports, setAirports] = React.useState([]);
  const [ticketClasses, setTicketClasses] = React.useState([]);
  const [seats, setSeats] = React.useState([]);
  const [transitions, setTransitions] = React.useState([]);
  // console.log(flight);
  React.useEffect(() => {
    getAirports();
    getTicketClasses();
    getSeats();
    getTransitions();
  }, []);
  const convertToAirportName = (id) => {
    let data = airports.filter((airport) => airport._id == id);
    return data.length > 0 ? data[0].name : "";
  };
  const fetchAllAirport = async () => {
    const data = await axiosClient.get("/airport/");
    return data;
  };
  const fetchTicketClasses = async () => {
    const data = await axiosClient.get("/ticket-class/");
    return data;
  };
  const fetchSeats = async () => {
    const data = await axiosClient.get(`/flightStatistic/${flight._id}`);
    return data;
  };
  const fetchTransitions = async () => {
    const data = await axiosClient.get(`/transition-airport/${flight._id}`);
    console.log("lấy các trạm", data);
    return data;
  };

  const getAirports = async () => {
    let data = await fetchAllAirport();
    await setAirports(data);
  };
  const getTicketClasses = async () => {
    let data = await fetchTicketClasses();
    await setTicketClasses(data);
    console.log("classsss", data);
  };
  const getSeats = async () => {
    let data = await fetchSeats();
    await setSeats(data);
    await console.log("seats", seats);
  };
  const getTransitions = async () => {
    let data = await fetchTransitions();
    await setTransitions(data);
    // await console.log("tram dung", data);
  };

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
  return (
    <>
      {/* <h3>Chi tiết chuyến bay</h3> */}
      <h2 className="mb-4">
        Mã số chuyến bay
        <span style={{ color: "red" }}>{" " + flight._id}</span>
      </h2>
      <div className="row justify-content-start" style={{ fontSize: "1.2rem" }}>
        <div className="col-6">
          <h3>
            {convertToAirportName(flight.fromAirport)} -{" "}
            {convertToAirportName(flight.toAirport)}
          </h3>
          <p>
            {getDateTimeFormat(flight.dateTime) + "   "}
            <b>{getTimeFormat(flight.dateTime)}</b>
          </p>
          <p>Thời gian bay: {flight.flightDuration} phút</p>
          <ul>
            <p>Trạm trung gian:</p>
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
        <div className="col-6">
          {ticketClasses.length > 0 && seats.length > 0 && (
            <div>
              <p>
                Vé hạng nhất:{" "}
                {
                  seats.filter((seat) => {
                    return seat.classOfTicket === ticketClasses[0]._id;
                  })[0].numberOfSeat
                }
                , Giá vé:{" "}
                {
                  seats.filter(
                    (seat) => seat.classOfTicket === ticketClasses[0]._id
                  )[0].price
                }{" "}
                VND
              </p>
              {seats.map((seat, index) => (
                <div key={index}>
                  Vé {seat.nameOfTicketClass}: {seat.numberOfEmptySeat}/
                  {seat.numberOfSeat} Vé trống , Giá vé: {seat.price} VND
                </div>
              ))}
              <p>
                Số lượng ghế trên máy bay:
                {" " +
                  seats.reduce(
                    (current, seat) => current + seat.numberOfSeat,
                    0
                  )}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DetailFlight;
