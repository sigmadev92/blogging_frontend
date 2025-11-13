import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "../reducers/userReducer";
import { ThemeRducer } from "../reducers/themeReducer";
import { LoaderReducer } from "../reducers/loaderReducer";
import { myBlogReducer } from "../reducers/myblogsReducer";
import { dbMenuReducer } from "../reducers/dbMenuReducer";

const store = configureStore({
  reducer: {
    user: UserReducer,
    theme: ThemeRducer,
    loader: LoaderReducer,
    myBlogs: myBlogReducer,
    dbMenu: dbMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
