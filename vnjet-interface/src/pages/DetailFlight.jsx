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
  const [tickets, setTickets] = React.useState([]);
  // console.log(flight);
  React.useEffect(() => {
    getAirports();
    getTicketClasses();
    getSeats();
    getTransitions();
    getTicket();
  }, []);
  const convertToAirportName = (id) => {
    let data = airports.filter((airport) => airport._id == id);
    return data.length > 0 ? data[0].name : "";
  };
  const fetchAllAirport = async () => {
    const data = await axiosClient.get("http://localhost:20001/airport/");
    return data;
  };
  const fetchTicketClasses = async () => {
    const data = await axiosClient.get("http://localhost:20001/ticket-class/");
    return data;
  };
  const fetchSeats = async () => {
    const data = await axiosClient.get(
      `http://localhost:20001/flightStatistic/${flight._id}`
    );
    return data;
  };
  const fetchTransitions = async () => {
    const data = await axiosClient.get(
      `http://localhost:20001/transition-airport/${flight._id}`
    );
    console.log("lấy các trạm", data);
    return data;
  };
  const fetchTicket = async () => {
    const data = await axiosClient.get(`http://localhost:20001/ticket`);
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
  };
  const getTransitions = async () => {
    let data = await fetchTransitions();
    await setTransitions(data);
    await console.log("tram dung", data);
  };
  const getTicket = async () => {
    let data = await fetchTicket();
    await console.log("tiket", data);
    data.filter((ticket) => ticket.flightId === flight._id);
    await setTickets(data);
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
  const customers = [
    {
      id: 1,
      name: "John",
      cmnd: 456789,
      birthday: "1/1/2000",
      gender: "male",
      email: "456@gmail.com",
      phone: 456789123,
      address: "456 Nguyễn Lương Bằng D4",
      ticketType: "Vé phổ thông",
    },
    {
      id: 2,
      name: "Marry",
      cmnd: 456789,
      birthday: "1/1/2000",
      gender: "female",
      email: "477@gmail.com",
      phone: 456789123,
      address: "456 Nguyễn Lương Bằng D4",
      ticketType: "Vé thương gia",
    },
  ];
  return (
    <>
      {/* <h3>Chi tiết chuyến bay</h3> */}
      <h2 className="mb-4">
        Mã số chuyến bay
        <span style={{ color: "red" }}>{" " + flight._id}</span>
      </h2>
      <div className="row justify-content-start" style={{ fontSize: "1.2rem" }}>
        <div className="col-6">
          <p>
            {convertToAirportName(flight.fromAirport)} -{" "}
            {convertToAirportName(flight.toAirport)}
          </p>
          <p>
            {getDateTimeFormat(flight.dateTime) + "   "}
            <b>{getTimeFormat(flight.dateTime)}</b>
          </p>
          <p>Thời gian bay: {flight.flightDuration} phút</p>
          <p>Trạm trung gian:</p>
          <ul>
            {transitions.length > 0 &&
              transitions.map((transition, index) => (
                <li key={index}>
                  Name: {convertToAirportName(transition.airportId)}, Thời gian:{" "}
                  {transition.transitionDuration} phút, Ghi chú:{" "}
                  {transition.note}
                </li>
              ))}
          </ul>
          <p>
            Số lượng ghế trên máy bay:
            {" " +
              seats.reduce((current, seat) => current + seat.numberOfSeat, 0)}
          </p>
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
              <p>
                Vé hạng hai:{" "}
                {
                  seats.filter((seat) => {
                    return seat.classOfTicket === ticketClasses[1]._id;
                  })[0].numberOfSeat
                }
                , Giá vé:{" "}
                {
                  seats.filter(
                    (seat) => seat.classOfTicket === ticketClasses[1]._id
                  )[0].price
                }{" "}
                VND
              </p>
              <p>
                Số vé hạng nhất còn trống:{" "}
                {
                  seats.filter((seat) => {
                    return seat.classOfTicket === ticketClasses[0]._id;
                  })[0].numberOfEmptySeat
                }
              </p>
              <p>
                Số vé hạng hai còn trống:{" "}
                {
                  seats.filter((seat) => {
                    return seat.classOfTicket === ticketClasses[1]._id;
                  })[0].numberOfEmptySeat
                }
              </p>
            </div>
          )}
        </div>
      </div>
      {role == 0 && (
        <>
          <h3 className="mt-5">Danh sách người đặt vé</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên Khách hàng</th>
                <th scope="col">CMND</th>
                <th scope="col">Ngày sinh</th>
                <th scope="col">Loại vé</th>
                {/* <th scope="col">Handle</th> */}
              </tr>
            </thead>
            <tbody>
              {tickets.map((customer, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{customer.userId}</td>
                  {/* <td>{customer.cmnd}</td>
                  <td>{customer.birthday}</td>
                  <td>{customer.ticketType}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default DetailFlight;
