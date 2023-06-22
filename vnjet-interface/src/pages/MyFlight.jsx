import axiosClient from "../components/api/axios/axiosClient";
import React from "react";
import MyFlightItem from "../components/MyFlightItem";
import FlightItem from "../components/FlightItem";
function MyFlight() {
  const role = 1;
  const [basicModal, setBasicModal] = React.useState(false);
  const [flights, setFlights] = React.useState([]);
  const [tickets, setTickets] = React.useState([]);
  const [airports, setAirports] = React.useState([]);
  const [ticketClasses, setTicketClasses] = React.useState([]);

  const [currentID, setCurrentID] = React.useState("");

  const [customerInfo, setCustomerInfo] = React.useState({
    ticketClass: "",
  });
  React.useEffect(() => {
    getMyTickets();
    getAirports();
    getTicketClasses();
    getFlights();
  }, []);
  const fetchAllFlight = async () => {
    const data = await axiosClient.get("/flight");
    return data;
  };
  const fetchAllMyTicket = async () => {
    const data = await axiosClient.get("/ticket");
    return data;
  };
  const fetchAllAirport = async () => {
    const data = await axiosClient.get("/airport/");
    return data;
  };
  const fetchTicketClasses = async () => {
    const data = await axiosClient.get("/ticket-class/");
    return data;
  };
  const getFlights = async () => {
    let data = await fetchAllFlight();
    await setFlights(data);
    await console.log(flights);
  };
  const getMyTickets = async () => {
    let data = await fetchAllMyTicket();
    await setTickets(data);
    await console.log("tickets", tickets);
  };
  const getAirports = async () => {
    let data = await fetchAllAirport();
    await setAirports(data);
  };
  const getTicketClasses = async () => {
    let data = await fetchTicketClasses();
    await setTicketClasses(data);
    await console.log("ticket-class", data);
  };
  const deleteFlight = async (id) => {
    const data = await axiosClient.delete(`/ticket/${id}`);
    return data;
  };
  const toggleShow = () => setBasicModal(!basicModal);
  const convertToCurrentName = (id) => {
    let data = airports.filter((airport) => airport._id == id);
    return data.length > 0 ? data[0].name : "";
  };

  const handleDeleteTicket = async (id) => {
    let data = await deleteFlight(id);
    await console.log(data);
    await getMyTickets();
  };

  return (
    <div>
      {tickets.length > 0 &&
        tickets.map((ticket, index) => {
          let data = flights.filter(
            (flight) => flight._id == ticket.flightId
          )[0];
          return (
            <MyFlightItem
              from={convertToCurrentName(data.fromAirport)}
              to={convertToCurrentName(data.toAirport)}
              flight={data}
              ticket={ticket}
              deleteTicket={handleDeleteTicket}
              key={index}
            />
          );
        })}
    </div>
  );
}

export default MyFlight;
