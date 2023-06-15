function MyFlightItem({ data, showInfo, cancelTicket }) {
  return (
    <div className="rounded-3 border border-secondary mt-3 p-4">
      <div className="d-flex justify-content-between">
        <div>
          <span style={{ color: "red" }}>Số hiệu: {data.id}</span>
          <h5>
            {data.beginTime} - {data.endTime}
          </h5>
          <h6>{data.goDate}</h6>
          <span>
            {data.goLocation} - {data.desLocation}
          </span>
        </div>
        <div className="d-flex flex-column justify-content-start">
          <h6>
            Khách hàng: {data.customerName} - {data.birthYear}
          </h6>
          {/* <h6>Trạm xuất phát: {data.beginStation}</h6>
          <h6>Trạm dừng: {data.endStation}</h6> */}
        </div>
        <div className="border border-start h-100">
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={() => {
              showInfo(data.id);
            }}
          >
            Chi tiết
          </button>
          <button
            type="button"
            className="btn btn-danger w-100 mt-3"
            onClick={() => cancelTicket(data.id)}
          >
            Hủy vé
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyFlightItem;
