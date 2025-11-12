import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "../reducers/userReducer";
import { ThemeRducer } from "../reducers/themeReducer";
import { LoaderReducer } from "../reducers/loaderReducer";
import { myBlogReducer } from "../reducers/myblogsReducer";

const store = configureStore({
  reducer: {
    user: UserReducer,
    theme: ThemeRducer,
    loader: LoaderReducer,
    myBlogs: myBlogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
