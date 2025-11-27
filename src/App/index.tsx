import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux_toolkit/store/hooks";
import { ThemeActions } from "../redux_toolkit/reducers/themeReducer";

import toast from "react-hot-toast";

import { LoaderActions } from "../redux_toolkit/reducers/loaderReducer";
import { LikeActions } from "../redux_toolkit/reducers/likeReducer";
import { blogsURL } from "../constants/urls/backend";
import { initSocket } from "../webSockets/socketService";
import { FollowThunkActions } from "../redux_toolkit/AsyncThunkActions/follow";
import { LikeThunkActions } from "../redux_toolkit/AsyncThunkActions/like";
import CustomRouter from "./Router";
import { UserThunkActions } from "../redux_toolkit/AsyncThunkActions/user";

function App() {
  const dispatch = useAppDispatch();
  const { loggedIn, user } = useAppSelector((state) => state.user);
  const { isFetched, likes, isLikedBlogsFetched } = useAppSelector(
    (state) => state.like
  );

  // const { opened } = useAppSelector((state) => state.dropdown);

  useEffect(() => {
    console.log("started");
    const savedTheme = localStorage.getItem("blogsEra_theme") || "light";
    dispatch(LoaderActions.startLoader("Reloading Screen"));
    if (savedTheme === "dark") {
      dispatch(ThemeActions.setTheme(savedTheme));
    }
    const start = async () => {
      await dispatch(UserThunkActions.fetchLoginStatus());
      dispatch(LoaderActions.stopLoader());
      console.log("ended");
    };

    start();
  }, [loggedIn, dispatch]);

  useEffect(() => {
    const fetchLikes = async () => {
      await dispatch(LikeThunkActions.fetchMyLikesOnly());
    };
    const followInfo = async () => {
      await dispatch(FollowThunkActions.fetchFollowInfo());
    };
    if (loggedIn && !isFetched) {
      followInfo();
      fetchLikes();
    }
  }, [loggedIn, dispatch, isFetched]);

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
  }, [likes, dispatch, isLikedBlogsFetched]);

  useEffect(() => {
    if (user) {
      initSocket(user._id);
    }
  }, [user]);
  return (
    <>
      <CustomRouter></CustomRouter>
    </>
  );
}

export default App;
