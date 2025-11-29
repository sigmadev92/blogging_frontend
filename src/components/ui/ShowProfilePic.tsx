import { _default } from "../../constants/images/default";
import { cloudinary_profilePic } from "../../constants/urls/cloudinary";
import type { FollowUser, User } from "../../types/user";

const ShowProfilePic = ({
  user,
  className,
  showHere,
}: {
  user: User | FollowUser;
  className?: string;
  showHere?: boolean;
}) => {
  return (
    <div
      className={`${
        className || ""
      } overflow-hidden center bg-gray-300 shrink-0`}
    >
      {showHere || user.profilePicToBeShown ? (
        <img
          src={
            user.profilePic?.version
              ? cloudinary_profilePic(user._id, user.profilePic.version)
              : _default.profilePic[user.gender || "NS"]
          }
          className={"h-full w-full shrink-0"}
        />
      ) : (
        <b className="text-[1rem]">{user.fullName.firstName.charAt(0)}</b>
      )}
    </div>
  );
};

export default ShowProfilePic;
