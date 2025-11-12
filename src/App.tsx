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
import { fetchLoginStatus } from "./redux_toolkit/reducers/userReducer";
import ProtectSensitive from "./components/ControlRoutes/ProtectSensitive";
import PreventExposed from "./components/ControlRoutes/PreventExposed";
import InLayout from "./layouts/InLayout";
import WriteBlog from "./pages/writeBlog";
import OutLayout from "./layouts/OutLayout";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import Resources from "./pages/Resources";
import Shows from "./pages/Shows";
import Vlogs from "./pages/Vlogs";
import Blogs from "./pages/Blogs";
import WeeklyNews from "./pages/WeeklyNews";
import ViewBlog from "./pages/Blogs/ViewBlog";
import EditBlog from "./pages/EditBlog";

function App() {
  const dispatch = useAppDispatch();

  // const { opened } = useAppSelector((state) => state.dropdown);
  const router = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "profile/:medium/:userId",
          element: <ProtectSensitive children={<Profile />} />,
        },
        { path: "credits", element: <Credits /> },
        { path: "authors", element: <Authors /> },
        { path: "books", element: <Books /> },
        { path: "resources", element: <Resources /> },
        { path: "shows", element: <Shows /> },
        { path: "vlogs", element: <Vlogs /> },
        { path: "blogs", element: <Blogs /> },
        {
          path: "blog/view/:blogId",
          element: <ViewBlog />,
        },
        { path: "news/weekly", element: <WeeklyNews /> },
        {
          path: "in",
          element: (
            <ProtectSensitive>
              <InLayout />
            </ProtectSensitive>
          ),
          children: [
            {
              path: "dashboard",
              element: <ProtectSensitive children={<Dashboard />} />,
            },

            {
              path: "blog/new",
              element: <WriteBlog />,
            },
            {
              path: "blog/edit/:blogId",
              element: <EditBlog />,
            },
          ],
        },

        {
          path: "out",
          element: <PreventExposed children={<OutLayout />} />,
          children: [
            {
              path: "register",
              element: <PreventExposed children={<Register />} />,
            },
            { path: "login", element: <PreventExposed children={<Login />} /> },

            {
              path: "password/recover",
              element: <PreventExposed children={<ForgotPassword />} />,
            },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("blogsEra_theme") || "light";
    if (savedTheme === "dark") {
      dispatch(ThemeActions.setTheme(savedTheme));
    }
    dispatch(fetchLoginStatus());
  }, []);
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
