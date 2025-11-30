import { createAsyncThunk } from "@reduxjs/toolkit";
import { blogsURL } from "../../constants/urls/backend";
import type { Blog } from "../../types/blog";

const fetchMyBlogs = createAsyncThunk("fetchMyBlogs", async () => {
  const response = await fetch(`${blogsURL}/my-blogs`, {
    credentials: "include",
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Request failed" + response.status);
  }
  const { blogs }: { blogs: Blog[] } = await response.json();
  return blogs;
});

const toggleVisibility = createAsyncThunk(
  "toggleVisibility",
  async (_id: string) => {
    const response = await fetch(`${blogsURL}/toggle/${_id}`, {
      credentials: "include",
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error("Request failed" + response.status);
    }

    return { _id };
  }
);

const deleteBlog = createAsyncThunk("deleteBlog", async (_id: string) => {
  const response = await fetch(`${blogsURL}/${_id}`, {
    credentials: "include",
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Request failed" + response.status);
  }

  const data = await response.json();

  return { data, _id };
});

export const myBlogAsyncActions = {
  deleteBlog,
  fetchMyBlogs,
  toggleVisibility,
};
