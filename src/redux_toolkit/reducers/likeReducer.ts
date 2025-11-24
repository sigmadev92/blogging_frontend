import { createSlice } from "@reduxjs/toolkit";
import type { LikeObject } from "../../types/like";
import toast from "react-hot-toast";
import type { LikedBlogs, PublicBlog1 } from "../../types/blog";
import { LikeThunkActions } from "../AsyncThunkActions/like";

const { fetchMyLikesOnly, likeDislike, unlike } = LikeThunkActions;
const initialState: {
  likes: LikeObject;
  isFetched: boolean;
  isLikedBlogsFetched: boolean;
  likedBlogs: LikedBlogs;
} = {
  isFetched: false,
  likes: {},
  likedBlogs: {},
  isLikedBlogsFetched: false,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    setLikedBlogs: (state, action: { payload: PublicBlog1[] }) => {
      state.isLikedBlogsFetched = true;
      action.payload.forEach((blogItem) => {
        state.likedBlogs[blogItem._id] = blogItem;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyLikesOnly.rejected, (_, action) => {
        toast.error(action.error.message!);
      })
      .addCase(fetchMyLikesOnly.fulfilled, (state, action) => {
        const { success, likes, message } = action.payload;
        state.isFetched = true;
        if (success) {
          likes.forEach((like) => {
            state.likes[like.blogId] = like;
          });
        } else {
          toast.error(message!);
        }
      });
    builder
      .addCase(likeDislike.rejected, (_, action) => {
        toast.error(action.error.message!);
      })
      .addCase(likeDislike.fulfilled, (state, action) => {
        const { data, data2 } = action.payload;

        console.log(data2);

        state.likes[data.like.blogId] = data.like;
        state.likedBlogs[data.like.blogId] = data2.blogs[0];
      });
    builder
      .addCase(unlike.rejected, (_, action) => {
        toast.error(action.error.message!);
      })
      .addCase(unlike.fulfilled, (state, action) => {
        const { blogId } = action.payload;
        delete state.likes[blogId];
        delete state.likedBlogs[blogId];
      });
  },
});

const LikeReducer = likeSlice.reducer;

const LikeActions = likeSlice.actions;

export { LikeActions, LikeReducer };
