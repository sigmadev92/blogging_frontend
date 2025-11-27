import { cloudinary_profilePicURL } from "../../functions/backend";
import { _default } from "../../functions/images";
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
            user.profilePic?.publicId
              ? `${cloudinary_profilePicURL}/${user._id}`
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
