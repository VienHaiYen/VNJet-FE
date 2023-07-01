import Pagination from "react-bootstrap/Pagination";
import React from "react";
import { GET, DELETE } from "../modules";
import MyFlightItem from "../components/MyFlightItem";
function MyFlight() {
  const [tickets, setTickets] = React.useState([]);

  const [page, setPage] = React.useState(1);
  const [flightMetaData, setFlightMetaData] = React.useState();
  const [pageNum, setPageNum] = React.useState([]);

  React.useEffect(() => {
    GET.getMyTickets(page, setFlightMetaData, setTickets);
  }, [page]);

  const handleDeleteTicket = async (id) => {
    await DELETE.deleteTicket(id);
    await GET.getMyTickets(page, setFlightMetaData, setTickets);
  };

  React.useEffect(() => {
    if (flightMetaData) {
      setPageNum([]);
      for (let number = 1; number <= flightMetaData.totalPages; number++) {
        setPageNum((...prev) => [
          ...prev,
          <Pagination.Item
            key={number}
            onClick={() => {
              setPage(number);
            }}
          >
            {number}
          </Pagination.Item>,
        ]);
      }
    }
  }, [flightMetaData]);
  return (
    <div>
      {tickets &&
        tickets.length > 0 &&
        tickets.map((ticket, index) => {
          return (
            <MyFlightItem
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
