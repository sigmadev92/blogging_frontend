import { io } from "socket.io-client";
import toast from "react-hot-toast";
import type { FollowUser } from "../types/user";
import store from "../redux_toolkit/store/store";
import { showToast } from "../redux_toolkit/actions/toastActions";
import { FollowActions } from "../redux_toolkit/reducers/followReducer";
import { visitedUserActions } from "../redux_toolkit/reducers/visitedUserFollow";
import { backendURL } from "../constants/urls/backend";

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
    "user-deleted-their-sent-request",
    ({ user }: { user: FollowUser }) => {
      console.log("USer deleted his sent request", user);
      store.dispatch(
        FollowActions.userDeletedTheirSentRequest({ userId: user._id })
      );
    }
  );
  socket.on(
    "user-accepted-my-request",
    ({ user, me }: { user: FollowUser; me: FollowUser }) => {
      console.log(user, me);
      store.dispatch(showToast({ type: "request-accepted", user }));
      store.dispatch(FollowActions.userAcceptedMyRequest({ user }));
      store.dispatch(visitedUserActions.addFollower({ user, me }));
    }
  );
  socket.on(
    "user-deleted-my-request",
    ({
      user,
      accountPremium,
    }: {
      user: FollowUser;
      accountPremium: boolean;
    }) => {
      console.log("User Deleted my request", user);
      if (accountPremium) {
        store.dispatch(showToast({ type: "my-request-deleted", user }));
      }
      store.dispatch(FollowActions.userDeletedMyRequest({ userId: user._id }));
    }
  );
  socket.on(
    "new-follower",
    ({ sender, me }: { sender: FollowUser; me: FollowUser }) => {
      console.log("New follower");
      store.dispatch(showToast({ type: "new-follower", user: sender }));
      store.dispatch(FollowActions.userStartedFollowingMe({ user: sender }));
      store.dispatch(visitedUserActions.addFollowing({ me }));
    }
  );
  socket.on(
    "they-unfollowed",
    ({
      user,
      premium,
      myId,
    }: {
      user: FollowUser;
      premium: boolean;
      myId: string;
    }) => {
      store.dispatch(FollowActions.userUnfollowed({ userId: user._id }));
      if (premium)
        store.dispatch(showToast({ type: "user-unfollowed-you", user }));
      store.dispatch(
        visitedUserActions.removeFollowing({ myId, hisId: user._id })
      );
    }
  );
  socket.on(
    "user-removed-me",
    ({ myId, hisId }: { myId: string; hisId: string }) => {
      store.dispatch(FollowActions.userRemovedMe({ myId, hisId }));
      store.dispatch(visitedUserActions.removeFollower({ hisId, myId }));
    }
  );

  socket.on("disconnect", () => {
    console.log("Disconnected from socket.io");
  });

  return socket;
};
