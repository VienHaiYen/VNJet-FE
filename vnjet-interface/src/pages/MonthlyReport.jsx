import React from "react";
import axiosClient from "../components/api/axios/axiosClient";

function MonthLyReport() {
  const [yearReports, setYearReport] = React.useState();
  const [year, setYear] = React.useState();
  const fetchYearReport = async (_year) => {
    console.log("year", _year);
    const data = axiosClient.get(`/report/${_year}`);
    return data;
  };

  const getAllRoprtFlight = async (year) => {
    const data = await fetchYearReport(year);
    setYearReport(data);
    console.log(data);
  };
  const submitYear = async () => {
    console.log(year);
    await getAllRoprtFlight(year);
  };

  return (
    <>
      <h3>Báo cáo của từng chuyến bay</h3>
      <label>Nhập năm muốn báo cáo</label>
      <div className="d-flex mb-5">
        <input
          style={{ maxWidth: "300px" }}
          className="form-control ml-5"
          type="number"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />
        <button className="btn btn-warning" onClick={submitYear}>
          Submit
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Thời gian</th>
            <th scope="col">Số lượng chuyến bay</th>
            <th scope="col">Số lượng bán ra</th>
            <th scope="col">Số lượng vé</th>
            <th scope="col">Phần trăm vé bán ra</th>
            <th scope="col">Doanh thu</th>
          </tr>
        </thead>
        <tbody>
          {yearReports &&
            Object.keys(yearReports).length > 0 &&
            Object.keys(yearReports).map((key, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>Tháng {key}</td>
                <td>{yearReports[key].numberOfFlight}</td>
                <td>{yearReports[key].numberOfTicket}</td>
                <td>{yearReports[key].numberOfSeat}</td>
                <td>{yearReports[key].percentage}</td>
                <td>{yearReports[key].revenue} VND</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default MonthLyReport;
