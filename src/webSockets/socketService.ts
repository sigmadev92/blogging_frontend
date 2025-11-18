import { io } from "socket.io-client";
import { backendURL } from "../functions/backend";
import toast from "react-hot-toast";
// import type { DispatchProp } from "react-redux";
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

  socket.on("getOnlineUsers", (onlineUsers) => {
    console.log(onlineUsers);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket.io");
  });

  return socket;
};
