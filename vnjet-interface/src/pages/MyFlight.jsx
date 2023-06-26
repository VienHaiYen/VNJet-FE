import axiosClient from "../components/api/axios/axiosClient";
import Pagination from "react-bootstrap/Pagination";
import React from "react";
import MyFlightItem from "../components/MyFlightItem";
import FlightItem from "../components/FlightItem";
function MyFlight() {
  // const [basicModal, setBasicModal] = React.useState(false);
  const [flights, setFlights] = React.useState([]);
  const [tickets, setTickets] = React.useState([]);
  const [ticketClasses, setTicketClasses] = React.useState([]);

  // const [currentID, setCurrentID] = React.useState("");

  const [page, setPage] = React.useState(1);
  const [flightMetaData, setFlightMetaData] = React.useState();
  const [pageNum, setPageNum] = React.useState([]);
  React.useEffect(() => {
    getMyTickets(page);
    // getAirports();
    getTicketClasses();
    getFlights();
  }, []);
  const fetchAllFlight = async () => {
    const data = await axiosClient.get("/flight");
    return data;
  };
  const fetchAllMyTicket = async (id) => {
    const data = await axiosClient.get(`/ticket?page=${id}`).then((res) => {
      setFlightMetaData(res.metadata);
      return res.results;
    });
    return data;
  };

  const fetchTicketClasses = async () => {
    const data = await axiosClient.get("/ticket-class/");
    return data;
  };

  const getFlights = async () => {
    await fetchAllFlight().then((res) => {
      setFlights(res);
      console.log(res);
    });
  };
  const getMyTickets = async (id) => {
    await fetchAllMyTicket(id).then((data) => {
      setTickets(data);
      console.log(data);
    });
  };
  const getTicketClasses = async () => {
    await fetchTicketClasses().then((res) => {
      setTicketClasses(res);
      console.log("ticket-class", res);
    });
  };
  const deleteFlight = async (id) => {
    const data = await axiosClient.delete(`/ticket/${id}`);
    return data;
  };
  // const toggleShow = () => setBasicModal(!basicModal);

  const handleDeleteTicket = async (id) => {
    const data = await deleteFlight(id);
    await console.log(data);
    await getMyTickets(page);
  };
  React.useEffect(() => {
    if (flightMetaData) {
      setPageNum([]);
      for (let number = 1; number <= flightMetaData.totalPages; number++) {
        setPageNum((...prev) => [
          ...prev,
          <Pagination.Item
            key={number}
            // active={number === page}
            onClick={() => {
              setPage(number);
              // alert(number);
            }}
          >
            {number}
          </Pagination.Item>,
        ]);
      }
      console.log(33, pageNum);
    }
  }, [flightMetaData]);
  return (
    <div>
      {tickets &&
        tickets.length > 0 &&
        tickets.map((ticket, index) => {
          return (
            <MyFlightItem
              // from={convertToCurrentName(data.fromAirport)}
              // to={convertToCurrentName(data.toAirport)}
              // flight={data}
              ticket={ticket}
              deleteTicket={handleDeleteTicket}
              key={index}
            />
          );
        })}
      {pageNum && pageNum.length > 0 && <Pagination>{pageNum}</Pagination>}
    </div>
  );
}
export default MyFlight;
