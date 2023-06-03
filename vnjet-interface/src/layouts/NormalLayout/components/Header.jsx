import React from "react";

function Header({ setEntryType }) {
  const [statusIndex, setStatusIndex] = React.useState(0);
  const status = ["Đăng nhập", "Đăng kí"];
  return (
    <nav className="navbar navbar-light bg-info ">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1 text-white">
          {status[statusIndex]}
        </span>
        <input
          className="btn btn-secondary"
          type="button"
          value={status[(statusIndex + 1) % 2]}
          onClick={() => {
            setEntryType((statusIndex + 1) % 2);
            setStatusIndex((statusIndex + 1) % 2);
            console.log("123", statusIndex);
          }}
        ></input>
      </div>
    </nav>
  );
}

export default Header;
