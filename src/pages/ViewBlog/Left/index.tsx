import { useState } from "react";
import CustomButton from "../../../components/ui/Button";
import getTimeAgo from "../../../constants/functions/time";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux_toolkit/store/hooks";
import type { PublicBlog } from "../../../types/blog";
import { LikeThunkActions } from "../../../redux_toolkit/AsyncThunkActions/like";
import {
  FlagIcon,
  MessageSquareTextIcon,
  Share2Icon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import TextInput from "../../../components/ui/TextInput";
const ViewBlogLeft = ({
  blog,
  setNavBox,
  fullName,
}: {
  fullName: string;
  blog: PublicBlog;
  setNavBox: (e: boolean) => void;
}) => {
  const { likes } = useAppSelector((state) => state.like);
  const [inputComment, setComment] = useState<string>("");
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const likeDislikeBtnFn = async (action: 1 | -1) => {
    if (!blog) return;
    console.log(action);
    if (!user) {
      setNavBox(true);
      return;
    }
    await dispatch(LikeThunkActions.likeDislike({ blogId: blog!._id, action }));
  };
  const unlikeBtnFn = async () => {
    if (!blog) return;
    if (!user) {
      setNavBox(true);
      return;
    }

    await dispatch(LikeThunkActions.unlike({ blogId: blog._id }));
  };

  const commentBtnFn = () => {
    if (!blog) return;
    if (!user) {
      setNavBox(true);
      return;
    }
    document.getElementById("comment")!.focus();
  };

  const postCommentBtnFn = async () => {};
  return (
    <div className="sm:w-[70%] border-light p-4 flex flex-col gap-4 h-full ">
      <div className="flex justify-between items-center">
        <p className="text-[12px] text-gray-500">
          Last Edited {getTimeAgo(blog.updatedAt!)}
        </p>

        <div className=" p-1 flex gap-4 items-center">
          {likes[blog._id]?.action === 1 ? (
            <CustomButton
              onClick={() => {
                unlikeBtnFn();
              }}
            >
              <ThumbsUpIcon
                className="hover:text-blue-500"
                size={16}
                fill="blue"
              />
            </CustomButton>
          ) : (
            <CustomButton
              onClick={() => {
                likeDislikeBtnFn(1);
              }}
            >
              <ThumbsUpIcon className="hover:text-blue-500" size={16} />
            </CustomButton>
          )}

          {likes[blog._id]?.action === -1 ? (
            <CustomButton
              onClick={() => {
                unlikeBtnFn();
              }}
            >
              <ThumbsDownIcon
                className="hover:text-red-500"
                size={16}
                fill="red"
              />
            </CustomButton>
          ) : (
            <CustomButton
              onClick={() => {
                likeDislikeBtnFn(-1);
              }}
            >
              <ThumbsDownIcon className="hover:text-red-500" size={16} />
            </CustomButton>
          )}

          <CustomButton onClick={() => commentBtnFn()}>
            <MessageSquareTextIcon className="hover:text-[#de12d3]" size={16} />
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
          <NavLink
            to={`/profile/id/${blog.authorId._id}`}
            className="block sm:hidden text-[12px] text-gray-400 pl-4 hover:underline"
          >
            by {fullName}
          </NavLink>
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
        {user && (
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
            <CustomButton
              variant="regular-confirm"
              className="w-fit"
              onClick={postCommentBtnFn}
            >
              Post
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBlogLeft;
