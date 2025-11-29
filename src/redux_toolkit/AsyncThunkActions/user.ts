import { createAsyncThunk } from "@reduxjs/toolkit";
import { userSettingsURL, usersURL } from "../../constants/urls/backend";

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

const toggleAccountVisibility = createAsyncThunk("accountVisi", async () => {
  const response = await fetch(`${userSettingsURL}/toggle/visibility`, {
    method: "PUT",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Request Failed ${response.status}`);
  }
  const { newStatus }: { newStatus: boolean } = await response.json();
  return newStatus;
});

const toggleDisplayParam = createAsyncThunk(
  "toggleParam",
  async ({ param }: { param: string }) => {
    const response = await fetch(`${userSettingsURL}/toggle/display/${param}`, {
      method: "PUT",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Request Failed ${response.status}`);
    }
    const { newValue }: { newValue: boolean } = await response.json();
    return { param, newValue };
  }
);

export const UserThunkActions = {
  fetchLoginStatus,
  toggleAccountVisibility,
  toggleDisplayParam,
};
