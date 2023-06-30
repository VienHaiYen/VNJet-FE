import axiosClient from "../components/api/axios/axiosClient";

const postAirport = async (name) => {
  await axiosClient
    .post("/airport/", {
      name: name,
    })
    .then((res) => {
      if (res.error) alert(res.error);
    });
};

const addTicketClass = async (name) => {
  await axiosClient
    .post("/ticket-class", {
      name: name,
    })
    .then((res) => {
      if (res.error) alert(res.error);
    });
};

const buyTicket = async (id, ticketClass, setShowBookingTicket) => {
  await axiosClient
    .post("/ticket/", {
      flightId: id,
      classOfTicket: ticketClass,
    })
    .then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        alert("Đặt vé thành công !");
        setShowBookingTicket(false);
      }
    });
};

const POST = {
  postAirport,
  addTicketClass,
  buyTicket,
};

export default POST;
