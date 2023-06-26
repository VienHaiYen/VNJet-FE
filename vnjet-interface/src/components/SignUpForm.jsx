import React, { useState } from "react";
import { useGlobal } from "../context/context";
import Loading from "./Loading";
// import Button from "./Button";
import renderField from "./Form";
import { renderError, renderSelections } from "./Form";

function SignUpForm() {
  const { authenticate } = useGlobal();
  const isFetching = authenticate.selectIsFetching();
  const isError = authenticate.selectIsError();
  const errorDetail = authenticate.selectErrorDetail();
  const isRegisterSuccess = authenticate.selectIsRegisterSuccess();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setfullName] = useState("");
  const [identificationCode, setIdentificationCode] = useState("");
  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "customer", label: "Customer" },
  ];
  const [role, setRole] = React.useState(roleOptions[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    authenticate.handleRegister({
      email,
      password,
      phone,
      fullname: fullName,
      identificationCode,
      role: role.value,
    });
  };

  if (isRegisterSuccess) {
    return (
      <div>
        <h3>register success, press Login btn in navigation bar</h3>
      </div>
    );
  } else {
    return (
      <>
        <div>
          <h3>Đăng kí tài khoản</h3>
        </div>
        <div>
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
            {renderField({
              name: "phone",
              value: phone,
              setValue: setPhone,
              type: "text",
            })}
            {renderField({
              name: "full name",
              value: fullName,
              setValue: setfullName,
              type: "text",
            })}
            {renderField({
              name: "identification Code",
              value: identificationCode,
              setValue: setIdentificationCode,
              type: "text",
            })}
            {renderSelections({
              value: role,
              setValue: setRole,
              options: roleOptions,
              name: "role",
            })}
            {isError &&
              renderError({
                errorDetail,
              })}
            <div className="text-center form-group m-2">
              {isFetching ? (
                <Loading loading={isFetching} />
              ) : (
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              )}
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default SignUpForm;
