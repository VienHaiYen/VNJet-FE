import React from "react";
import AuthReducer from "./reducer";
import { inititalAuthenticationState } from "./reducer";
import AuthenticateSelector from "./selectors";

const AuthContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [authenticateState, authenticateDispatch] = React.useReducer(
    AuthReducer,
    inititalAuthenticationState
  );

  React.useEffect(() => {
    localStorage.setItem("user", JSON.stringify(authenticateState.userid));
  }, [authenticateState.userid]);

  const authenticateSelector = new AuthenticateSelector({
    state: authenticateState,
    dispatch: authenticateDispatch,
  });

  return (
    <AuthContext.Provider
      value={{
        authenticate: authenticateSelector,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobal = () => {
  const globalcontext = React.useContext(AuthContext);
  if (globalcontext === undefined) {
    throw new Error(`useGlobal must be used within a useGlobalProvider`);
  }
  return globalcontext;
};
