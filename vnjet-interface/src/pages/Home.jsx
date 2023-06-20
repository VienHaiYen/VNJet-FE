import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FlightItem from "../components/FlightItem";
import axios from "axios";
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
  const inputRef = React.useRef(null);
  const [flights, setFlights] = React.useState([]);
  const [airports, setAirports] = React.useState([]);
  const [findingState, setFindingState] = React.useState({
    from: "",
    to: "",
    date: "",
  });

  React.useEffect(() => {
    const fetchAllAirport = async () => {
      const data = await axios
        .get("http://localhost:20001/airport/")
        .then((res) => res.data);
      return data;
    };
    const getAirports = async () => {
      let data = await fetchAllAirport();
      await setAirports(data);
    };

    getFlights();
    getAirports();
  }, []);
  const fetchAllFlight = async () => {
    const data = await axios
      .get("http://localhost:20001/flight")
      .then((res) => res.data);
    return data;
  };

  const getFlights = async () => {
    let data = await fetchAllFlight();
    setFlights(data);
    await console.log(flights);
  };
  const deleteFlight = async (id) => {
    const data = await axios
      .delete(`http://localhost:20001/flight/${id}`)
      .then((res) => res.data);
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
      customerName: "",
      cmnd: "",
      birth: "",
      phone: "",
      level: "",
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
  const handleShowDetail = (id) => {
    navigate("/detail-flight", { state: { id: id } });
  };
  const [currentID, setCurrentID] = React.useState("");

  const [customerInfo, setCustomerInfo] = React.useState({
    customerName: "",
    cmnd: "",
    birth: "",
    phone: "",
    level: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  React.useEffect(() => {
    basicModal && inputRef.current.focus();
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
                <label htmlFor="customerName">Tên khách hàng (*)</label>
                <input
                  ref={inputRef}
                  type="text"
                  className=" form-control"
                  id="customerName"
                  // placeholder="Điểm miệng"
                  value={customerInfo.customerName}
                  name="customerName"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mr-3">
                <label htmlFor="cmnd">CMND/CCCD</label>
                <input
                  type="number"
                  className=" form-control"
                  id="cmnd"
                  // placeholder="Điểm 15 phút"
                  value={customerInfo.cmnd}
                  name="cmnd"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mr-3">
                <label htmlFor="birth">Năm sinh</label>
                <input
                  type="number"
                  className=" form-control"
                  id="birth"
                  // placeholder="Điểm 45 phút"
                  value={customerInfo.birth}
                  name="birth"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mr-3">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="number"
                  className=" form-control"
                  id="phone"
                  // placeholder="Điểm Giữa học kì"
                  value={customerInfo.phone}
                  name="phone"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mr-3">
                <label htmlFor="level">Hạng vé</label>
                <Dropdown
                  value={customerInfo.level}
                  onChange={handleChange}
                  name="level"
                  // options={data.levelArray}
                />
              </div>
              <div>
                <h5></h5>
              </div>
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
                // onClick={handleChangePoint}
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
          value={airports.name}
          onChange={handleChange}
          name="from"
          options={airports}
        />
        <label>Đến</label>
        <Dropdown
          value={airports.name}
          onChange={handleChange}
          name="to"
          options={airports}
        />
        <label>Đi từ</label>
        <input
          required
          id="birthday"
          type="date"
          className="form-control mr-5"
          onChange={(date) => setStartDate(date)}
          //   value={info.birthday}
          name="birthday"
        />
        <button type="button" className="btn btn-warning">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {flights.map((flight, index) => (
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
