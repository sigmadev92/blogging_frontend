import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { FullName } from "../../types/user.ts";
import { followURL } from "../../functions/backend.ts";
import toast from "react-hot-toast";

type User = {
  _id: string;
  fullName: FullName;
  profilePic?: { secure_url: string; publicId: string };
  userName: string;
};
type MapUser = { [key: string]: User };
const initialState: {
  pendingOutgoing: MapUser;
  following: MapUser;
  followers: MapUser;
  pendingIncomming: MapUser;
} = {
  following: {},
  followers: {},
  pendingIncomming: {},
  pendingOutgoing: {},
};

const fetchFollowInfo = createAsyncThunk("fetchInfo", async () => {
  const response = await fetch(`${followURL}/fetch`, {
    credentials: "include",
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Request Failed ${response.status}`);
  }

  const data = await response.json();
  return data.profiles;
});

const followRequest = createAsyncThunk("followRequest", async (user: User) => {
  const response = await fetch(`${followURL}/create/${user._id}`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Request Failed ${response.status}`);
  }

  return user;
});

const acceptRequest = createAsyncThunk("acceptRequest", async (user: User) => {
  const response = await fetch(`${followURL}/accept/${user._id}`, {
    credentials: "include",
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error(`Request Failed ${response.status}`);
  }

  return user;
});

const deleteRequest = createAsyncThunk(
  "deleteRequest",
  async ({
    requestedBy,
    requestedTo,
  }: {
    requestedBy: string;
    requestedTo: string;
  }) => {
    const response = await fetch(
      `${followURL}/delete/${requestedBy}/${requestedTo}`,
      {
        credentials: "include",
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Request Failed ${response.status}`);
    }

    return { requestedBy, requestedTo };
  }
);

const unfollowUser = createAsyncThunk(
  "unfollowUser",
  async ({ requestedTo }: { requestedTo: string }) => {
    const response = await fetch(`${followURL}/unfollow/${requestedTo}`, {
      credentials: "include",
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Request Failed ${response.status}`);
    }

    return { requestedTo };
  }
);

const removeFollower = createAsyncThunk(
  "removeFollower",
  async ({ requestedBy }: { requestedBy: string }) => {
    const response = await fetch(`${followURL}/remove/${requestedBy}`, {
      credentials: "include",
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Request Failed ${response.status}`);
    }

    return { requestedBy };
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(followRequest.rejected, (_, action) => {
        toast.error((action.payload as Error).message);
      })
      .addCase(followRequest.fulfilled, (state, action) => {
        const user = action.payload;
        state.pendingOutgoing[(user as User)._id] = user;
      });
  },
});

const FollowReducer = followSlice.reducer;

const FollowActions = followSlice.actions;
const FollowThunkActions = {
  fetchFollowInfo,
  followRequest,
  acceptRequest,
  deleteRequest,
  unfollowUser,
  removeFollower,
};
export { FollowReducer, FollowActions, FollowThunkActions };
