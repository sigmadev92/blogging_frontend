import { cloudinary_profileThmbnailURL } from "../../functions/backend";
import { _default } from "../../functions/images";
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
            user.thumbnail?.publicId
              ? `${cloudinary_profileThmbnailURL}/${user._id}`
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
