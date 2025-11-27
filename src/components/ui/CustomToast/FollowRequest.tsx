import type React from "react";
import type { FollowUser } from "../../../types/user";
import CustomButton from "../Button";
import ShowProfilePic from "../ShowProfilePic";

type ToastProps = {
  user: FollowUser;
  close: () => void;
  navigationFn: () => void;
};
const FollowRequest: React.FC<ToastProps> = ({ user, close, navigationFn }) => {
  const { firstName, lastName } = user.fullName;
  const fullName = firstName + " " + lastName;

  return (
    <div className="rounded-md flex gap-2 theme max-w-[300px] text-[12px] p-2">
      <div className="h-10 w-10 flex flex-col justify-center items-center overflow-hidden rounded-full">
        <ShowProfilePic user={user} className="h-full w-full" />
      </div>
      <div>
        <h4>New Follow Request </h4>
        <CustomButton onClick={navigationFn}>{fullName}</CustomButton> has
        requested to follow you.
      </div>
      <div className="center h-10 w-10">
        <CustomButton onClick={close}>close</CustomButton>
      </div>
    </div>
  );
};

export default FollowRequest;
