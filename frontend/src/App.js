import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { dark, light } from "./components/styles/Theme.styled";
import GlobalStyles from "./GlobalStyles";
import Home from "./components/pages/Home";
import Welcome from "./components/pages/Welcome/Welcome";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Signup from "./components/pages/Signup/Signup";
import Login from "./components/pages/Login/Login";
import ErrorPage from "./components/pages/Error";
import { useAuthContext } from "./components/context/AuthContext";
import Spinner from "./components/Spinner";

function App() {
  const [theme, setTheme] = useState(light);
  const { user, loading } = useAuthContext();

  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem("theme"));

    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, [user]);

  const changeTheme = () => {
    const newTheme = theme.name === light.name ? dark : light;
    setTheme(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: !user ? <Welcome /> : <Navigate to="/app" />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/app",
      element: user ? (
        <Home changeTheme={changeTheme} />
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      path: "/register",
      element: !user ? <Signup /> : <Navigate to="/app" />,
    },
    {
      path: "/login",
      element: !user ? <Login /> : <Navigate to="/app" />,
    },
  ]);

  return loading ? (
    <Spinner />
  ) : (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
