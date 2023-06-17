export const inititalAuthenticationState = {
  isFetching: false,
  isError: false,
  errorDetail: "",
  user: {},
  isRegisterSuccess: false,
};

const authReducer = (state = inititalAuthenticationState, action) => {
  switch (action.type) {
    case "REGISTER_START": {
      return {
        ...state,
        isRegisterSuccess: false,
        isFetching: true,
        isError: false,
      };
    }
    case "LOGIN_START":
      return {
        ...state,
        isFetching: true,
        isError: false,
      };
    case "LOGIN_SUCCESS": {
      localStorage.setItem("accessToken", action.user.accessToken);
      localStorage.setItem("refreshToken", action.user.refreshToken);
      return {
        ...state,
        isFetching: false,
        isError: false,
        user: action.user,
      };
    }
    case "REGISTER_SUCCESS": {
      return {
        ...state,
        isFetching: false,
        isError: false,
        isRegisterSuccess: true,
        // user: action.user,
      };
    }
    case "REGISTER_FAILURE": {
      const { error: errorDetail } = action.payload;
      console.log(action.payload);
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorDetail,
      };
    }
    case "LOGIN_FAILURE": {
      const { error: errorDetail } = action.payload;
      console.log(action.payload);
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorDetail,
      };
    }
    case "LOGOUT": {
      localStorage.clear();
      return inititalAuthenticationState;
    }

    default:
      return state;
  }
};
export default authReducer;
