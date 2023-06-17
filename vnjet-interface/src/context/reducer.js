export const inititalAuthenticationState = {
  userid: JSON.parse(localStorage.getItem("userid")) || null,
  isFetching: false,
  error: false,
};

const authReducer = (state = inititalAuthenticationState, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        userid: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        userid: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        userid: null,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};
export default authReducer;
