import axiosClient from "../components/api/axios/axiosClient";
import React from "react";
import { GET, POST } from "../modules";
import { useGlobal } from "../context/context";
import Spinner from "../components/Spinner";

function Rule() {
  const [ticketClasses, setTicketClasses] = React.useState([]);
  const [rules, setRules] = React.useState([]);
  const [ruleName, setRuleName] = React.useState("quantityAirports");
  const [inputValue, setInputValue] = React.useState("");
  const [addedTicketClassName, setAddedTicketClassName] = React.useState("");
  const { authenticate } = useGlobal();
  const user = authenticate.selectUser();

  const changeRule = async (name, value) => {
    if (value != "") {
      await axiosClient
        .post("/terms/change", {
          name: name,
          value: Number(value),
        })
        .then((res) => {
          if (res.error) alert(res.error);
        });
    } else {
      alert("Vui lòng nhập đủ thông tin");
    }
  };

  const deleteTicketClass = async (id) => {
    const data = await axiosClient.delete(`/ticket-class/${id}`);
    console.log(data);
  };

  const handleChangeProperty = async () => {
    await changeRule(ruleName, inputValue);
    await GET.getRules(setRules);
  };
  const handleAddedTicketClass = async () => {
    await POST.addTicketClass(addedTicketClassName);
    await GET.getTicketClasses(setTicketClasses);
    await GET.getRules(setRules);
  };
  const handleDeleteTicketClass = async (id) => {
    let data = await deleteTicketClass(id);
    await console.log(data);
    await GET.getTicketClasses(setTicketClasses);
    await GET.getRules(setRules);
  };
  React.useEffect(() => {
    setInputValue("");
    setAddedTicketClassName("");
  }, [ruleName]);
  React.useEffect(() => {}, [addedTicketClassName]);
  React.useEffect(() => {
    GET.getRules(setRules);
    GET.getTicketClasses(setTicketClasses);
  }, []);
  return (
    <>
      <h3>Thay đổi quy định</h3>
      {rules.length < 1 && <Spinner />}
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
      {user.role === "admin" && (
        <>
          <select
            className="form-select mb-3"
            style={{ width: "300px" }}
            aria-label="Default select example"
            onChange={(e) => {
              setRuleName(e.target.value);
              console.log(ruleName);
            }}
          >
            <option value="maxTransitions" disabled defaultValue>
              Nhập thay đổi
            </option>
            <option value="quantityAirports"> Số lượng sân bay cao nhất</option>
            <option value="minTimeFlight">
              Thời gian bay tối thiểu (phút)
            </option>
            <option value="maxPauseTime">Thời gian dừng tối đa (phút)</option>
            <option value="minPauseTime">
              Thời gian dừng tối thiểu (phút)
            </option>
            <option value="maxTransitions">Số trạm dừng tối đa (trạm)</option>
            <option value="latestBookingTime">
              Thời gian trễ nhất đặt vé (giờ)
            </option>
            <option value="latestCancellationTime">
              Thời gian trễ nhất hủy vé (giờ)
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
                          className="btn btn-warning m-1"
                          onClick={() =>
                            handleDeleteTicketClass(ticketClass._id)
                          }
                          style={{ marginLeft: "3rem" }}
                        >
                          {"   "} x
                        </button>
                      </li>
                    </div>
                  ))}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Rule;
