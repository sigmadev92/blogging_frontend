import { type Blog } from "../../types/blog";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "./Button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import type { FullName } from "../../types/user";
import { useAppSelector } from "../../redux_toolkit/store/hooks";

const BlogBox = ({
  blog,
  author,
  deleteBlogBtn,
}: {
  author: {
    fullName: FullName;
    authorId: string;
  };
  blog: Blog;
  deleteBlogBtn?: (ele: string) => void;
}) => {
  const { title, thumbnail, _id } = blog;
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <li className="h-[200px] w-[300px] theme border-light p-2 relative hover:shadow-blue-400 cursor-pointer hover:shadow-md">
      <div className="h-[60%] w-full">
        <img
          src={thumbnail.secure_url}
          alt="the thumbnail of this blog post"
          className="h-full w-full"
        />
      </div>
      <NavLink
        to={`/blog/view/${_id}`}
        className="font-bold hover:text-blue-400"
      >
        {title}
      </NavLink>

      <div className="absolute p-2 w-full bottom-0 flex justify-between">
        <p className="text-[12px]">{author.fullName.firstName}</p>
        {user?._id === author.authorId && (
          <div className="flex gap-3 pr-4">
            <CustomButton
              className="hover:text-blue-400"
              onClick={() => navigate(`/in/blog/edit/${_id}`)}
            >
              <PencilIcon size={14} />
            </CustomButton>
            <CustomButton
              className="hover:text-red-600"
              onClick={() => deleteBlogBtn && deleteBlogBtn(_id)}
            >
              <Trash2Icon size={14} />
            </CustomButton>
          </div>
        )}
      </div>
    </li>
  );
};

export default BlogBox;
