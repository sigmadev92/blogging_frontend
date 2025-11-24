import { createSlice, current } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import type { FollowUser, FollowUserObject } from "../../types/user";

import { FollowThunkActions } from "../AsyncThunkActions/follow";

const {
  fetchFollowInfo,
  followRequest,
  acceptRequest,
  deleteSentRequest,
  deleteReceivedRequest,
  removeFollower,
  unfollowUser,
} = FollowThunkActions;

const initialState: {
  pendingOutgoing: FollowUserObject;
  following: FollowUserObject;
  followers: FollowUserObject;
  pendingIncomming: FollowUserObject;
} = {
  following: {},
  followers: {},
  pendingIncomming: {},
  pendingOutgoing: {},
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    show(state) {
      console.log(current(state));
    },
    userAcceptedMyRequest: (state, action) => {
      const { user }: { user: FollowUser } = action.payload;
      delete state.pendingOutgoing[user._id];
      state.following[user._id] = user;
    },
    userRequestedToFollowMe: (state, action) => {
      const { user }: { user: FollowUser } = action.payload;

      state.pendingIncomming[user._id] = user;
    },
    userStartedFollowingMe: (state, action) => {
      const { user }: { user: FollowUser } = action.payload;
      state.followers[user._id] = user;
    },
    userUnfollowed: (state, action) => {
      const { userId } = action.payload;
      if (state.followers[userId]) {
        delete state.followers[userId];
      }
    },
    userRemovedMe: (state, action) => {
      const { myId } = action.payload;
      if (state.following[myId]) delete state.followers[myId];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowInfo.rejected, (_, action) => {
        toast.error((action.error as Error).message);
      })
      .addCase(fetchFollowInfo.fulfilled, (state, action) => {
        const { profiles, myId } = action.payload;
        profiles.forEach(({ requestedBy, requestedTo, status }) => {
          console.log(requestedBy._id, requestedTo._id, myId);
          if (requestedBy._id === myId) {
            if (status === "pending") {
              state.pendingOutgoing[requestedTo._id] = requestedTo;
            } else {
              state.following[requestedTo._id] = requestedTo;
            }
          } else {
            if (status === "pending") {
              state.pendingIncomming[requestedBy._id] = requestedBy;
            } else {
              state.followers[requestedBy._id] = requestedBy;
            }
          }
        });
        console.log(profiles);
      });
    builder
      .addCase(followRequest.rejected, (_, action) => {
        toast.error((action.error as Error).message);
      })
      .addCase(followRequest.fulfilled, (state, action) => {
        console.log(action.payload);
        const { user, data } = action.payload;
        //if receiver's account is public
        if (data.isPublic) {
          console.log("sss");
          state.following[user._id] = user;
        } else state.pendingOutgoing[user._id] = user;
      });

    builder
      .addCase(acceptRequest.rejected, (_, action) => {
        toast.error((action.error as Error).message);
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        const { user } = action.payload;
        delete state.pendingIncomming[user._id];
        state.followers[user._id] = user;
      });
    builder
      .addCase(deleteSentRequest.rejected, (_, action) => {
        toast.error((action.error as Error).message);
      })
      .addCase(deleteSentRequest.fulfilled, (state, action) => {
        const { requestedTo } = action.payload;
        delete state.pendingOutgoing[requestedTo];
      });

    builder
      .addCase(deleteReceivedRequest.rejected, (_, action) => {
        toast.error((action.error as Error).message);
      })
      .addCase(deleteReceivedRequest.fulfilled, (state, action) => {
        const { requestedBy } = action.payload;
        delete state.pendingIncomming[requestedBy];
      });

    builder
      .addCase(unfollowUser.rejected, (_, action) => {
        toast.error((action.error as Error).message);
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        const { requestedTo } = action.payload;
        delete state.following[requestedTo];
      });
    builder
      .addCase(removeFollower.rejected, (_, action) => {
        toast.error((action.error as Error).message);
      })
      .addCase(removeFollower.fulfilled, (state, action) => {
        const { requestedBy } = action.payload;
        delete state.following[requestedBy];
      });
  },
});

const FollowReducer = followSlice.reducer;

const FollowActions = followSlice.actions;

export { FollowReducer, FollowActions };
