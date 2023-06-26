import React, { useEffect } from "react";
import axiosClient from "../components/api/axios/axiosClient";
import { useNavigate } from "react-router-dom";

function MonthLyReport() {
  let navigate = useNavigate();
  const [yearReports, setYearReport] = React.useState([]);
  const [currentFlightId, setCurrentFlightId] = React.useState();
  const [year, setYear] = React.useState();
  const [currentFlight, setCurrentFlight] = React.useState("");
  useEffect(() => {
    setCurrentFlight("");
    getFlight(currentFlightId);
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
    await setYearReport(data);
    await console.log(yearReports);
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
      <form>
        <label>Nhập năm muốn báo cáo</label>
        <div className="d-flex">
          <input
            style={{ maxWidth: "300px" }}
            className="form-control ml-5"
            type="number"
            onChange={(e) => setYear(e.target.value)}
            value={year}
          />
          <button className="btn btn-warning">Submit</button>
        </div>
      </form>
      {yearReports.length < 1 && (
        <div className="spinner-border text-primary " role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Thời gian</th>
            <th scope="col">Số lượng chuyến bay</th>
            <th scope="col">Số lượng vé</th>
            <th scope="col">Số lượng đã bán</th>
            <th scope="col">Phần trăm doanh thu đạt được</th>
          </tr>
        </thead>
        <tbody>
          {yearReports.length > 0 &&
            yearReports.map((report, index) => (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{report.dateTime}</td>
                <td>{report.flightId}</td>
                <td>{report.numberOfSeat}</td>
                <td>{report.numberOfTicket}</td>
                <td>{report.percentage}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default MonthLyReport;
