import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { followURL } from "../../functions/backend";
import toast from "react-hot-toast";
import type { FollowUser, FollowUserObject } from "../../types/user";
import { FollowThunkActions } from "../AsyncThunkActions/follow";

const { followRequest, acceptRequest, removeFollower, unfollowUser } =
  FollowThunkActions;
const initialState: {
  userId: string;
  followers: FollowUserObject;
  following: FollowUserObject;
} = {
  userId: "",
  followers: {},
  following: {},
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
        requestedTo: FollowUser;
        requestedBy: FollowUser;
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
      const { user, me }: { user: FollowUser; me: FollowUser } = action.payload;
      if (state.userId && state.userId === user._id) {
        state.followers[me._id] = me;
      }
    },
    removeFollower: (state, action) => {
      const { myId, hisId } = action.payload;
      if (state.userId === hisId && state.followers[myId])
        delete state.followers[myId];
    },
    addFollowing: (state, action) => {
      const { me }: { me: FollowUser } = action.payload;
      if (!state.following[me._id]) {
        state.following[me._id] = me;
      }
    },
    removeFollowing: (state, action) => {
      const { myId, hisId } = action.payload;
      if (state.userId && state.userId === hisId) {
        delete state.following[myId];
      }
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
            state.following[rqst.requestedTo._id] = rqst.requestedTo;
          } else {
            state.followers[rqst.requestedBy._id] = rqst.requestedBy;
          }
        });
      });
    builder.addCase(followRequest.fulfilled, (state, action) => {
      const { data, user } = action.payload;
      // if the logged in user is seeing a profile and the profile _id is same as the account followed by loggedIn user
      if (state.userId && state.userId === user._id) {
        if (data.isPublic) state.followers[data.sender._id] = data.sender;
      }
    });
    builder.addCase(acceptRequest.fulfilled, (state, action) => {
      const { me, user } = action.payload;
      if (state.userId && state.userId === user._id) {
        state.following[me._id] = me;
      }
    });
    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      const { myId, hisId } = action.payload;
      if (state.userId && state.userId === hisId) {
        delete state.followers[myId];
      }
    });
    builder.addCase(removeFollower.fulfilled, (state, action) => {
      const { requestedBy, myId } = action.payload;
      if (state.userId === requestedBy && state.following[myId])
        delete state.following[myId];
    });
  },
});

const visitedUserReducer = visitedUserSlice.reducer;
const visitedUserActions = visitedUserSlice.actions;
const visitedUserThunkActions = { fetchFollowDetails };

export { visitedUserReducer, visitedUserActions, visitedUserThunkActions };
