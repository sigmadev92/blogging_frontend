import { _default } from "../../constants/images/default";
import { cloudinary_thumbnail } from "../../constants/urls/cloudinary";
import type { FollowUser, User } from "../../types/user";

const ShowProfileThumbnail = ({
  user,
  className,
}: {
  user: User | FollowUser;
  className?: string;
}) => {
  return (
    <>
      {user.thumbnailToBeShown ? (
        <img
          className={`${className || ""}`}
          alt="user-profile-thumbnail"
          src={
            user.thumbnail?.version
              ? cloudinary_thumbnail(user._id, user.profilePic!.version)
              : _default.profileThumbnail[0]
          }
        />
      ) : (
        <div className="center">
          <p className="text-[10px] md:text-4xl">No Thumbnail</p>
        </div>
      )}
    </>
  );
};

export default ShowProfileThumbnail;
