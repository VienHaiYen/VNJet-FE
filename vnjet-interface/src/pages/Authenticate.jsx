import React from "react";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";

function Authenticate({ submit, entryType }) {
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
