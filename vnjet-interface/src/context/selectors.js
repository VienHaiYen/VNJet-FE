import authenAPI from "../components/api/Collections/authenAPI";
import {
  InitUserInfoFailure,
  InitUserInfoStart,
  InitUserInfoSuccess,
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
  selectIsRegisterSuccess() {
    return this.state.isRegisterSuccess;
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
  dispatchInitUserInfoStart() {
    this.dispatch(InitUserInfoStart());
  }
  dispatchInitUserInfoSuccess(user) {
    this.dispatch(InitUserInfoSuccess(user));
  }
  dispatchInitUserInfoFailure(error) {
    this.dispatch(InitUserInfoFailure(error));
  }

  // handle api

  async handleLogin(params) {
    const { email, password } = params;
    this.dispatchLoginStart();
    const resp = await authenAPI.postLogin({ email, password });
    console.log(resp);
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

    console.log("resp ", resp);

    if (resp.error) {
      this.dispatchRegisterFailure(resp.error);
    } else {
      this.dispatchRegisterSuccess(resp);
    }
  }
  async fetchInitData(params) {
    this.dispatchInitUserInfoStart();
    const resp = await authenAPI.postUserInfo(params);
    console.log(resp);
    if (resp.error) {
      this.dispatchInitUserInfoFailure(resp.error);
    } else {
      // console.log(resp);
      this.dispatchInitUserInfoSuccess(resp.data);
    }
  }
}
