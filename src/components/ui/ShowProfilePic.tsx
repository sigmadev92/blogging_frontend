import { _default } from "../../constants/images/default";
import { cloudinary_profilePic } from "../../constants/urls/cloudinary";
import type { FollowUser, User } from "../../types/user";

const ShowProfilePic = ({
  user,
  className,
}: {
  user: User | FollowUser;
  className?: string;
}) => {
  return (
    <>
      {user.profilePicToBeShown ? (
        <img
          src={
            user.profilePic?.version
              ? cloudinary_profilePic(user._id, user.profilePic.version)
              : _default.profilePic[user.gender || "NS"]
          }
          className={`${className || ""}`}
        />
      ) : (
        <>{user.fullName.firstName.charAt(0)}</>
      )}
    </>
  );
};

export default ShowProfilePic;
