import React from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { GET } from "../modules";
import Spinner from "../components/Spinner";
import { UTIL } from "../utils";

function Report() {
  const [reports, setReport] = React.useState([]);
  const [currentFlightId, setCurrentFlightId] = React.useState();
  const [currentFlight, setCurrentFlight] = React.useState("");
  const [airports, setAirports] = React.useState([]);
  const [transitions, setTransitions] = React.useState([]);
  const [seats, setSeats] = React.useState([]);

  const [showDetail, setShowDetail] = React.useState(false);

  React.useEffect(() => {
    if (currentFlightId) {
      setCurrentFlight("");
      GET.getFlight(currentFlightId, setCurrentFlight);
      GET.getTransitions(currentFlightId, setTransitions);
      GET.getSeats(currentFlightId, setSeats);
    }
  }, [currentFlightId]);

  React.useEffect(() => {
    GET.getReportFlight(setReport);
    GET.getAirports(setAirports);
  }, []);
  return (
    <>
      {/* THÔNG TIN CHI TIẾT */}
      <MDBModal show={showDetail} setShow={setShowDetail} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Thông tin chuyến bay</MDBModalTitle>
            </MDBModalHeader>
            {currentFlight && (
              <MDBModalBody>
                <h6>
                  Mã số chuyến bay
                  <span style={{ color: "red" }}>
                    {" " + currentFlight._id}
                  </span>
                </h6>
                <h6>
                  Sân bay bắt đầu:
                  <span style={{ color: "red" }}>
                    {" " +
                      UTIL.convertToAirportName(
                        airports,
                        currentFlight.fromAirport
                      )}
                  </span>
                </h6>
                <h6>
                  Sân bay kết thúc:
                  <span style={{ color: "red" }}>
                    {" " +
                      UTIL.convertToAirportName(
                        airports,
                        currentFlight.toAirport
                      )}
                  </span>
                </h6>
                <h6>
                  Thời điểm đi:
                  <span style={{ color: "red" }}>
                    {" " + UTIL.getDateTimeFormat(currentFlight.dateTime)},{" "}
                    {UTIL.getDateTimeFormat(currentFlight.dateTime)}
                  </span>
                </h6>
                <h6>
                  {transitions.length > 0 && <b>Trạm trung gian:</b>}
                  {transitions.length > 0 &&
                    transitions.map((transition, index) => (
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
                  {seats.length > 0 && <b>Chỗ ngồi: </b>}
                  {seats.length > 0 &&
                    seats.map(
                      (seat, index) =>
                        seat.numberOfSeat !== 0 && (
                          <li key={index} style={{ listStyleType: "circle" }}>
                            {seat.nameOfTicketClass}: {seat.numberOfEmptySeat}/
                            {seat.numberOfSeat} vé trống, Giá tiền: {seat.price}{" "}
                            VND
                          </li>
                        )
                    )}
                  {seats.length > 0 &&
                    seats.filter((crr) => crr.numberOfSeat !== 0).length ===
                      0 && (
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
      <h3>Báo cáo của từng chuyến bay</h3>
      {reports.length < 1 && <Spinner />}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Thời gian</th>
            <th scope="col">Mã Chuyến bay</th>
            <th scope="col">Số lượng vé</th>
            <th scope="col">Số lượng đã bán</th>
            <th scope="col">Phần trăm doanh thu đạt được</th>
            <th scope="col">Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 &&
            reports.map((report, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{report.dateTime}</td>
                <td>{report.flightId}</td>
                <td>{report.numberOfSeat}</td>
                <td>{report.numberOfTicket}</td>
                <td>{report.percentage}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary mt-2 w-100"
                    onClick={() => {
                      setCurrentFlightId(report.flightId);
                      setShowDetail(true);
                    }}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Report;
