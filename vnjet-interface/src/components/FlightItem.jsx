import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function getDateTimeFormat(_date) {
  var date = new Date(_date);
  var dd = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  var mm = date.getMonth() > 9 ? date.getMonth() : "0" + (date.getMonth() + 1);
  var yyyy = date.getFullYear();
  return dd + "/" + mm + "/" + yyyy;
}
function getTimeFormat(_date) {
  var date = new Date(_date);
  var hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
  var minus =
    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
  return hour + ":" + minus;
}
function FlightItem({
  from,
  to,
  data,
  bookTicket,
  changeFlight,
  deleteFlight,
  showDetailFlight,
  role,
}) {
  const chooseItem = () => {
    bookTicket(data._id);
  };

  return (
    <div className="rounded-3 border border-secondary mt-3 p-4">
      <div className="d-flex justify-content-between">
        <div>
          <span style={{ color: "red" }}>Số hiệu: {data._id}</span>
          <h4>{getTimeFormat(data.dateTime)}</h4>
          <h5 style={{ color: "orange" }}>
            {from} - {to}
          </h5>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <h6>{getDateTimeFormat(data.dateTime)}</h6>
          {/* <h6>{data.intermediateStation.length} trạm trung gian</h6> */}
          <h6>Tổng thời gian di chuyển: {data.flightDuration} phút</h6>
        </div>
        <div className="h-100">
          {/* <h3>
            {new Intl.NumberFormat().format(
              data.levelArray[data.levelArray.length - 1].price
            )}{" "}
            VND
          </h3> */}
          {role == 1 ? (
            <button
              type="button"
              className="btn btn-warning w-100"
              onClick={() => chooseItem(data._id)}
            >
              Đặt vé
            </button>
          ) : (
            <>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-warning w-75"
                  onClick={() => changeFlight(data._id)}
                >
                  Chỉnh sửa
                </button>
                <button
                  type="button"
                  className="btn btn-dark ml-2 w-25"
                  onClick={() => deleteFlight(data._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <button
                type="button"
                className="btn btn-primary mt-2 w-100"
                onClick={() => showDetailFlight(data)}
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
