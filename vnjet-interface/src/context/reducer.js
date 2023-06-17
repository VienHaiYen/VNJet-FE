export const inititalAuthenticationState = {
  isFetching: false,
  isError: false,
  errorDetail: "",
  user: {},
};

const authReducer = (state = inititalAuthenticationState, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        isFetching: true,
        isError: false,
      };
    case "LOGIN_SUCCESS": {
      console.log("LOGIN_SUCCESS");
      return {
        isFetching: false,
        isError: false,
        user: action.payload.user,
      };
    }
    case "LOGIN_FAILURE": {
      const { error: errorDetail } = action.payload;
      console.log(action.payload);
      return {
        isFetching: false,
        isError: true,
        errorDetail,
      };
    }

    default:
      return state;
  }
};
export default authReducer;
