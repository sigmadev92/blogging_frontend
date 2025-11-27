import { createAsyncThunk } from "@reduxjs/toolkit";
import { blogsURL } from "../../constants/urls/backend";

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

export const myBlogAsyncActions = { deleteBlog };
