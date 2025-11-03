import { createSlice } from "@reduxjs/toolkit";
import { type User } from "../../types/user";
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
  },
});

const UserReducer = userSlice.reducer;

const UserActions = userSlice.actions;

export { UserActions, UserReducer };
