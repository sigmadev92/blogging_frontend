import { createAsyncThunk } from "@reduxjs/toolkit";
import { blogsURL, likesURL } from "../../functions/backend";
import type { Like } from "../../types/like";

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

export const LikeThunkActions = { fetchMyLikesOnly, likeDislike, unlike };
