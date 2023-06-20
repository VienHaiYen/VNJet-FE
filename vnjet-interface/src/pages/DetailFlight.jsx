import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";

function DetailFlight() {
  const role = 0;
  const location = useLocation();
  // alert(location.state.id);
  const [airports, setAirports] = React.useState([]);
  const [ticketClasses, setTicketClasses] = React.useState([]);

  React.useEffect(() => {
    getAirports();
    getTicketClasses();
  }, []);
  const fetchAllAirport = async () => {
    const data = await axios
      .get("http://localhost:20001/airport/")
      .then((res) => res.data);
    return data;
  };
  const fetchTicketClasses = async () => {
    const data = await axios
      .get("http://localhost:20001/ticket-class/")
      .then((res) => res.data);
    return data;
  };

  const getAirports = async () => {
    let data = await fetchAllAirport();
    await setAirports(data);
  };
  const getTicketClasses = async () => {
    let data = await fetchTicketClasses();
    await setTicketClasses(data);
    // console.log("ticket-class", data);
  };
  let data = {
    id: "456EkJ",
    beginTime: "20:00",
    endTime: "02:00",
    goDate: "06/07/2023",
    goLocation: "TP.HCM Vietnam",
    desLocation: " Ha Noi Vietnam",
    beginStation: "Sân bay bắt đầu",
    endStation: "Sân bay kết thúc",
    travelTime: "6",
    intermediateStation: ["Tân Sơn Nhất", "Mộc Bài"],
    // ticketPrice: 1000000,
    levelArray: [
      { id: 1, number: 20, label: "Vé hạng nhất", price: 10000000 },
      { id: 2, number: 20, label: "Vé hạng thương gia", price: 8000000 },
      { id: 3, number: 50, label: "Vé hạng phổ thông", price: 1000000 },
    ],
  };
  const customers = [
    {
      id: 1,
      name: "John",
      cmnd: 456789,
      birthday: "1/1/2000",
      gender: "male",
      email: "456@gmail.com",
      phone: 456789123,
      address: "456 Nguyễn Lương Bằng D4",
      ticketType: "Vé phổ thông",
    },
    {
      id: 2,
      name: "Marry",
      cmnd: 456789,
      birthday: "1/1/2000",
      gender: "female",
      email: "477@gmail.com",
      phone: 456789123,
      address: "456 Nguyễn Lương Bằng D4",
      ticketType: "Vé thương gia",
    },
  ];
  return (
    <>
      {/* <h3>Chi tiết chuyến bay</h3> */}
      <h2 className="mb-4">
        Mã số chuyến bay
        <span style={{ color: "red" }}>{" " + location.state.id}</span>
      </h2>
      <div className="row justify-content-start" style={{ fontSize: "1.2rem" }}>
        <div className="col-6">
          <p>
            {data.goLocation} - {data.desLocation}
          </p>
          <p>
            Trạm trung gian:
            {" " + data.beginStation} - {data.endStation}
          </p>
          <p>
            Số lượng ghế trên máy bay:
            {" " +
              data.levelArray.reduce(
                (current, level) => current + level.number,
                0
              )}
          </p>
          <p>
            Số ghế hạng nhất: {data.levelArray[0].number}, Giá vé:{" "}
            {data.levelArray[0].price} VND
          </p>
          <p>
            Số ghế hạng nhất: {data.levelArray[1].number}, Giá vé:{" "}
            {data.levelArray[1].price} VND
          </p>
          <p>
            Số ghế hạng nhất: {data.levelArray[2].number}, Giá vé:{" "}
            {data.levelArray[2].price} VND
          </p>
        </div>
        <div className="col-6">
          <p>{data.goDate}</p>
          <p>
            {data.beginTime} - {data.endTime}
          </p>
        </div>
      </div>
      {role == 0 && (
        <>
          <h3 className="mt-5">Danh sách người đặt vé</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên Khách hàng</th>
                <th scope="col">CMND</th>
                <th scope="col">Ngày sinh</th>
                <th scope="col">Loại vé</th>
                {/* <th scope="col">Handle</th> */}
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{customer.name}</td>
                  <td>{customer.cmnd}</td>
                  <td>{customer.birthday}</td>
                  <td>{customer.ticketType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default DetailFlight;
