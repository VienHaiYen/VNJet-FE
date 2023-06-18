import React from "react";
import { useGlobal } from "../context/context";
import Loading from "./Loading";
import renderField from "./Form";

function LogInForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { authenticate } = useGlobal();
  const isFetching = authenticate.selectIsFetching();
  const user = authenticate.selectUser();
  console.log("user ", user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("params ", email, password);
    authenticate.handleLogin({ email, password });
  };
  if (!user.email) {
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
  } else {
    return (
      <button
        onClick={(e) => {
          authenticate.handleLogout();
        }}
      >
        logout
      </button>
    );
  }
}

export default LogInForm;
