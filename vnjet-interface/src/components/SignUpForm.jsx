import { useState } from "react";
// import Button from "./Button";

function SignUpForm({ submit }) {
  //   const handleInput = (e) => {
  //     e.preventDefault();
  //     if (username.trim() === "" || password.trim() === "") return;
  //     submit(username, password);
  //     inputRef.current.focus();
  //   };
  // const inputRef = useRef();
  const [info, setInfo] = useState({
    name: "",
    birthday: "",
    address: "",
    gender: "",
    mail: "",
    phone: "",
    _class: "",
    subject: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(info);
  };
  return (
    <>
      <h3>Đăng kí tài khoản</h3>
      <form style={{ width: "400px" }} className="text-left">
        <div className="form--row">
          <div className="form-row-item">
            <label htmlFor="name"> Họ và tên: </label>
            <input
              required
              id="name"
              type="text"
              className="form-control"
              onChange={handleChange}
              value={info.name}
              name="name"
            />
          </div>
          <div className="form-row-item">
            <label htmlFor="birthday"> Ngày sinh: </label>
            <input
              required
              id="birthday"
              type="date"
              className="form-control"
              onChange={handleChange}
              value={info.birthday}
              name="birthday"
            />
          </div>
          <div className="form-row-item">
            <label htmlFor="gender"> Giới tính: </label>
            <select
              required
              id="gender"
              className="form-control"
              onChange={handleChange}
              value={info.gender}
              name="gender"
            >
              <option
                value=""
                defaultValue
                style={{ display: "none" }}
              ></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="form--row">
          <div className="form-row-item">
            <label htmlFor="email"> Email: </label>
            <input
              required
              id="email"
              type="email"
              className="form-control"
              onChange={handleChange}
              value={info.mail}
              name="mail"
            />
          </div>
        </div>
        <div className="form--row">
          <div className="form-row-item">
            <label htmlFor="tel"> Số điện thoại: </label>
            <input
              required
              id="tel"
              type="tel"
              className="form-control"
              placeholder="123-456-7890"
              onChange={handleChange}
              value={info.phone}
              name="phone"
            />
          </div>
          <div className="form-row-item">
            <label htmlFor="address"> Địa chỉ: </label>
            <input
              required
              id="address"
              type="text"
              className="form-control"
              placeholder="227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh, Việt Nam."
              onChange={handleChange}
              value={info.address}
              name="address"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={submit}>
          Submit
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
