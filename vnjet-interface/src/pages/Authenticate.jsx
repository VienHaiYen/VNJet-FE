import React from "react";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";
import { useGlobal } from "../context/context";

function Authenticate({ submit, entryType }) {
  const { authenticate } = useGlobal();
  console.log(authenticate.selectState());

  React.useEffect(() => {
    authenticate.dispatchLoginStart();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      {entryType == 0 ? (
        <LogInForm submit={submit} />
      ) : (
        <SignUpForm submit={submit} />
      )}
    </div>
  );
}

export default Authenticate;
