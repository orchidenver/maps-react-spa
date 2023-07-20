import { createContext, useContext, useReducer, Reducer } from "react";
import {
  ProviderInterface,
  InitialAuthContext,
  InitialAuthState,
  AuthActions,
  AuthActionTypes,
} from "../types";
import { reducer } from "../reducers/AuthReducer";

const initialAuthContext: InitialAuthContext = {
  user: {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  },
  isAuthenticated: false,
  login: (email: string, password: string) => undefined,
  logout: () => undefined,
};

const AuthContext = createContext(initialAuthContext);

const initialState: InitialAuthState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

export function AuthProvider({ children }: ProviderInterface) {
  const [{ user, isAuthenticated }, dispatch] = useReducer<
    Reducer<InitialAuthState, AuthActionTypes>
  >(reducer, initialState);

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: AuthActions.LOGIN, payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: AuthActions.LOGOUT });
  }

  const authValue: InitialAuthContext = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
