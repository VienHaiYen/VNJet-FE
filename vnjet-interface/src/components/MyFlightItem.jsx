function MyFlightItem({ data, showInfo, cancelTicket }) {
  const chooseItem = () => {
    showInfo(data.id);
  };
  const cancle = () => {
    cancelTicket(data.id);
  };
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
        <div className="d-flex flex-column justify-content-center">
          <h6>
            {data.customerName} - {data.birthYear}
          </h6>
          <h6>Trạm xuất phát: {data.beginStation}</h6>
          <h6>Trạm dừng: {data.endStation}</h6>
        </div>
        <div className="border border-start h-100">
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={chooseItem}
          >
            Đặt vé
          </button>
          <button
            type="button"
            className="btn btn-danger w-100 mt-3"
            onClick={cancle}
          >
            Hủy vé
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyFlightItem;
