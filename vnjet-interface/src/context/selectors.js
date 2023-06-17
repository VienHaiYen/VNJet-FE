import authenAPI from "../components/api/Authenticate/authenAPI";
import { LoginFailure, LoginStart, LoginSuccess } from "./actions";

export default class AuthenticateSelector {
  constructor(props) {
    console.log("created");
    this.state = props.state;
    this.dispatch = props.dispatch;
  }
  // get State value
  selectState() {
    return this.state;
  }
  selectUserid() {
    return this.state.userid;
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
      console.log("resp ", resp);
      this.dispatchLoginFailure(resp.error);
    } else {
      console.log("resp ", resp);
      this.dispatchLoginSuccess(resp);
    }
  }
}
