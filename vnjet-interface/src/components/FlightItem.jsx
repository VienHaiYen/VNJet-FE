import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FlightItem({
  data,
  bookTicket,
  changeFlight,
  deleteFlight,
  showDetailFlight,
  role,
}) {
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
        <div className="h-100">
          <h3>
            {new Intl.NumberFormat().format(
              data.levelArray[data.levelArray.length - 1].price
            )}{" "}
            VND
          </h3>
          {role == 1 ? (
            <button
              type="button"
              className="btn btn-warning w-100"
              onClick={() => chooseItem(data.id)}
            >
              Đặt vé
            </button>
          ) : (
            <>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-warning w-75"
                  onClick={() => changeFlight(data.id)}
                >
                  Chỉnh sửa
                </button>
                <button
                  type="button"
                  className="btn btn-dark ml-2 w-25"
                  onClick={deleteFlight}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <button
                type="button"
                className="btn btn-primary mt-2 w-100"
                onClick={() => showDetailFlight(data.id)}
              >
                Chi tiết
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlightItem;
