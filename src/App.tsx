import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/PublicProfile/Profile";
import { useEffect } from "react";
import { useAppDispatch } from "./redux_toolkit/store/hooks";
import { ThemeActions } from "./redux_toolkit/reducers/themeReducer";
import Credits from "./pages/Credits";
import ForgotPassword from "./pages/ForgotPassword";
import { Toaster } from "react-hot-toast";
function App() {
  const dispatch = useAppDispatch();
  const router = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "dashboard", element: <Dashboard /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "profile/:userId", element: <Profile /> },
        { path: "credits", element: <Credits /> },
        { path: "/password/recover", element: <ForgotPassword /> },
      ],
    },
  ]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("blogsEra_theme") || "light";
    if (savedTheme === "dark") {
      dispatch(ThemeActions.setTheme(savedTheme));
    }
  }, []);
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
