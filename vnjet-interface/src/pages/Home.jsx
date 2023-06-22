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
  const [startDate, setStartDate] = React.useState(new Date());
  const [basicModal, setBasicModal] = React.useState(false);
  const [basicModal1, setBasicModal1] = React.useState(false);
  // const inputRef = React.useRef(null);
  const [flights, setFlights] = React.useState([]);
  const [airports, setAirports] = React.useState([]);
  const [ticketClasses, setTicketClasses] = React.useState([]);
  const [findingState, setFindingState] = React.useState({
    from: "",
    to: "",
    date: "",
  });

  const [currentID, setCurrentID] = React.useState("");

  const [customerInfo, setCustomerInfo] = React.useState({
    ticketClass: "",
  });
  React.useEffect(() => {
    getFlights();
    getAirports();
    getTicketClasses();
  }, []);
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
  const buyTicket = async (flighId) => {
    const data = await axiosClient.post("/ticket/", {
      flightId: flighId,
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
  const handleSearchFlight = async () => {
    let data = await searchFlight();
    // console.log(data);
    setFlights(data);
  };
  const handleBuyTicket = async () => {
    let data = await buyTicket(currentID);
    await console.log(data);
  };
  const getFlights = async () => {
    let data = await fetchAllFlight();
    setFlights(data);
    await console.log(flights);
  };
  const getAirports = async () => {
    let data = await fetchAllAirport();
    await setAirports(data);
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
  const toggleShow = () => setBasicModal(!basicModal);
  const convertToCurrentName = (id) => {
    let data = airports.filter((airport) => airport._id == id);
    return data.length > 0 ? data[0].name : "";
  };
  const handleCloseDialog = () => {
    toggleShow();
    console.log("clear all");
    setCustomerInfo({
      ticketClass: "",
    });
  };
  const handleChooseTicket = (id) => {
    toggleShow();
    setCurrentID(id);
  };
  const handleChangeFlight = (id) => {
    alert("Chỉnh sửa chuyến bay" + id);
  };
  const handleDeleteFlight = async (id) => {
    // alert("Xóa chuyến bay" + id);
    setCurrentID(id);
    setBasicModal1(true);
  };
  const submitDelete = async () => {
    await deleteFlight(currentID);
    await getFlights();
    setBasicModal1(false);
    // console.log(456, currentID);
  };
  const handleShowDetail = (flight) => {
    navigate("/detail-flight", { state: { flight: flight } });
    console.log("flight", flight);
  };

  const handleChangeCustomerInfo = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangeFindingStae = (e) => {
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
  }, [basicModal]);
  return (
    <div>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Đặt vé chuyến bay {currentID}</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form-group mr-3">
                <label htmlFor="level">Chọi loại vé</label>
                <Dropdown
                  value={customerInfo.ticketClass}
                  onChange={handleChangeCustomerInfo}
                  name="ticketClass"
                  options={ticketClasses}
                />
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
      <MDBModal show={basicModal1} setShow={setBasicModal1} tabIndex="-1">
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
                onClick={() => setBasicModal1(false)}
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
      <h3>Tìm kiếm chuyến đi</h3>

      <div className="home d-flex align-item-center">
        <label>Đi từ</label>
        <Dropdown
          value={findingState.from}
          onChange={handleChangeFindingStae}
          name="from"
          options={airports}
        />
        <label>Đến</label>
        <Dropdown
          value={findingState.to}
          onChange={handleChangeFindingStae}
          name="to"
          options={airports}
        />
        <label>Đi từ</label>
        <input
          required
          id="date"
          type="date"
          className="form-control mr-5"
          onChange={handleChangeFindingStae}
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
      {flights &&
        flights.map((flight, index) => (
          <FlightItem
            from={convertToCurrentName(flight.fromAirport)}
            to={convertToCurrentName(flight.toAirport)}
            data={flight}
            bookTicket={handleChooseTicket}
            changeFlight={handleChangeFlight}
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
