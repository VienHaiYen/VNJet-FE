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
    case "INIT_USER_START":
      return {
        ...state,
        isFetching: true,
        isError: false,
      };
    case "INIT_USER_SUCCESS": {
      return {
        ...state,
        isFetching: false,
        isError: false,
        user: action.user,
      };
    }
    case "LOGIN_SUCCESS": {
      localStorage.setItem("accessToken", action.user.accessToken);
      localStorage.setItem("refreshToken", action.user.refreshToken);
      localStorage.setItem("useremail", action.user.email);
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
    case "INIT_USER_FAILURE": {
      return {
        ...state,
        isFetching: false,
        isError: true,
      };
    }
    case "LOGIN_FAILURE": {
      const { error: errorDetail } = action.payload;
      console.log(errorDetail);
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
