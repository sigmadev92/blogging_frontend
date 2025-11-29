import { NavLink } from "react-router-dom";
import type { PublicBlog } from "../../../types/blog";
import { useAppSelector } from "../../../redux_toolkit/store/hooks";
import { HandHeartIcon } from "lucide-react";
import CustomButton from "../../../components/ui/Button";
import FollowBtn from "../../../components/ui/FollowBtn";
import ShowProfilePic from "../../../components/ui/ShowProfilePic";

const ViewBlogRight = ({
  blog,
  fullName,
  setNavBox,
}: {
  fullName: string;
  blog: PublicBlog;
  setNavBox: (e: boolean) => void;
}) => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="hidden md:visible w-[20%] sm:flex flex-col gap-4">
      <div className=" max-h-[250px] border-light flex flex-col items-center gap-2 py-2">
        <h2>About Author</h2>

        <ShowProfilePic
          user={blog.authorId}
          showHere={true}
          className="rounded-full w-20 h-20"
        />
        {fullName && (
          <NavLink
            to={`/profile/id/${blog.authorId._id}`}
            className=" text-[12px] text-gray-400 hover:underline"
          >
            {fullName}
          </NavLink>
        )}
        {blog.authorId.userName && (
          <NavLink
            to={`/profile/username/${blog.authorId.userName}`}
            className=" text-[12px] text-gray-400 hover:underline"
          >
            /@{blog.authorId.userName}
          </NavLink>
        )}
        {blog.authorId._id !== user?._id && (
          <>
            <FollowBtn user={blog.authorId} setNavBox={setNavBox} />
            <CustomButton
              variant={"regular"}
              className="bg-[#bc168a] hover:bg-blue-400 hover:text-white"
            >
              <span className="flex gap-2 items-center">
                <HandHeartIcon size={16} />
                <span className="">Donate</span>
              </span>
            </CustomButton>
          </>
        )}
      </div>
      <div className=" h-[250px] overflow-auto border-light flex flex-col items-center gap-4 text-[12px] p-2">
        <h2 className=" font-bold">Search Tags for this post</h2>
        <ul className="flex flex-wrap gap-2 list-none w-full">
          {blog.searchTags.map((item, idx) => (
            <li
              key={idx}
              className="bg-gray-500 text-white rounded px-2 py-1 text-[12px]"
            >
              {item}
            </li>
          ))}
        </ul>
        <h2 className=" font-bold">Topics for this post</h2>
        <ul className="flex flex-wrap gap-2 list-none w-full">
          {blog.topics.map((item, idx) => (
            <li
              key={idx}
              className="bg-gray-500 text-white rounded px-2 py-1 text-[12px]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewBlogRight;
