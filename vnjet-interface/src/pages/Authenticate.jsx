// import React from "react";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";

function Authenticate({ submit, entryType }) {
  return (
    <div className="mt-5 w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="mt-5 w-25">
        {entryType == 0 ? (
          <LogInForm submit={submit} />
        ) : (
          <SignUpForm submit={submit} />
        )}
      </div>
    </div>
  );
}

export default Authenticate;
