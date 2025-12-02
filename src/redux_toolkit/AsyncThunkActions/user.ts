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

const setUsername = createAsyncThunk(
  "setUsername",
  async ({ userName }: { userName: string }) => {
    const response = await fetch(`${userSettingsURL}/set/username`, {
      body: JSON.stringify({ userName }),
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request Failed ${response.status}`);
    }
    const { userNameLastChangedAt }: { userNameLastChangedAt: Date } =
      await response.json();
    return { userName, userNameLastChangedAt };
  }
);
export const UserThunkActions = {
  fetchLoginStatus,
  toggleAccountVisibility,
  toggleDisplayParam,
  setUsername,
};
