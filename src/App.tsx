import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/PublicProfile/Profile";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux_toolkit/store/hooks";
import { ThemeActions } from "./redux_toolkit/reducers/themeReducer";
import Credits from "./pages/Credits";
import ForgotPassword from "./pages/ForgotPassword";
import toast, { Toaster } from "react-hot-toast";
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
import { LoaderActions } from "./redux_toolkit/reducers/loaderReducer";
import NotFound from "./pages/NotFound";
import {
  LikeActions,
  LikeThunkActions,
} from "./redux_toolkit/reducers/likeReducer";
import { blogsURL } from "./functions/backend";

function App() {
  const dispatch = useAppDispatch();

  const { loggedIn } = useAppSelector((state) => state.user);
  const { isFetched, likes, isLikedBlogsFetched } = useAppSelector(
    (state) => state.like
  );

  // const { opened } = useAppSelector((state) => state.dropdown);
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
    console.log("started");
    const savedTheme = localStorage.getItem("blogsEra_theme") || "light";
    dispatch(LoaderActions.startLoader("Reloading Screen"));
    if (savedTheme === "dark") {
      dispatch(ThemeActions.setTheme(savedTheme));
    }
    const start = async () => {
      await dispatch(fetchLoginStatus());
      dispatch(LoaderActions.stopLoader());
      console.log("ended");
    };

    start();
  }, [loggedIn, dispatch]);

  useEffect(() => {
    const fetchLikes = async () => {
      await dispatch(LikeThunkActions.fetchMyLikesOnly());
    };
    if (loggedIn && !isFetched) {
      fetchLikes();
    }
  }, [loggedIn]);

  useEffect(() => {
    const fetchLikedBlogs = async () => {
      const response = await fetch(`${blogsURL}/selected-blogs`, {
        method: "POST",
        body: JSON.stringify({ blogIds: Object.keys(likes) }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("heheheh");
        toast.error(`Request Failed ${response.status}`);
        return;
      }
      const data = await response.json();
      console.log(data);
      dispatch(LikeActions.setLikedBlogs(data.blogs));
    };

    if (Object.keys(likes).length > 0 && !isLikedBlogsFetched) {
      console.log("usus");
      fetchLikedBlogs();
    }
  }, [likes]);
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
