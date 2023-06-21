import React from "react";
import Dropdown from "../components/Dropdown";
import axiosClient from "../components/api/axios/axiosClient";

function CreateFlight() {
  const [airports, setAirports] = React.useState([]);
  const [ticketClasses, setTicketClasses] = React.useState([]);
  const [currentFlight, setCurrentFlight] = React.useState({
    from: "",
    to: "",
    time: "",
    duration: "",
    number1: "",
    price1: "",
    number2: "",
    price2: "",

    transitionAirport1: "",
    transitionAirport2: "",
    transitionAirport3: "",
    transitionTime1: "",
    transitionTime2: "",
    transitionTime3: "",
    note1: "",
    note2: "",
    note3: "",
  });

  React.useEffect(() => {
    getAirports();
    getTicketClasses();
  }, []);
  const fetchAllAirport = async () => {
    const data = await axiosClient.get("http://localhost:20001/airport/");
    return data;
  };
  const fetchTicketClasses = async () => {
    const data = await axiosClient.get("http://localhost:20001/ticket-class/");
    return data;
  };
  const addTransitionAirport = async (flight, airport, duration, note) => {
    const data = await axiosClient.post(
      "http://localhost:20001/transition-airport/",
      {
        flightId: flight,
        airportId: airport,
        transitionDuration: Number(duration),
        note: note,
      }
    );
    return data;
  };

  const addTicketClass = async (flight, ticketClass, number, price) => {
    console.log("add ticket", flight, ticketClass._id, number, price);
    const data = await axiosClient.put(
      `http://localhost:20001/flightStatistic/${flight}/${ticketClass._id}`,
      {
        numberOfSeat: number != "" ? Number(number) : 0,
        price: price != "" ? Number(price) : 0,
      }
    );
    console.log("sau khi them ticketclass", data);
    return data;
  };

  const postFlight = async () => {
    console.log({
      dateTime: currentFlight.time,
      flightDuration: Number(currentFlight.duration),
      numberOfEmptySeat:
        Number(currentFlight.number1) + Number(currentFlight.number2),
      numberOfBookedSeat: 0,
      fromAirport: currentFlight.from,
      toAirport: currentFlight.to,
    });
    const data = await axiosClient
      .post("http://localhost:20001/flight", {
        dateTime: currentFlight.time,
        flightDuration: Number(currentFlight.duration),
        numberOfEmptySeat:
          Number(currentFlight.number1) + Number(currentFlight.number2),
        numberOfBookedSeat: 0,
        fromAirport: currentFlight.from,
        toAirport: currentFlight.to,
      })
      .then((res) => {
        console.log(res);
        if (res._id) {
          if (
            currentFlight.transitionAirport1 != "" &&
            currentFlight.transitionTime1 != ""
          ) {
            addTransitionAirport(
              res._id,
              currentFlight.transitionAirport1,
              currentFlight.transitionTime1,
              currentFlight.note1
            );
          }
          if (
            currentFlight.transitionAirport2 != "" &&
            currentFlight.transitionTime2 != ""
          ) {
            addTransitionAirport(
              res.data._id,
              currentFlight.transitionAirport2,
              currentFlight.transitionTime2,
              currentFlight.note2
            );
          }
          if (
            currentFlight.transitionAirport3 != "" &&
            currentFlight.transitionTime3 != ""
          ) {
            addTransitionAirport(
              res.data._id,
              currentFlight.transitionAirport3,
              currentFlight.transitionTime3,
              currentFlight.note3
            );
          }
          addTicketClass(
            res._id,
            ticketClasses[0],
            currentFlight.number1,
            currentFlight.price1
          );
          addTicketClass(
            res._id,
            ticketClasses[1],
            currentFlight.number2,
            currentFlight.price2
          );
          alert("Đã thêm chuyến bay");
        } else {
          alert("Lỗi");
        }
        return res;
      });
    return data;
  };
  const handleCreateFlight = async (e) => {
    e.preventDefault();
    await postFlight();
    // console.log(456, data);
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentFlight((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(currentFlight);
  };

  return (
    <div className="create-flight">
      <form className="w-75" style={{ margin: "0 auto" }}>
        <div className="form--row">
          <div className="form-row-item">
            <label htmlFor="from"> Sân bay đi</label>
            <Dropdown
              value={currentFlight.from}
              name="from"
              onChange={handleChange}
              options={airports}
            />
          </div>
          <div className="form-row-item">
            <label htmlFor="to"> Sân bay đến </label>
            <Dropdown
              value={currentFlight.to}
              name="to"
              onChange={handleChange}
              options={airports}
            />
          </div>
        </div>
        <div className="form--row">
          <div className="form-row-item w-25">
            <label htmlFor="time"> Thời gian đi </label>
            <input
              required
              id="time"
              type="datetime-local"
              className="form-control"
              onChange={handleChange}
              value={currentFlight.time}
              name="time"
            />
          </div>
          <div className="form-row-item">
            <label htmlFor="duration">Tổng thời gian</label>
            <input
              required
              id="duration"
              type="number"
              className="form-control"
              onChange={handleChange}
              value={currentFlight.duration}
              name="duration"
            />
          </div>
        </div>
        <div className="form--row">
          <div className="form-row-item">
            <label htmlFor="_1"> Số lượng hạng vé hạng nhất </label>
            <input
              required
              id="_1"
              type="number"
              className="form-control"
              onChange={handleChange}
              value={currentFlight.number1}
              name="number1"
            />
          </div>
          <div className="form-row-item">
            <label htmlFor="_p1"> Giá vé </label>
            <input
              required
              id="_p1"
              type="number"
              className="form-control"
              onChange={handleChange}
              value={currentFlight.price1}
              name="price1"
            />
          </div>
        </div>

        <div className="form--row">
          <div className="form-row-item">
            <label htmlFor="_2"> Số lượng hạng vé hạng hai </label>
            <input
              required
              id="_2"
              type="number"
              className="form-control"
              onChange={handleChange}
              value={currentFlight.number2}
              name="number2"
            />
          </div>
          <div className="form-row-item">
            <label htmlFor="_p2"> Giá vé </label>
            <input
              required
              id="_p2"
              type="number"
              className="form-control"
              onChange={handleChange}
              value={currentFlight.price2}
              name="price2"
            />
          </div>
        </div>
        <div className="form--row">
          <label className="mr-3 ">Trạm dừng 1</label>
          <div className="form-row-item">
            <Dropdown
              value={currentFlight.transitionAirport1}
              name="transitionAirport1"
              onChange={handleChange}
              options={airports.filter((item) => {
                return (
                  item._id !== currentFlight.from &&
                  item._id !== currentFlight.to
                );
              })}
            />
          </div>
          <div className="form-row-item">
            <input
              required
              id="_2"
              type="number"
              className="form-control"
              onChange={handleChange}
              value={currentFlight.transitionTime1}
              name="transitionTime1"
              placeholder="Thời gian dừng (phút)"
            />
          </div>
          <div className="form-row-item">
            <input
              required
              id="_2"
              type="text"
              className="form-control"
              onChange={handleChange}
              value={currentFlight.note1}
              name="note1"
              placeholder="Ghi chú"
            />
          </div>
        </div>
        <div className="form--row">
          <label className="mr-3">Trạm dừng 2</label>
          <div className="form-row-item">
            <Dropdown
              value={currentFlight.transitionAirport2}
              name="transitionAirport2"
              onChange={handleChange}
              options={airports.filter((item) => {
                return (
                  item._id !== currentFlight.from &&
                  item._id !== currentFlight.to
                );
              })}
            />
          </div>
          <div className="form-row-item">
            <input
              required
              id="_2"
              type="number"
              className="form-control"
              onChange={handleChange}
              value={currentFlight.transitionTime2}
              name="transitionTime2"
              placeholder="Thời gian dừng (phút)"
            />
          </div>
          <div className="form-row-item">
            <input
              required
              id="_2"
              type="text"
              className="form-control"
              onChange={handleChange}
              value={currentFlight.note2}
              name="note2"
              placeholder="Ghi chú"
            />
          </div>
        </div>
        <div className="form--row">
          <label className="mr-3">Trạm dừng 3</label>
          <div className="form-row-item">
            <Dropdown
              value={currentFlight.transitionAirport3}
              name="transitionAirport3"
              onChange={handleChange}
              options={airports.filter((item) => {
                return (
                  item._id !== currentFlight.from &&
                  item._id !== currentFlight.to
                );
              })}
            />
          </div>
          <div className="form-row-item">
            <input
              required
              id="_2"
              type="number"
              className="form-control"
              onChange={handleChange}
              value={currentFlight.transitionTime3}
              name="transitionTime3"
              placeholder="Thời gian dừng (phút)"
            />
          </div>
          <div className="form-row-item">
            <input
              required
              id="_2"
              type="text"
              className="form-control"
              onChange={handleChange}
              value={currentFlight.note3}
              name="note3"
              placeholder="Ghi chú"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-warning"
          onClick={handleCreateFlight}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateFlight;
