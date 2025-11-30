import { createListenerMiddleware } from "@reduxjs/toolkit";
import { showToast } from "./toastActions";
import toast from "react-hot-toast";
import FollowRequest from "../../components/ui/CustomToast/FollowRequest";
import React from "react";
import NewFollower from "../../components/ui/CustomToast/NewFollower";
import { goTo } from "../../navigation";
import AcceptedMyRequest from "../../components/ui/CustomToast/AcceptedMyRequest";
import UserDeletedMyRequest from "../../components/ui/CustomToast/UserDeletedMyRequest";
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: showToast,
  effect: (action) => {
    const { type, user } = action.payload;

    if (type === "new-follow-rqst") {
      toast.custom((t) =>
        React.createElement(FollowRequest, {
          user,
          close: () => {
            toast.dismiss(t.id);
          },
          navigationFn: () => {
            goTo(`/profile/id/${user._id}`);
          },
        })
      );
    } else if (type === "request-accepted") {
      toast.custom((t) =>
        React.createElement(AcceptedMyRequest, {
          user,
          close: () => {
            toast.dismiss(t.id);
          },
          navigationFn: () => {
            goTo(`/profile/id/${user._id}`);
          },
        })
      );
    } else if (type === "my-request-deleted") {
      toast.custom((t) =>
        React.createElement(UserDeletedMyRequest, {
          user,
          close: () => {
            toast.dismiss(t.id);
          },
          navigationFn: () => {
            goTo(`/profile/id/${user._id}`);
          },
        })
      );
    } else if (type === "new-follower") {
      toast.custom((t) =>
        React.createElement(NewFollower, {
          user,
          navigationFn: () => {
            goTo(`/profile/id/${user._id}`);
          },
          close: () => {
            toast.dismiss(t.id);
          },
        })
      );
    }
  },
});

export default listenerMiddleware;
