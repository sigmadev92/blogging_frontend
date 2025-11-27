import { createSlice } from "@reduxjs/toolkit";
import { type User } from "../../types/user";
import { UserThunkActions } from "../AsyncThunkActions/user";

const { fetchLoginStatus } = UserThunkActions;
const initialState: { loggedIn: boolean; user: User | null } = {
  loggedIn: false,
  user: null,
};

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
      state.user!.profilePic = { version: "", publicId: "" };
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

export { UserActions, UserReducer };
