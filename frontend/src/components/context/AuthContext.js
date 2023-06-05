import { createContext, useReducer, useContext, useEffect } from "react";

export const AuthContext = createContext();
export const AuthDispatchContext = createContext(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
        loading: false,
      };

    case "LOGOUT":
      return {
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
