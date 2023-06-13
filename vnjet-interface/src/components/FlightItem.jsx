function FlightItem({ data, bookTicket }) {
  const chooseItem = () => {
    bookTicket(data.id);
  };
  return (
    <div className="rounded-3 border border-secondary mt-3 p-4">
      <div className="d-flex justify-content-between">
        <div>
          <span style={{ color: "red" }}>Số hiệu: {data.id}</span>
          <h5>
            {data.beginTime} - {data.endTime}
          </h5>
          <span>
            {data.goLocation} - {data.desLocation}
          </span>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <h6>{data.goDate}</h6>
          <h6>{data.intermediateStation.length} trạm trung gian</h6>
          <h6>Tổng thời gian di chuyển: {data.travelTime} h</h6>
        </div>
        <div className="border border-start h-100">
          <h3>
            {new Intl.NumberFormat().format(
              data.levelArray[data.levelArray.length - 1].price
            )}{" "}
            VND
          </h3>
          <button
            type="button"
            className="btn btn-warning w-100"
            onClick={chooseItem}
          >
            Đặt vé
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlightItem;
