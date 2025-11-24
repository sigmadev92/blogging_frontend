import { createAsyncThunk } from "@reduxjs/toolkit";
import { followURL } from "../../functions/backend";
import type { FollowUser } from "../../types/user";

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
      requestedTo: FollowUser;
      requestedBy: FollowUser;
    }[];
    myId: string;
  } = await response.json();
  return { profiles, myId };
});

const followRequest = createAsyncThunk(
  "followRequest",
  async (user: FollowUser) => {
    const response = await fetch(`${followURL}/create/${user._id}`, {
      credentials: "include",
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`Request Failed ${response.status}`);
    }
    const data: { isPublic: boolean; sender: FollowUser } =
      await response.json();
    return { user, data };
  }
);

const acceptRequest = createAsyncThunk(
  "acceptRequest",
  async (user: FollowUser) => {
    const response = await fetch(`${followURL}/accept/${user._id}`, {
      credentials: "include",
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error(`Request Failed ${response.status}`);
    }
    const { me }: { me: FollowUser } = await response.json();
    return { user, me };
  }
);

const deleteSentRequest = createAsyncThunk(
  "deleteSentRequest",
  async ({ requestedTo }: { requestedTo: string }) => {
    const response = await fetch(`${followURL}/delete/my/${requestedTo}`, {
      credentials: "include",
      method: "DELETE",
    });
    console.log("sas");
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
    const response = await fetch(
      `${followURL}/remove-follower/${requestedBy}`,
      {
        credentials: "include",
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Request Failed ${response.status}`);
    }

    const { myId }: { myId: string } = await response.json();

    return { requestedBy, myId };
  }
);

export const FollowThunkActions = {
  fetchFollowInfo,
  followRequest,
  acceptRequest,
  deleteSentRequest,
  deleteReceivedRequest,
  unfollowUser,
  removeFollower,
};
