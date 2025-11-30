import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectSensitive from "../components/ControlRoutes/ProtectSensitive";
import PreventExposed from "../components/ControlRoutes/PreventExposed";

import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Profile from "../pages/PublicProfile";
import Credits from "../pages/Credits";
import Authors from "../pages/Authors";
import Books from "../pages/Books";
import Resources from "../pages/Resources";
import Shows from "../pages/Shows";
import Vlogs from "../pages/Vlogs";
import Blogs from "../pages/Blogs";
import ViewBlog from "../pages/ViewBlog";
import WeeklyNews from "../pages/WeeklyNews";
import InLayout from "../layouts/InLayout";
import Dashboard from "../pages/Dashboard";
import WriteBlog from "../pages/writeBlog";
import EditBlog from "../pages/EditBlog";
import OutLayout from "../layouts/OutLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyEmail from "../pages/VerifyEmail";

const CustomRouter = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "profile/:medium/:value",
          element: <Profile />,
        },
        { path: "verify-email", element: <VerifyEmail /> },
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
  return <RouterProvider router={router}></RouterProvider>;
};

export default CustomRouter;
