import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FlightItem from "../components/FlightItem";

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

let data = {
  id: "456EkJ",
  beginTime: "20:00",
  endTime: "02:00",
  goDate: "06/07/2023",
  goLocation: "TP.HCM Vietnam",
  desLocation: " Ha Noi Vietnam",
  travelTime: "6",
  intermediateStation: ["Tân Sơn Nhất", "Mộc Bài"],
  levelArray: [
    { value: 1, label: "Vé hạng nhất", price: 10000000 },
    { value: 2, label: "Vé hạng thương gia", price: 8000000 },
    { value: 3, label: "Vé hạng phổ thông đặc biệt", price: 5000000 },
    { value: 4, label: "Vé hạng phổ thông", price: 1000000 },
  ],
};

let flights = [
  {
    id: "456EkJ",
    beginTime: "20:00",
    endTime: "02:00",
    goDate: "06/07/2023",
    goLocation: "TP.HCM Vietnam",
    desLocation: " Ha Noi Vietnam",
    travelTime: "6",
    intermediateStation: ["Tân Sơn Nhất", "Mộc Bài"],
    // ticketPrice: 1000000,
    levelArray: [
      { value: 1, label: "Vé hạng nhất", price: 10000000 },
      { value: 2, label: "Vé hạng thương gia", price: 8000000 },
      { value: 3, label: "Vé hạng phổ thông đặc biệt", price: 5000000 },
      { value: 4, label: "Vé hạng phổ thông", price: 1000000 },
    ],
  },
  {
    id: "789456",
    beginTime: "20:00",
    endTime: "02:00",
    goDate: "06/07/2023",
    goLocation: "TP.HCM Vietnam",
    desLocation: " Ha Noi Vietnam",
    travelTime: "6",
    intermediateStation: ["Tân Sơn Nhất", "Mộc Bài"],
    // ticketPrice: 1000000,
    levelArray: [
      { value: 1, label: "Vé hạng nhất", price: 10000000 },
      { value: 2, label: "Vé hạng thương gia", price: 8000000 },
      { value: 3, label: "Vé hạng phổ thông đặc biệt", price: 5000000 },
    ],
  },
];

function Home() {
  let navigate = useNavigate();
  const role = 0;
  const [startDate, setStartDate] = React.useState(new Date());
  const [basicModal, setBasicModal] = React.useState(false);
  const inputRef = React.useRef(null);

  const toggleShow = () => setBasicModal(!basicModal);
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
  const handleDeleteFlight = (id) => {
    alert("Xóa chuyến bay" + id);
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
                  options={data.levelArray}
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
      <h3>Tìm kiếm chuyến đi</h3>

      <div className="d-flex">
        <select
          required
          id="gender"
          className="form-control mr-3"
          // onChange={handleChange}
          // value={info.gender}
          name="gender"
        >
          <option value="" defaultValue style={{ display: "none" }}>
            Xuất phát từ
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          required
          id="gender"
          className="form-control mr-3"
          // onChange={handleChange}
          // value={info.gender}
          name="gender"
        >
          <option value="" defaultValue style={{ display: "none" }}>
            Đến
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />

        <button type="button" className="btn btn-warning">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {flights.map((flight, index) => (
        <FlightItem
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
