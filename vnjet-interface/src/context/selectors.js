import authenAPI from "../components/api/Collections/authenAPI";
import { LoginFailure, LoginStart, LoginSuccess, Logout } from "./actions";

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
  selectError() {
    return this.state.error;
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
}
