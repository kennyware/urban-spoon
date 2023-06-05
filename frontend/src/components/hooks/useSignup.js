import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (username, email, password) => {
    setIsLoading(true);
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
