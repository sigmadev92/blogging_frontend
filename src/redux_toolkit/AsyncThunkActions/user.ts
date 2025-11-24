import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersURL } from "../../functions/backend";

const fetchLoginStatus = createAsyncThunk("fetchLoginStatus", async () => {
  const response = await fetch(`${usersURL}/auth`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error ${response.statusText}`);
  }
  const data = await response.json();
  return data;
});

export const UserThunkActions = { fetchLoginStatus };
