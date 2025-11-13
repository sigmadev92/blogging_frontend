import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type User } from "../../types/user";
import { usersURL } from "../../functions/backend";
const initialState: { loggedIn: boolean; user: User | null } = {
  loggedIn: false,
  user: null,
};

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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
    setRole: (state, action) => {
      state.user!.role = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loggedIn = false;
    },
    setProfilePic: (state, action) => {
      if (state.user?.profilePic) {
        state.user.profilePic = action.payload;
      }
    },
    removeProfilePic: (state) => {
      state.user!.profilePic = { secure_url: "", publicId: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginStatus.rejected, (state, action) => {
        console.log(action.payload);
        state.loggedIn = false;
        state.user = null;
      })
      .addCase(fetchLoginStatus.fulfilled, (state, action) => {
        const data = action.payload;
        const status = data.success;
        if (status) {
          state.loggedIn = true;
          state.user = data.user;
        }
      });
  },
});

const UserReducer = userSlice.reducer;

const UserActions = userSlice.actions;

export { UserActions, UserReducer, fetchLoginStatus };
