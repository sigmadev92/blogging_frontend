import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Like, LikeObject } from "../../types/like";
import { blogsURL, likesURL } from "../../functions/backend";
import toast from "react-hot-toast";
import type { LikedBlogs, PublicBlog1 } from "../../types/blog";

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

const fetchMyLikesOnly = createAsyncThunk("fetchMyLikesOnly", async () => {
  const response = await fetch(`${likesURL}/blogs`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Request Failed ${response.status}`);
  }

  const data: { success: boolean; message?: string; likes: Like[] } =
    await response.json();

  return data;
});

const likeDislike = createAsyncThunk(
  "likeDislike",
  async ({ blogId, action }: { blogId: string; action: 1 | -1 }) => {
    const response = await fetch(`${likesURL}/like/${blogId}/${action}`, {
      credentials: "include",
      method: "PUT",
    });

    if (!response.ok) {
      console.log("here");
      throw new Error(`Request Failed ${response.status}`);
    }

    const response2 = await fetch(`${blogsURL}/selected-blogs`, {
      method: "post",
      body: JSON.stringify({ blogIds: [blogId] }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response2.ok) {
      throw new Error("Post Liked but cannot be fetched");
    }

    const data2 = await response2.json();
    const data: { success: boolean; message: string; like: Like } =
      await response.json();

    return { data, data2 };
  }
);

const unlike = createAsyncThunk(
  "unlike",
  async ({ blogId }: { blogId: string }) => {
    const response = await fetch(`${likesURL}/unlike/${blogId}`, {
      credentials: "include",
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Request failed ${response.status}`);
    }

    return { blogId };
  }
);

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

const LikeThunkActions = { fetchMyLikesOnly, likeDislike, unlike };

export { LikeActions, LikeReducer, LikeThunkActions };
