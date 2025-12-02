import { createSlice } from "@reduxjs/toolkit";
import type { Blog } from "../../types/blog";
import editBlogThunkActions from "../AsyncThunkActions/editBlog";

const { fetchBlog } = editBlogThunkActions;
const initialState: { blog: Blog; blogId: string } = {
  blogId: "",
  blog: {
    _id: "",
    title: "",
    description: "",
    searchTags: [],
    topics: [],
    thumbnail: {
      secure_url: "",
      publicId: "",
    },
    isPublic: false,
    isPublished: false,
    archived: false,
    totalViews: 0,
  },
};

const editBlogSlice = createSlice({
  name: "editBlog",
  initialState,
  reducers: {
    setBlogId: (state, action) => {
      state.blogId = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBlog.fulfilled, (state, action) => {
      state.blog = action.payload.blog;
    });
  },
});

const editBlogReducer = editBlogSlice.reducer;
const editBlogActions = editBlogSlice.actions;

export { editBlogActions, editBlogReducer };
