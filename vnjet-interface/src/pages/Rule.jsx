import axiosClient from "../components/api/axios/axiosClient";
import React from "react";

function Rule() {
  const [ticketClasses, setTicketClasses] = React.useState([]);
  const [rules, setRules] = React.useState([]);
  const [ruleName, setRuleName] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  const [addedTicketClassName, setAddedTicketClassName] = React.useState("");
  const fetchRules = async () => {
    const data = await axiosClient.get("/terms");
    return data;
  };
  const fetchTicketClasses = async () => {
    const data = await axiosClient.get("/ticket-class/");
    return data;
  };
  const changeRule = async () => {
    console.log("rule change", ruleName, Number(inputValue));
    if (inputValue != "") {
      const data = await axiosClient.post("/terms/change", {
        name: ruleName,
        value: Number(inputValue),
      });
      await console.log(data);
    } else {
      alert("Vui lòng nhập đủ thông tin");
    }
  };
  const addTicketClass = async () => {
    const data = await axiosClient.post("/ticket-class", {
      name: addedTicketClassName,
    });
    console.log(data);
  };
  const deleteTicketClass = async (id) => {
    const data = await axiosClient.delete(`/ticket-class/${id}`);
    console.log(data);
  };
  const getRules = async () => {
    let data = await fetchRules();
    await setRules(data);
    await console.log(rules);
  };
  const getTicketClasses = async () => {
    let data = await fetchTicketClasses();
    setTicketClasses(data);
    console.log(ticketClasses);
  };

  const handleChangeProperty = async () => {
    let data = await changeRule();
    console.log(data);
    await getRules();
  };
  const handleAddedTicketClass = async () => {
    let data = await addTicketClass();
    await console.log(data);
    await getTicketClasses();
    await getRules();
  };
  const handleDeleteTicketClass = async (id) => {
    let data = await deleteTicketClass(id);
    await console.log(data);
    await getTicketClasses();
    await getRules();
  };
  React.useEffect(() => {
    setInputValue("");
    setAddedTicketClassName("");
  }, [ruleName]);
  React.useEffect(() => {}, [addedTicketClassName]);
  React.useEffect(() => {
    getRules();
    getTicketClasses();
  }, []);
  return (
    <>
      <h3>Rule page</h3>
      {rules.length < 1 && (
        <div className="spinner-border text-primary " role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <div className="form--row d-flex">
        <div className="form-row-item col-6 m-2">
          <label htmlFor="">
            Số lượng sân bay cao nhất: <b>{rules.quantityAirports}</b>
          </label>
        </div>
        <div className="form-row-item col-6 m-2">
          <label htmlFor="">
            Thời gian bay tối thiểu: <b>{rules.minTimeFlight} phút</b>
          </label>
        </div>
      </div>
      <div className="form--row d-flex">
        <div className="form-row-item col-6 m-2">
          <label htmlFor="">
            Thời gian dừng tối đa: <b>{rules.maxPauseTime} phút</b>
          </label>
        </div>
        <div className="form-row-item col-6 m-2">
          <label htmlFor="">
            Thời gian dừng tối thiểu: <b>{rules.minPauseTime} phút</b>
          </label>
        </div>
      </div>
      <div className="form--row d-flex">
        <div className="form-row-item col-6 m-2">
          <label htmlFor="">
            Số trạm dừng tối đa: <b>{rules.maxTransitions}</b>
          </label>
        </div>
        <div className="form-row-item col-6 m-2">
          <label htmlFor="">
            Số lượng hạng vé: <b>{ticketClasses.length}</b>
          </label>
        </div>
      </div>
      <div className="form--row d-flex">
        <div className="form-row-item col-6 m-2">
          <label htmlFor="">
            Thời gian chậm nhất để đặt vé:{" "}
            <b>Trước {rules.latestBookingTime} tiếng</b>
          </label>
        </div>
        <div className="form-row-item col-6 m-2">
          <label htmlFor="">
            Thời gian chậm nhất để hủy vé:{" "}
            <b>Trước {rules.latestCancellationTime} tiếng</b>
          </label>
        </div>
      </div>
      <br></br>
      <select
        className="form-select mb-3"
        style={{ width: "300px" }}
        aria-label="Default select example"
        onChange={(e) => {
          setRuleName(e.target.value);
          console.log(ruleName);
        }}
      >
        <option value="maxTransitions" disabled selected>
          Nhập thay đổi
        </option>
        <option value="quantityAirports"> Số lượng sân bay cao nhất</option>
        <option value="minTimeFlight">Thời gian bay tối thiểu</option>
        <option value="maxPauseTime">Thời gian dừng tối đa</option>
        <option value="minPauseTime">Thời gian dừng tối thiểu</option>
        <option value="maxTransitions">Số trạm dừng tối đa</option>
        <option value="latestBookingTime">Thời gian trễ nhất đặt vé</option>
        <option value="latestCancellationTime">
          Thời gian trễ nhất hủy vé
        </option>
        <option value="quantityClasses">Hạng vé</option>
      </select>
      <div className="">
        {ruleName != "quantityClasses" && (
          <>
            <input
              style={{ maxWidth: "600px" }}
              className="form-control"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              type="number"
              placeholder="Nhập thay đổi"
            />
            <button
              className="btn btn-warning mt-3"
              onClick={handleChangeProperty}
            >
              Thay đổi
            </button>
          </>
        )}
        {ruleName == "quantityClasses" && (
          <>
            <div className="d-flex mb-3">
              <input
                style={{ maxWidth: "600px" }}
                className="form-control"
                onChange={(e) => setAddedTicketClassName(e.target.value)}
                value={addedTicketClassName}
                type="text"
                placeholder="Nhập tên hạng vé muốn thêm"
              />
              <button
                className="btn btn-warning ml-3"
                onClick={handleAddedTicketClass}
              >
                Thêm
              </button>
            </div>
            {ticketClasses.length > 0 &&
              ticketClasses.map((ticketClass, index) => (
                <div key={index} className="ml-5">
                  <li>
                    {ticketClass.name + "    "}
                    <button
                      onClick={() => handleDeleteTicketClass(ticketClass._id)}
                      style={{ marginLeft: "3rem" }}
                    >
                      {"   "} χ
                    </button>
                  </li>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
}

export default Rule;
