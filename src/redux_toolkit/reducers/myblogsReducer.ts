import { createSlice } from "@reduxjs/toolkit";
import { type Blog } from "../../types/blog";
import toast from "react-hot-toast";
import { myBlogAsyncActions } from "../AsyncThunkActions/blog";

const { deleteBlog } = myBlogAsyncActions;
const initialState: { isFetched: boolean; myBlogs: Blog[] } = {
  isFetched: false,
  myBlogs: [],
};

const myBlogsSlice = createSlice({
  name: "myBlogs",
  initialState,
  reducers: {
    setMyBlogs: (state, action) => {
      state.myBlogs = action.payload;
      state.isFetched = true;
    },
    addNewBlog: (state, action) => {
      state.myBlogs.push(action.payload);
    },

    updateBlog: (state, action) => {
      const { _id }: { _id: string } = action.payload;

      const idx = state.myBlogs.findIndex((ele) => ele._id === _id);
      if (idx > -1) {
        state.myBlogs[idx] = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deleteBlog.rejected, (_, action) => {
        console.log(action.error);
        toast.error("Problem in deleting blog");
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const { data, _id } = action.payload;
        if (data.success) {
          const idx = state.myBlogs.findIndex((ele) => ele._id === _id);
          if (idx > -1) {
            state.myBlogs.splice(idx, 1);
            toast.success("Blog deleted successfully");
          }
        }
      });
  },
});

const myBlogReducer = myBlogsSlice.reducer;
const myBlogsActions = myBlogsSlice.actions;

export { myBlogReducer, myBlogsActions };
