import { createAsyncThunk } from "@reduxjs/toolkit";
import { blogsURL } from "../../constants/urls/backend";
import type { Blog } from "../../types/blog";

const fetchBlog = createAsyncThunk("fetchEditBlog", async (_id: string) => {
  const response = await fetch(`${blogsURL}/one/${_id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Request Failed ${response.status}`);
  }
  const { blog }: { blog: Blog } = await response.json();
  return { blog };
});

const editBlogThunkActions = { fetchBlog };

export default editBlogThunkActions;
