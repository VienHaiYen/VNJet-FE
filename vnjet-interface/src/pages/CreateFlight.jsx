import React, { useEffect } from "react";
import Dropdown from "../components/Dropdown";
import { GET } from "../modules";
import axiosClient from "../components/api/axios/axiosClient";

function CreateFlight() {
  const [airports, setAirports] = React.useState([]);
  const [ticketClasses, setTicketClasses] = React.useState([]);
  const [rules, setRules] = React.useState([]);
  // let levelArray = [];
  let levelArray = React.useMemo(() => {
    let results = [];
    for (let index = 0; index < 10; index++) {
      results.push({
        name: "",
        id: "",
        number: "",
        price: "",
      });
    }
    return results;
  }, []);
  let transitionArray = React.useMemo(() => {
    let results = [];
    for (let index = 0; index < 10; index++) {
      results.push({
        id: "",
        time: "",
        note: "",
      });
    }
    return results;
  }, []);
  console.log(789, transitionArray);
  useEffect(() => {
    console.log(levelArray);
  }, [levelArray]);
  useEffect(() => {
    console.log(transitionArray);
  }, [transitionArray]);
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
    GET.getRules(setRules);
    GET.getTicketClasses(setTicketClasses);
    GET.getAirports(setAirports);
  }, []);

  const deleteFlight = async (id) => {
    const data = await axiosClient.delete(`/flight/${id}`);
    alert(data);
    return data;
  };
  const addTransitionAirport = async (flight, airport, duration, note) => {
    const data = await axiosClient.post("/transition-airport/", {
      flightId: flight,
      airportId: airport,
      transitionDuration: Number(duration),
      note: note,
    });
    console.log("fly", flight, airport, duration, note);
    if (data.error) {
      alert(data.error);
      deleteFlight(flight);
    }
    return data;
  };

  const addTicketClass = async (flight, ticketClassId, number, price) => {
    console.log("add ticket", flight, ticketClassId, number, price);
    if (number && price) {
      const data = await axiosClient.put(
        `/flightStatistic/${flight}/${ticketClassId}`,
        {
          numberOfSeat: number != "" ? Number(number) : 0,
          price: price != "" ? Number(price) : 0,
        }
      );
      if (data.error) {
        alert(data.error);
        deleteFlight(flight);
      }
      return data;
    }
  };

  const postFlight = async () => {
    let tmp = new Date(currentFlight.time);
    console.log({
      dateTime: tmp
        .toISOString()
        .replace("00:00:00.000Z", "00:00:00.000+07:00"),
      flightDuration: Number(currentFlight.duration),
      numberOfEmptySeat:
        Number(currentFlight.number1) + Number(currentFlight.number2),
      numberOfBookedSeat: 0,
      fromAirport: currentFlight.from,
      toAirport: currentFlight.to,
    });
    const data = await axiosClient
      .post("/flight", {
        dateTime: tmp
          .toISOString()
          .replace("00:00:00.000Z", "00:00:00.000+07:00"),
        flightDuration: Number(currentFlight.duration),
        numberOfEmptySeat:
          Number(currentFlight.number1) + Number(currentFlight.number2),
        numberOfBookedSeat: 0,
        fromAirport: currentFlight.from,
        toAirport: currentFlight.to,
      })
      .then(async (res) => {
        console.log(res);
        if (res.error) {
          alert(res.error);
        } else if (res._id) {
          alert("Đã thêm chuyến bay");
          for (let index = 0; index < rules.maxTransitions; index++) {
            if (
              transitionArray[index].id &&
              transitionArray[index].time &&
              transitionArray[index].note
            ) {
              let data = await addTransitionAirport(
                res._id,
                transitionArray[index].id,
                transitionArray[index].time,
                transitionArray[index].note
              );
              await console.log(
                data,
                res._id,
                levelArray[index].id,
                levelArray[index].number,
                levelArray[index].price
              );
            }
          }
          for (let index = 0; index < ticketClasses.length; index++) {
            let data = await addTicketClass(
              res._id,
              levelArray[index].id,
              levelArray[index].number,
              levelArray[index].price
            );
            console.log(
              data,
              res._id,
              levelArray[index].id,
              levelArray[index].number,
              levelArray[index].price
            );
          }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentFlight((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(currentFlight);
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
            <label htmlFor="duration">Tổng thời gian (phút)</label>
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
        {ticketClasses.length > 0 &&
          levelArray.length > 0 &&
          ticketClasses.map((ticketClass, index) => {
            levelArray[index].name = ticketClass.name;
            levelArray[index].id = ticketClass._id;
            return (
              <div className="form--row" key={index}>
                <div className="form-row-item">
                  <label htmlFor="_1"> Số lượng vé {ticketClass.name} </label>
                  <input
                    required
                    id="_1"
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      console.log(456, levelArray);
                      levelArray[index].number = e.target.value;
                    }}
                  />
                </div>
                <div className="form-row-item">
                  <label htmlFor="_p1"> Giá vé </label>
                  <input
                    required
                    id="_p1"
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      console.log(456, levelArray);
                      levelArray[index].price = e.target.value;
                    }}
                    name="price1"
                  />
                </div>
              </div>
            );
          })}
        {console.log(rules.maxTransitions, transitionArray.length)}
        {rules.maxTransitions > 0 &&
          transitionArray.length > 0 &&
          Array.from({ length: rules.maxTransitions }).map((i, index) => (
            <div key={index} className="form--row">
              <label className="mr-3 ">Trạm dừng {index + 1}</label>
              <div className="form-row-item">
                <Dropdown
                  // value={transitionArray[index].id}
                  name="transitionAirport1"
                  onChange={(e) => (transitionArray[index].id = e.target.value)}
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
                  // onChange={handleChange}
                  onChange={(e) =>
                    (transitionArray[index].time = e.target.value)
                  }
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
                  // onChange={handleChange}
                  onChange={(e) =>
                    (transitionArray[index].note = e.target.value)
                  }
                  name="note1"
                  placeholder="Ghi chú"
                />
              </div>
            </div>
          ))}
        {/* <div className="form--row">
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
        </div> */}
        <button
          type="submit"
          className="btn btn-warning"
          onClick={handleCreateFlight}
          // onClick={fakesubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateFlight;
