import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("theme");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return { logout };
};
