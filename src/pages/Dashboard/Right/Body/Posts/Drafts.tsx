import BlogBox from "../../../../../components/ui/BlogBox";
import { useAppSelector } from "../../../../../redux_toolkit/store/hooks";
import type { Blog } from "../../../../../types/blog";

const Drafts = ({ blogs }: { blogs: Blog[] }) => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div>
      <ul className="flex gap-2 flex-wrap shrink-0 list-none">
        {blogs
          .filter((ele) => !ele.isPublished)
          .map((blogItem, idx) => (
            <BlogBox
              key={idx}
              blog={blogItem}
              author={{ fullName: user!.fullName, authorId: user!._id }}
            />
          ))}
      </ul>
    </div>
  );
};

export default Drafts;
