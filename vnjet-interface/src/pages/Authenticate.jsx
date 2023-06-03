import React from "react";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";

function Authenticate({ submit, entryType }) {
  {
    console.log(entryType);
  }
  return (
    <div className="p-5 justify-content-center border border-primary rounded-20">
      {entryType == 0 ? (
        <LogInForm submit={submit} />
      ) : (
        <SignUpForm submit={submit} />
      )}
    </div>
  );
}

export default Authenticate;
