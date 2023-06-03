import { useState, useRef } from "react";
import Button from "./Button";

function LogInForm({ submit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   const handleInput = (e) => {
  //     e.preventDefault();
  //     if (username.trim() === "" || password.trim() === "") return;
  //     submit(username, password);
  //     inputRef.current.focus();
  //   };
  const inputRef = useRef();

  return (
    <>
      <h3>Đăng nhập vào tài khoản</h3>
      <div className="d-flex justify-content-center content ml-5 mr-5">
        <form
          style={{ width: "400px" }}
          className="text-left"
          // onSubmit={handleInput}
        >
          {/* action={'/home'} */}
          <div className="form-group">
            <label htmlFor="username">Mã số tài khoản</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ref={inputRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button submit={submit} />
        </form>
      </div>
    </>
  );
}

export default LogInForm;
