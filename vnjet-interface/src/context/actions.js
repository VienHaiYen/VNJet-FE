export const LoginStart = () => ({
  type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  user,
});
export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: { error },
});
export const Logout = () => ({
  type: "LOGOUT",
});
export const RegisterStart = () => ({
  type: "REGISTER_START",
});
export const RegisterSuccess = (user) => ({
  type: "REGISTER_SUCCESS",
  user,
});
export const RegisterFailure = (error) => ({
  type: "REGISTER_FAILURE",
  payload: { error },
});
