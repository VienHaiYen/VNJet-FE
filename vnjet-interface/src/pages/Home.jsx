import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import FlightItem from "../components/FlightItem";
import axiosClient from "../components/api/axios/axiosClient";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import Dropdown from "../components/Dropdown";

function Home() {
  let navigate = useNavigate();
  const role = 0;
  const [currentID, setCurrentID] = React.useState("");
  const [showBookingTicket, setShowBookingTicket] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [flights, setFlights] = React.useState([]);
  const [airports, setAirports] = React.useState([]);
  const [ticketClasses, setTicketClasses] = React.useState([]);
  const [seats, setSeats] = React.useState([]);

  const [findingState, setFindingState] = React.useState({
    from: "",
    to: "",
    date: "",
  });
  const [editState, setEditState] = React.useState({
    dateTime: "",
    flightDuration: "",
    fromAirport: "",
    toAirport: "",
  });

  const [customerInfo, setCustomerInfo] = React.useState({
    ticketClass: "",
  });
  React.useEffect(() => {
    getFlights();
    getAirports();
    getTicketClasses();
  }, []);
  React.useEffect(() => {
    getSeats();
  }, [currentID]);
  const fetchAllFlight = async () => {
    const data = await axiosClient.get("/flight");
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
  const buyTicket = async (flightId) => {
    const data = await axiosClient.post("/ticket/", {
      flightId: flightId,
      classOfTicket: customerInfo.ticketClass,
    });
    return data;
  };
  const searchFlight = async () => {
    let tmp = findingState.date == "" ? "" : new Date(findingState.date);
    const data = await axiosClient.get(
      `/flight/${findingState.from != "" ? findingState.from : "undefined"}/${
        findingState.to != "" ? findingState.to : "undefined"
      }/${
        tmp != ""
          ? tmp.toISOString().replace("00:00:00.000Z", "00:00:00.000+00:00")
          : "undefined"
      }`
    );
    return data;
  };
  const editFlight = async (flightId, editState) => {
    // console.log("editstate", editState);
    const data = await axiosClient.put(`/flight/${flightId}`, {
      dateTime: editState.dateTime,
      flightDuration: Number(editState.flightDuration),
      fromAirport: editState.fromAirport,
      toAirport: editState.toAirport,
    });

    return data;
  };
  const fetchSeats = async () => {
    const data = await axiosClient.get(`/flightStatistic/${currentID}`);
    return data;
  };
  const handleSearchFlight = async () => {
    let data = await searchFlight();
    setFlights(data);
  };
  const handleBuyTicket = async () => {
    let data = await buyTicket(currentID);
    await console.log(data);
    setShowBookingTicket(false);
  };
  const getFlights = async () => {
    let data = await fetchAllFlight();
    setFlights(data);
    await console.log(flights);
  };
  const getAirports = async () => {
    let data = await fetchAllAirport();
    await setAirports(data);
    await console.log(airports);
  };
  const getTicketClasses = async () => {
    let data = await fetchTicketClasses();
    await setTicketClasses(data);
    console.log("ticket-class", data);
  };
  const deleteFlight = async (id) => {
    const data = await axiosClient.delete(`/flight/${id}`);
    return data;
  };
  const getSeats = async () => {
    let data = await fetchSeats();
    await setSeats(data);
    // await console.log(seats);
  };
  const toggleShow = () => setShowBookingTicket(!showBookingTicket);
  const convertToCurrentName = (id) => {
    let data = airports.filter((airport) => airport._id == id);
    return data.length > 0 ? data[0].name : "";
  };
  const handleCloseDialog = () => {
    toggleShow();
    setCustomerInfo({
      ticketClass: "",
    });
  };
  const handleChooseTicket = (id) => {
    toggleShow();
    setCurrentID(id);
  };
  const handleEditFlight = (id) => {
    setCurrentID(id);
    setShowEdit(true);
  };
  const handleDeleteFlight = async (id) => {
    setCurrentID(id);
    setShowDelete(true);
  };
  const submitDelete = async () => {
    await deleteFlight(currentID);
    await getFlights();
    setShowDelete(false);
  };
  const submitEdit = async () => {
    let data = await editFlight(currentID, editState);
    // await console.log(456, data);
    if (data.error) {
      alert(data.error);
    }
    await setShowEdit(false);
  };
  const handleShowDetail = (flight) => {
    navigate("/detail-flight", { state: { flight: flight } });
    // console.log("flight", flight);
  };

  const handleChangeCustomerInfo = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(customerInfo);
  };
  const handleChangeEditState = (e) => {
    const { name, value } = e.target;
    setEditState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(editState);
  };
  const handleChangeFindingState = (e) => {
    const { name, value } = e.target;
    setFindingState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(findingState);
    console.log(findingState.date);
  };
  React.useEffect(() => {
    // basicModal && inputRef.current.focus();
  }, [showBookingTicket]);
  return (
    <div>
      <MDBModal
        show={showBookingTicket}
        setShow={setShowBookingTicket}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Đặt vé chuyến bay {currentID}</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form-group mr-3">
                <label htmlFor="level">Chọn loại vé</label>
                <select
                  className="form-select"
                  name="ticketClass"
                  onChange={handleChangeCustomerInfo}
                  value={customerInfo.ticketClass}
                >
                  <option defaultValue value=""></option>
                  {Array.isArray(seats) &&
                    seats.length > 0 &&
                    seats.map((seat, index) => {
                      return seat.numberOfEmptySeat > 0 ? (
                        <option value={seat.classOfTicket} key={index}>
                          {seat.nameOfTicketClass} - {seat.price} VND
                        </option>
                      ) : (
                        ""
                      );
                    })}
                </select>
              </div>
              <div></div>
            </MDBModalBody>
            <MDBModalFooter>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCloseDialog}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleBuyTicket}
              >
                Đồng ý
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={showDelete} setShow={setShowDelete} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Xóa chuyến bay</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              Bạn có chắc chắn muốn xóa chuyến bay
              {" " + convertToCurrentName(currentID)} không ?
            </MDBModalBody>
            <MDBModalFooter>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowDelete(false)}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={submitDelete}
              >
                Đồng ý
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={showEdit} setShow={setShowEdit} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Chỉnh sửa chuyến bay</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <label htmlFor="from">Đi từ</label>
                <Dropdown
                  value={editState.fromAirport}
                  onChange={handleChangeEditState}
                  name="fromAirport"
                  options={airports}
                />

                <label htmlFor="to">Đi đến</label>
                <Dropdown
                  value={editState.toAirport}
                  onChange={handleChangeEditState}
                  name="toAirport"
                  options={airports}
                />
                <label htmlFor="dateTime">Thời gian</label>
                <input
                  type="datetime-local"
                  id="dateTime"
                  className="form-control"
                  value={editState.dateTime}
                  name="dateTime"
                  onChange={handleChangeEditState}
                />
                <label htmlFor="flightDuration">Trong khoảng</label>
                <input
                  type="number"
                  id="flightDuration"
                  className="form-control"
                  value={editState.flightDuration}
                  name="flightDuration"
                  onChange={handleChangeEditState}
                />
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowEdit(false)}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={submitEdit}
              >
                Hoàn thành
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <h3>Tìm kiếm chuyến đi</h3>

      <div className="home d-flex align-item-center">
        <label>Đi từ</label>
        <Dropdown
          value={findingState.from}
          onChange={handleChangeFindingState}
          name="from"
          options={airports}
        />
        <label>Đến</label>
        <Dropdown
          value={findingState.to}
          onChange={handleChangeFindingState}
          name="to"
          options={airports}
        />
        <label>Đi từ</label>
        <input
          required
          id="date"
          type="date"
          className="form-control mr-5"
          onChange={handleChangeFindingState}
          name="date"
          value={findingState.date}
        />
        <button
          type="button"
          className="btn btn-warning"
          onClick={handleSearchFlight}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {flights.length < 1 && (
        <div className="spinner-border text-primary " role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {flights &&
        flights.map((flight, index) => (
          <FlightItem
            from={convertToCurrentName(flight.fromAirport)}
            to={convertToCurrentName(flight.toAirport)}
            flight={flight}
            bookTicket={handleChooseTicket}
            changeFlight={handleEditFlight}
            deleteFlight={handleDeleteFlight}
            showDetailFlight={handleShowDetail}
            key={index}
            role={role}
          />
        ))}
    </div>
  );
}

export default Home;
