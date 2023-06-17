import authenAPI from "../components/api/Collections/authenAPI";
import {
  LoginFailure,
  LoginStart,
  LoginSuccess,
  Logout,
  RegisterFailure,
  RegisterStart,
  RegisterSuccess,
} from "./actions";

export default class AuthenticateSelector {
  constructor(props) {
    this.state = props.state;
    this.dispatch = props.dispatch;
  }
  // get State value
  selectState() {
    return this.state;
  }
  selectUser() {
    return this.state.user;
  }
  selectIsFetching() {
    return this.state.isFetching;
  }
  selectIsError() {
    return this.state.isError;
  }
  selectErrorDetail() {
    return this.state.errorDetail;
  }
  // dispatch actions
  dispatchLoginStart() {
    this.dispatch(LoginStart());
  }
  dispatchLoginSuccess(user) {
    this.dispatch(LoginSuccess(user));
  }
  dispatchLoginFailure(error) {
    this.dispatch(LoginFailure(error));
  }
  dispatchRegisterStart() {
    this.dispatch(RegisterStart());
  }
  dispatchRegisterFailure(error) {
    this.dispatch(RegisterFailure(error));
  }
  dispatchRegisterSuccess(user) {
    this.dispatch(RegisterSuccess(user));
  }

  async handleLogin(params) {
    const { email, password } = params;
    this.dispatchLoginStart();
    const resp = await authenAPI.postLogin({ email, password });
    if (resp.error) {
      this.dispatchLoginFailure(resp.error);
    } else {
      this.dispatchLoginSuccess(resp);
    }
  }
  async handleLogout() {
    await authenAPI.postLogout();
    this.dispatch(Logout());
  }
  async handleRegister(params) {
    const { email, password, phone, fullname, identificationCode, role } =
      params;
    console.log("params ", {
      email,
      password,
      phone,
      fullname,
      identificationCode,
      role,
    });
    this.dispatch(RegisterStart());
    const resp = await authenAPI.postRegister({
      email,
      password,
      phone,
      fullname,
      identificationCode,
      role,
    });

    if (resp.error) {
      this.dispatchLoginFailure(resp.error);
    } else {
      this.dispatchLoginSuccess(resp);
    }
  }
}
