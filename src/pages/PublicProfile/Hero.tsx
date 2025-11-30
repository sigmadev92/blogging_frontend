import { HandHeartIcon, MailIcon } from "lucide-react";
import CustomButton from "../../components/ui/Button";
import type { User } from "../../types/user";
import { cloudinary_thumbnail } from "../../constants/urls/cloudinary";
import ShowProfilePic from "../../components/ui/ShowProfilePic";
import { useAppSelector } from "../../redux_toolkit/store/hooks";
import FollowBtn from "../../components/ui/FollowBtn";
import { useState } from "react";
import type { Blog } from "../../types/blog";

const ProfileHero = ({
  author,
  fullName,
  setNavBox,
  blogs,
}: {
  author: User;
  fullName: string;
  setNavBox: (e: boolean) => void;
  blogs: Blog[];
}) => {
  const { user } = useAppSelector((state) => state.user);
  const visitedUser = useAppSelector((state) => state.visitedUser);
  const [isInfo1, setInfo1] = useState<boolean>(false);
  return (
    <div
      className="h-[40%] relative"
      style={{
        backgroundImage: author.thumbnailToBeShown
          ? author.thumbnail?.version
            ? cloudinary_thumbnail(author._id, author.thumbnail.version)
            : `url("https://wallpapercave.com/wp/wp8948495.jpg")`
          : undefined,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex gap-4 items-center absolute w-[400px] bottom-0 rounded-md left-[50%] translate-x-[-50%] backdrop-blur-md p-2">
        <ShowProfilePic user={author} className="rounded-full h-28 w-28" />
        <div className="flex flex-col gap-2 w-[280px]">
          {author.userName && (
            <span className=" font-bold -mb-2">
              {author.userName || "@username"}
            </span>
          )}
          {fullName && <h2 className="font-bold">{fullName}</h2>}
          {!user ||
            (author._id !== user._id && (
              <>
                <div className="flex gap-2">
                  <FollowBtn
                    user={{
                      _id: author._id,
                      fullName: author.fullName,
                      userName: author.userName,
                      profilePicToBeShown: author.profilePicToBeShown,
                    }}
                    setNavBox={setNavBox}
                  />
                  <CustomButton
                    variant={"regular"}
                    className="bg-[#bc168a] hover:bg-blue-400 hover:text-white"
                  >
                    <span className="flex gap-2 items-center">
                      <HandHeartIcon size={16} />
                      <span className="">Donate</span>
                    </span>
                  </CustomButton>

                  <div className="relative">
                    <CustomButton
                      onClick={() => {
                        setInfo1((prev) => !prev);
                      }}
                    >
                      <MailIcon size={14} />
                    </CustomButton>
                    {isInfo1 && (
                      <div className="absolute top-6 -left-[150px] rounded theme border text-[12px] w-[150px] p-2">
                        <p className="font-fold text-red-500">
                          The email is hidden.
                        </p>
                        <p>
                          You need to have a premium account to see email of
                          authors
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ))}
          <div className="flex justify-around items-center gap-3">
            <div className="flex flex-col items-center">
              <span>{blogs.length}</span>
              <span className="text-[12px]">Blogs</span>
            </div>
            <div className="flex flex-col items-center">
              <span>{Object.keys(visitedUser.followers).length}</span>
              <span className="text-[12px]">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <span>{Object.keys(visitedUser.following).length}</span>
              <span className="text-[12px]">Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
