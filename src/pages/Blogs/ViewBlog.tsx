import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { blogsURL } from "../../functions/backend";
import toast from "react-hot-toast";
import type { PublicBlog } from "../../types/blog";
import { _default } from "../../functions/images";
import getTimeAgo from "../../functions/time";
import {
  FlagIcon,
  HandHeartIcon,
  MessageSquareTextIcon,
  Share2Icon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  UserPlusIcon,
} from "lucide-react";
import CustomButton from "../../components/ui/Button";
import TextInput from "../../components/ui/TextInput";
import { useAppSelector } from "../../redux_toolkit/store/hooks";

const ViewBlog = () => {
  const { user } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();
  const [blog, setBlog] = useState<PublicBlog | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [inputComment, setComment] = useState<string>("");
  useEffect(() => {
    const blogId = pathname.split("/")[3];

    const fetchBlog = async () => {
      try {
        const response = await fetch(`${blogsURL}/public/one/${blogId}`, {
          method: "GET",
        });
        const data = await response.json();
        if (!data.success) {
          toast.error(data.message);
          return;
        }
        setBlog(data.blog);
        const { firstName, middleName, lastName } = data.blog.authorId.fullName;
        setFullName(firstName + " " + middleName + " " + lastName);
        console.log(data.blog);
      } catch (error) {
        console.log(error);
        toast.error("Error at client side");
      }
    };
    fetchBlog();
  }, []);
  return (
    <section className="pt-11 theme h-full">
      {blog ? (
        <div className="sm:flex justify-between px-4 h-[95%]">
          <div className="sm:w-[70%] border-light p-4 flex flex-col gap-4 h-full overflow-y-scroll">
            <div className="flex justify-between items-center">
              <p className="text-[12px] text-gray-500">
                Last Edited {getTimeAgo(blog.updatedAt!)}
              </p>
              <div className=" p-1 flex gap-4 items-center">
                <CustomButton>
                  <ThumbsUpIcon className="hover:text-blue-500" size={16} />
                </CustomButton>
                <CustomButton>
                  <ThumbsDownIcon className="hover:text-red-500" size={16} />
                </CustomButton>
                <CustomButton
                  onClick={() => {
                    document.getElementById("comment")!.focus();
                  }}
                >
                  <MessageSquareTextIcon
                    className="hover:text-[#de12d3]"
                    size={16}
                  />
                </CustomButton>
                <CustomButton>
                  <Share2Icon className="hover:text-[#de12d3]" size={16} />
                </CustomButton>
                <CustomButton>
                  <FlagIcon className="hover:text-red-600" size={16} />
                </CustomButton>
              </div>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto h-[90%]">
              <h2 className="text-2xl font-bold">{blog.title}</h2>

              {fullName && (
                <p className="visible sm:hidden text-[12px] text-gray-400 pl-4">
                  by {fullName}
                </p>
              )}
              {blog.thumbnail && (
                <img
                  src={blog.thumbnail.secure_url}
                  alt="Thumbnail"
                  className="w-140 h-70 "
                />
              )}

              <p className="mt-4">{blog.description}</p>

              <h3>Comments</h3>
              <div className="flex flex-col gap-4 px-4 mb-4">
                <TextInput
                  label="Add your comment"
                  style={{ label: "text-[14px]" }}
                  inputType="text"
                  placeholder="how you feel about this post? Please be respectful"
                  icon={<MessageSquareTextIcon size={16} />}
                  handleChange={(e) => setComment(e.target.value)}
                  value={inputComment}
                  name="comment"
                  variant="regular"
                />
                <CustomButton variant="regular-confirm" className="w-fit">
                  Post
                </CustomButton>
              </div>
            </div>
          </div>
          <div className="hidden md:visible w-[20%] sm:flex flex-col gap-4">
            <div className=" max-h-[250px] border-light flex flex-col items-center gap-2 py-2">
              <h2>About Author</h2>

              <img
                src={
                  blog.authorId.profilePic?.secure_url || _default.profilePic.NS
                }
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
              {blog.authorId.username && (
                <NavLink
                  to={`/profile/username/${blog.authorId.username}`}
                  className=" text-[12px] text-gray-400 hover:underline"
                >
                  /@{blog.authorId.username}
                </NavLink>
              )}
              {!user ||
                (blog.authorId._id !== user._id && (
                  <>
                    <CustomButton
                      variant={"regular-dark"}
                      className="hover:bg-blue-400 hover:text-white"
                    >
                      <span className="flex gap-2 items-center">
                        <UserPlusIcon size={16} />
                        <span className="">Follow</span>
                      </span>
                    </CustomButton>
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
                ))}
            </div>
            <div className=" h-[250px] overflow-auto border-light flex flex-col items-center gap-4 text-[12px] p-2">
              <h2 className=" font-bold">Search Tags for this post</h2>
              <ul className="flex flex-wrap gap-2 list-none">
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
        </div>
      ) : (
        <div className="center">
          <h2>No blog Found</h2>
        </div>
      )}
    </section>
  );
};

export default ViewBlog;
