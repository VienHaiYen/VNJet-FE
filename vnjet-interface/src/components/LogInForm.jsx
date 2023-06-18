import React from "react";
import { useGlobal } from "../context/context";
import Loading from "./Loading";
import renderField from "./Form";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LogInForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { authenticate } = useGlobal();
  const isFetching = authenticate.selectIsFetching();
  const user = authenticate.selectUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (Object.keys(user).length) {
      navigate("/my-flight");
      // history.push("/my-flight");
    }
  }, [user]);

  // let history = useHistory();
  // console.log(history);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("params ", email, password);
    await authenticate.handleLogin({ email, password });
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
