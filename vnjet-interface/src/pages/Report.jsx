import React, { useEffect } from "react";
import axiosClient from "../components/api/axios/axiosClient";
import { useNavigate } from "react-router-dom";

function Report() {
  let navigate = useNavigate();
  const [reports, setReport] = React.useState([]);
  const [currentFlightId, setCurrentFlightId] = React.useState();
  const [currentFlight, setCurrentFlight] = React.useState("");
  useEffect(() => {
    setCurrentFlight("");
    setCurrentFlight("");
    getFlight(currentFlightId);
    // navigateToDetail(currentFlightId);
    // setCurrentFlightId("");
  }, [currentFlightId]);

  useEffect(() => {
    if (
      currentFlight != "" &&
      typeof currentFlight === "object" &&
      !currentFlight.error
    )
      navigateToDetail(currentFlight);
    console.log(7777, currentFlight);
  }, [currentFlight]);

  const navigateToDetail = (flight) => {
    navigate("/detail-flight", {
      state: { flight: flight },
    });
  };
  const fetchAllRoprtFlight = async () => {
    const data = axiosClient.get("/report");
    return data;
  };
  const fetchFlight = async (id) => {
    const data = await axiosClient.get(`/flight/${id}`);
    return data;
  };
  const getAllRoprtFlight = async () => {
    const data = await fetchAllRoprtFlight();
    await setReport(data);
    await console.log(reports);
  };
  const getFlight = async (id) => {
    let data = await fetchFlight(id);
    await setCurrentFlight(data);
    await console.log(currentFlight);
  };
  React.useEffect(() => {
    getAllRoprtFlight();
  }, []);
  return (
    <>
      <h3>Báo cáo của từng chuyến bay</h3>
      {reports ? (
        ""
      ) : (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
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
                <th scope="row">{index}</th>
                <td>{report.dateTime}</td>
                <td>{report.flightId}</td>
                <td>{report.numberOfSeat}</td>
                <td>{report.numberOfTicket}</td>
                <td>{report.percentage}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary mt-2 w-100"
                    onClick={() => setCurrentFlightId(report.flightId)}
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
