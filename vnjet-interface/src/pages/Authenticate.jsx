// import React from "react";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";

function Authenticate({ submit, entryType }) {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="">
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
