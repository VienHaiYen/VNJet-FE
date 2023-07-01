import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
// import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import FlightItem from "../components/FlightItem";
import { GET, POST, PUT, DELETE } from "../modules";
import { UTIL } from "../utils";
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
import { useGlobal } from "../context/context";

function Home() {
  const { authenticate } = useGlobal();
  const user = authenticate.selectUser();
  const role = user.role == "admin" ? 0 : 1;
  const [currentID, setCurrentID] = React.useState("");

  const [showBookingTicket, setShowBookingTicket] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [showDetail, setShowDetail] = React.useState(false);

  const [flights, setFlights] = React.useState([]);
  const [airports, setAirports] = React.useState([]);
  const [seats, setSeats] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [flightMetaData, setFlightMetaData] = React.useState(1);
  const [pageNum, setPageNum] = React.useState([]);
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
  const [currentDetail, setCurrentDetail] = React.useState();

  const submitEdit = async () => {
    await PUT.editFlight(currentID, editState).then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        alert("Thay đổi xong !");
        GET.getFlights(page, setFlightMetaData, setFlights);
        setShowEdit(false);
      }
    });
  };

  const submitDelete = async (id) => {
    let data = await DELETE.deleteFlight(id);
    if (data.error) {
      alert(data.error);
    } else {
      setShowDelete(false);
      GET.getFlights(page, setFlightMetaData, setFlights);
    }
  };

  const handleChooseTicket = (id) => {
    setShowBookingTicket(true);
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

  const handleShowDetail = (curr) => {
    setCurrentID(curr.id);
    setCurrentDetail(curr);
    setShowDetail(true);
  };

  React.useEffect(() => {
    GET.getFlights(1, setFlightMetaData, setFlights);
    GET.getAirports(setAirports);
  }, []);

  React.useEffect(() => {
    if (currentID) {
      GET.getSeats(currentID, setSeats);
    }
  }, [currentID]);

  React.useEffect(() => {
    GET.getFlights(page, setFlightMetaData, setFlights);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [page]);

  React.useEffect(() => {
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
  }, [flightMetaData]);

  return (
    <div>
      {/* ĐẶT VÉ CHUYẾN BAY */}
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
                  onChange={(e) => UTIL.handleOnChange(e, setCustomerInfo)}
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
                onClick={() => {
                  setShowBookingTicket(false);
                  setCustomerInfo({
                    ticketClass: "",
                  });
                }}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() =>
                  POST.buyTicket(
                    currentID,
                    customerInfo.ticketClass,
                    setShowBookingTicket
                  )
                }
              >
                Đồng ý
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      {/* XÓA CHUYẾN BAY */}
      <MDBModal show={showDelete} setShow={setShowDelete} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Xóa chuyến bay</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              Bạn có chắc chắn muốn xóa chuyến bay
              {" " + UTIL.convertToAirportName(airports, currentID)} không ?
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
                onClick={() => submitDelete(currentID)}
              >
                Đồng ý
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      {/* CHỈNH SỬA CHUYẾN BAY */}
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
                  onChange={(e) => UTIL.handleOnChange(e, setEditState)}
                  name="fromAirport"
                  options={airports}
                />

                <label htmlFor="to">Đi đến</label>
                <Dropdown
                  value={editState.toAirport}
                  onChange={(e) => UTIL.handleOnChange(e, setEditState)}
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
                  onChange={(e) => UTIL.handleOnChange(e, setEditState)}
                />
                <label htmlFor="flightDuration">Trong khoảng (phút)</label>
                <input
                  type="number"
                  id="flightDuration"
                  className="form-control"
                  value={editState.flightDuration}
                  name="flightDuration"
                  onChange={(e) => UTIL.handleOnChange(e, setEditState)}
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

      {/* THÔNG TIN CHUYẾN BAY */}
      <MDBModal show={showDetail} setShow={setShowDetail} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Thông tin chuyến bay</MDBModalTitle>
            </MDBModalHeader>
            {currentDetail && (
              <MDBModalBody>
                <h6>
                  Mã số chuyến bay
                  <span style={{ color: "red" }}>{" " + currentDetail.id}</span>
                </h6>
                <h6>
                  Sân bay bắt đầu:
                  <span style={{ color: "red" }}>
                    {" " + currentDetail.from}
                  </span>
                </h6>
                <h6>
                  Sân bay kết thúc:
                  <span style={{ color: "red" }}>{" " + currentDetail.to}</span>
                </h6>
                <h6>
                  Thời điểm đi:
                  <span style={{ color: "red" }}>
                    {" " + currentDetail.dateTime}, {currentDetail.date}
                  </span>
                </h6>
                <h6>
                  {currentDetail.transition.length > 0 && (
                    <b>Trạm trung gian:</b>
                  )}
                  {currentDetail.transition.length > 0 &&
                    currentDetail.transition.map((transition, index) => (
                      <li key={index} style={{ listStyleType: "circle" }}>
                        {UTIL.convertToAirportName(
                          airports,
                          transition.airportId
                        )}
                        , Thời gian: {transition.transitionDuration} phút, Ghi
                        chú: {transition.note}
                      </li>
                    ))}
                </h6>
                <h6>
                  {currentDetail.seats.length > 0 && <b>Chỗ ngồi: </b>}
                  {currentDetail.seats.length > 0 &&
                    currentDetail.seats.map(
                      (seat, index) =>
                        seat.numberOfSeat !== 0 && (
                          <li key={index} style={{ listStyleType: "circle" }}>
                            {seat.nameOfTicketClass}: {seat.numberOfEmptySeat}/
                            {seat.numberOfSeat} vé trống, Giá tiền: {seat.price}{" "}
                            VND
                          </li>
                        )
                    )}
                  {currentDetail.seats.length > 0 &&
                    currentDetail.seats.filter((crr) => crr.numberOfSeat !== 0)
                      .length === 0 && (
                      <span style={{ color: "red" }}>
                        Không có vé cho chuyến bay này
                      </span>
                    )}
                </h6>
              </MDBModalBody>
            )}
            <MDBModalFooter>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowDetail(false)}
              >
                Đóng
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
          onChange={(e) => UTIL.handleOnChange(e, setFindingState)}
          name="from"
          options={airports}
        />
        <label>Đến</label>
        <Dropdown
          value={findingState.to}
          onChange={(e) => UTIL.handleOnChange(e, setFindingState)}
          name="to"
          options={airports}
        />
        <label>Đi từ</label>
        <input
          required
          id="date"
          type="date"
          className="form-control mr-5"
          onChange={(e) => UTIL.handleOnChange(e, setFindingState)}
          name="date"
          value={findingState.date}
        />
        <button
          type="button"
          className="btn btn-warning"
          onClick={async () =>
            await GET.searchFlight(findingState, setFlightMetaData, setFlights)
          }
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {flights &&
        flights.length > 0 &&
        flights.map((flight, index) => (
          <FlightItem
            flights={flights}
            flightId={flight._id}
            bookTicket={handleChooseTicket}
            changeFlight={handleEditFlight}
            deleteFlight={handleDeleteFlight}
            showDetailFlight={handleShowDetail}
            key={index}
            role={role}
          />
        ))}
      {pageNum.length > 0 && (
        <Pagination className="mt-3">{pageNum}</Pagination>
      )}
    </div>
  );
}

export default Home;
