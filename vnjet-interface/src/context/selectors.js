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
}
