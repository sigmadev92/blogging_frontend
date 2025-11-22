import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import type { FullName } from "../../types/user.ts";
import { followURL } from "../../functions/backend.ts";
import toast from "react-hot-toast";

type User = {
  _id: string;
  fullName: FullName;
  profilePic?: { secure_url: string; publicId: string };
  userName?: string;
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

  const {
    profiles,
    myId,
  }: {
    profiles: {
      status: "pending" | "accepted";
      requestedTo: User;
      requestedBy: User;
    }[];
    myId: string;
  } = await response.json();
  return { profiles, myId };
});

const followRequest = createAsyncThunk("followRequest", async (user: User) => {
  const response = await fetch(`${followURL}/create/${user._id}`, {
    credentials: "include",
    method: "POST",
  });
  console.log("sas");
  if (!response.ok) {
    throw new Error(`Request Failed ${response.status}`);
  }
  console.log("ss:ss");
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

const deleteSentRequest = createAsyncThunk(
  "deleteSentRequest",
  async ({ requestedTo }: { requestedTo: string }) => {
    const response = await fetch(`${followURL}/delete/my/${requestedTo}`, {
      credentials: "include",
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Request Failed ${response.status}`);
    }

    return { requestedTo };
  }
);

const deleteReceivedRequest = createAsyncThunk(
  "deleteReceivedRequest",
  async ({ requestedBy }: { requestedBy: string }) => {
    const response = await fetch(`${followURL}/delete/other/${requestedBy}`, {
      credentials: "include",
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Request Failed ${response.status}`);
    }

    return { requestedBy };
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
  reducers: {
    show(state) {
      console.log(current(state));
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
  deleteSentRequest,
  deleteReceivedRequest,
  unfollowUser,
  removeFollower,
};
export { FollowReducer, FollowActions, FollowThunkActions };
