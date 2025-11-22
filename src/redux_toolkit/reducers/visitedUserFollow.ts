import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { followURL } from "../../functions/backend";
import toast from "react-hot-toast";
import type { FullName } from "../../types/user";

type User = {
  _id: string;
  fullName: FullName;
  profilePic?: { secure_url: string; publicId: string };
  userName?: string;
};
const initialState: { userId: string; followers: User[]; following: User[] } = {
  userId: "",
  followers: [],
  following: [],
};

const fetchFollowDetails = createAsyncThunk(
  "fetchFollowDetails",
  async ({ userId }: { userId: string }) => {
    const response = await fetch(`${followURL}/fetch-other/${userId}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Request Failed ${response.status}`);
    }

    const {
      profiles,
    }: {
      profiles: {
        status: "accepted";
        requestedTo: User;
        requestedBy: User;
      }[];
    } = await response.json();

    return { profiles, userId };
  }
);
const visitedUserSlice = createSlice({
  name: "visitedProfile",
  initialState,
  reducers: {
    addFollower: (state, action) => {
      state.followers.push(action.payload);
    },
    removeFollower: (state, action) => {
      const id = action.payload;
      const idx = state.followers.findIndex((ele) => ele._id === id);
      state.followers.splice(idx, 1);
    },
    addFollowing: (state, action) => {
      state.following.push(action.payload);
    },
    removeFollowing: (state, action) => {
      const id = action.payload;
      const idx = state.following.findIndex((ele) => ele._id === id);
      state.following.splice(idx, 1);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFollowDetails.rejected, (_, action) => {
        toast.error((action.error as Error).message);
      })
      .addCase(fetchFollowDetails.fulfilled, (state, action) => {
        const { profiles, userId } = action.payload;
        state.userId = userId;
        profiles.forEach((rqst) => {
          if (rqst.requestedBy._id === userId) {
            state.following.push(rqst.requestedTo);
          } else {
            state.followers.push(rqst.requestedBy);
          }
        });
      });
  },
});

const visitedUserReducer = visitedUserSlice.reducer;
const visitedUserActions = visitedUserSlice.actions;
const visitedUserThunkActions = { fetchFollowDetails };

export { visitedUserReducer, visitedUserActions, visitedUserThunkActions };
