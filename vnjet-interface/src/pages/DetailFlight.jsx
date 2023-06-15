import { useLocation } from "react-router-dom";

function DetailFlight() {
  // const { id } = route.params;
  const location = useLocation();
  // alert(location.state.id);
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

  return (
    <>
      {/* <h3>Chi tiết chuyến bay</h3> */}
      <h2>
        Mã số chuyến bay
        <span style={{ color: "red" }}>{" " + location.state.id}</span>
      </h2>
      <div className="row justify-content-start" style={{ fontSize: "1.2rem" }}>
        <div className="col-6">
          <h5>
            {data.goLocation} - {data.desLocation}
          </h5>
          <h5>
            Trạm trung gian:
            {" " + data.beginStation} - {data.endStation}
          </h5>
          <h5>
            Số lượng ghế trên máy bay:
            {" " +
              data.levelArray.reduce(
                (current, level) => current + level.number,
                0
              )}
          </h5>
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
          <h5>{data.goDate}</h5>
          <h5>
            {data.beginTime} - {data.endTime}
          </h5>
        </div>
      </div>
    </>
  );
}

export default DetailFlight;
