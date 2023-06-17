import { useState, useRef } from "react";
import Button from "./Button";
import authenAPI from "./api/Authenticate/authenAPI";
import { useGlobal } from "../context/context";
import Loading from "./Loading";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate } = useGlobal();
  const isFetching = authenticate.selectIsFetching();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("params ", email, password);
    authenticate.handleLogin({ email, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      {renderField({
        name: "email",
        value: email,
        setValue: setEmail,
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
        {isFetching ? (
          <Loading />
        ) : (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        )}
      </div>
    </form>
  );
}

export default LogInForm;
