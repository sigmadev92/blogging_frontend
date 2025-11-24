import { createAction } from "@reduxjs/toolkit";
import type { FollowUser } from "../../types/user";

const showToast = createAction<{
  type?:
    | "like"
    | "new-follower"
    | "new-follow-rqst"
    | "request-accepted"
    | "user-unfollowed-you";
  user: FollowUser;
}>("ui/showToast");

export { showToast };
