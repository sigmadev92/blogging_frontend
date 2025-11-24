import { io } from "socket.io-client";
import { backendURL } from "../functions/backend";
import toast from "react-hot-toast";
import type { FollowUser } from "../types/user";
import store from "../redux_toolkit/store/store";
import { showToast } from "../redux_toolkit/actions/toastActions";
import { FollowActions } from "../redux_toolkit/reducers/followReducer";
import { visitedUserActions } from "../redux_toolkit/reducers/visitedUserFollow";

export const initSocket = (userId: string) => {
  const socket = io(backendURL, {
    query: { userId },
  });

  socket.on("connect", () => {
    console.log("Connected to socket.io server");
    // dispatch(setSocket(socket));
  });

  socket.on(
    "like-dislike-blog",
    ({
      userId,
      blogId,
      createdAt,
      action,
    }: {
      userId: string;
      blogId: string;
      createdAt: Date;
      action: 1 | -1;
    }) => {
      console.log(userId, blogId, createdAt, typeof action);

      if (action === -1) {
        toast.error(`User@${userId} disliked your blog`);
      } else {
        toast.success(`User@${userId} liked your blog`);
      }
    }
  );

  socket.on(
    "new-follow-request",
    ({ sender }: { sender: FollowUser; me: FollowUser }) => {
      store.dispatch(showToast({ type: "new-follow-rqst", user: sender }));
      store.dispatch(FollowActions.userRequestedToFollowMe({ user: sender }));
    }
  );
  socket.on(
    "user-accepted-my-request",
    ({ user, me }: { user: FollowUser; me: FollowUser }) => {
      store.dispatch(showToast({ type: "request-accepted", user }));
      store.dispatch(FollowActions.userAcceptedMyRequest({ user }));
      store.dispatch(visitedUserActions.addFollower({ user, me }));
    }
  );
  socket.on(
    "new-follower",
    ({ sender, me }: { sender: FollowUser; me: FollowUser }) => {
      store.dispatch(showToast({ type: "new-follower", user: sender }));
      store.dispatch(FollowActions.userStartedFollowingMe({ user: sender }));
      store.dispatch(visitedUserActions.addFollowing({ me }));
    }
  );
  socket.on(
    "they-unfollowed",
    ({ user, premium }: { user: FollowUser; premium: boolean }) => {
      store.dispatch(FollowActions.userUnfollowed({ userId: user._id }));
      if (premium)
        store.dispatch(showToast({ type: "user-unfollowed-you", user }));
    }
  );
  socket.on(
    "user-removed-me",
    ({ myId, hisId }: { myId: string; hisId: string }) => {
      store.dispatch(FollowActions.userRemovedMe({ myId, hisId }));
    }
  );
  socket.on("getOnlineUsers", (onlineUsers) => {
    console.log(onlineUsers);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket.io");
  });

  return socket;
};
