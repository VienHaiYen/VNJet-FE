import { useState, useRef } from "react";
import Button from "./Button";

const renderField = (params) => {
  const { value, setValue, name, type } = params;
  return (
    <div className="form-group m-2">
      <label className="text-capitalize fw-bold">{name}</label>
      <input
        defaultValue={value}
        onChange={(e) => setValue(e.target.value)}
        type={type || "text"}
        className="form-control"
        placeholder="Enter email"
      />
    </div>
  );
};

function LogInForm(props) {
  const { submit } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      {renderField({
        name: "email",
        value: username,
        setValue: setUsername,
      })}

      {renderField({
        name: "password",
        value: password,
        setValue: setPassword,
        type: "password",
      })}
      {/* <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div> */}
      <div className="text-center form-group m-2">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}

export default LogInForm;
