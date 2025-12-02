import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "../reducers/userReducer";
import { ThemeRducer } from "../reducers/themeReducer";
import { LoaderReducer } from "../reducers/loaderReducer";
import { myBlogReducer } from "../reducers/myblogsReducer";
import { dbMenuReducer } from "../reducers/dbMenuReducer";
import { LikeReducer } from "../reducers/likeReducer";
import { FollowReducer } from "../reducers/followReducer.ts";
import { visitedUserReducer } from "../reducers/visitedUserFollow.ts";
import listenerMiddleware from "../actions/listenerMiddleWare.ts";
import { editBlogReducer } from "../reducers/editBlogReducer.ts";
const store = configureStore({
  reducer: {
    user: UserReducer,
    theme: ThemeRducer,
    loader: LoaderReducer,
    myBlogs: myBlogReducer,
    dbMenu: dbMenuReducer,
    like: LikeReducer,
    follow: FollowReducer,
    visitedUser: visitedUserReducer,
    editBlog: editBlogReducer,
  },
  middleware: (getDefault) =>
    getDefault().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
