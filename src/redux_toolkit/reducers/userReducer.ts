import { createSlice } from "@reduxjs/toolkit";
import { type User } from "../../types/user";
import { UserThunkActions } from "../AsyncThunkActions/user";
import toast from "react-hot-toast";

const {
  fetchLoginStatus,
  toggleAccountVisibility,
  toggleDisplayParam,
  setUsername,
} = UserThunkActions;
const initialState: { loggedIn: boolean; user: User | null } = {
  loggedIn: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleVisibilityParam: (state, action) => {
      console.log(action.payload);
      state.user = {
        ...state.user!,
        [action.payload.param]: action.payload.value,
      };
    },
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
    builder
      .addCase(toggleAccountVisibility.rejected, (_, action) => {
        toast.error((action.error as Error).message);
      })
      .addCase(toggleAccountVisibility.fulfilled, (state, action) => {
        if (state.user) state.user.isPublic = action.payload;
      });
    builder
      .addCase(toggleDisplayParam.rejected, (_, action) => {
        toast.error((action.error as Error).message);
      })
      .addCase(toggleDisplayParam.fulfilled, (state, action) => {
        const { param, newValue } = action.payload;
        if (state.user) {
          state.user = { ...state.user, [param]: newValue };
        }
      });
    builder
      .addCase(setUsername.rejected, (_, action) => {
        toast.error((action.error as Error).message);
      })
      .addCase(setUsername.fulfilled, (state, action) => {
        const { userName, userNameLastChangedAt } = action.payload;
        state.user!.userName = userName;
        state.user!.userNameLastChangedAt = userNameLastChangedAt;
      });
  },
});

const UserReducer = userSlice.reducer;

const UserActions = userSlice.actions;

export { UserActions, UserReducer };
