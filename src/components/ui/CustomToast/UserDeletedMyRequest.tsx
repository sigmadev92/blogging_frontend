import type React from "react";
import type { FollowUser } from "../../../types/user";
import CustomButton from "../Button";
import ShowProfilePic from "../ShowProfilePic";
import { UserStarIcon } from "lucide-react";

type ToastProps = {
  user: FollowUser;
  close: () => void;
  navigationFn: () => void;
};
const UserDeletedMyRequest: React.FC<ToastProps> = ({
  user,
  close,
  navigationFn,
}) => {
  const { firstName, lastName } = user.fullName;
  const fullName = firstName + " " + lastName;

  return (
    <div className="rounded-md flex gap-2 theme max-w-[300px] text-[12px] p-2 border border-blue-500">
      <div className="h-10 w-10 flex flex-col justify-center items-center overflow-hidden rounded-full">
        <ShowProfilePic user={user} className="h-full w-full" />
      </div>
      <div>
        <h4>
          Request Deleted <UserStarIcon size={14} />{" "}
        </h4>
        <CustomButton onClick={navigationFn}>{fullName}</CustomButton> deleted
        your follow request
      </div>
      <div className="center h-10 w-10">
        <CustomButton onClick={close}>close</CustomButton>
      </div>
    </div>
  );
};

export default UserDeletedMyRequest;
