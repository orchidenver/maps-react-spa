import { AuthActionTypes, InitialAuthState } from "../types";

export function reducer(state: InitialAuthState, action: AuthActionTypes) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}
