import { useState } from "react";
import CustomButton from "../../../../../components/ui/Button";
import type { Blog } from "../../../../../types/blog";
import BlogBox from "../../../../../components/ui/BlogBox";
import { useAppSelector } from "../../../../../redux_toolkit/store/hooks";

const PublishedBlogs = ({ blogs }: { blogs: Blog[] }) => {
  const { user } = useAppSelector((state) => state.user);
  const [tab, setTab] = useState<number>(1);
  return (
    <div className="h-full">
      <div className="my-2">
        <ul className="list-none flex gap-2">
          {[
            { label: "Private", tab: 1 },
            { label: "Public", tab: 2 },
          ].map((item, idx) => (
            <li
              key={idx}
              className={`${
                item.tab === tab ? "bg-blue-400" : "bg-black"
              } text-white`}
            >
              <CustomButton onClick={() => setTab(item.tab)} variant="regular">
                {item.label}
              </CustomButton>
            </li>
          ))}
        </ul>
      </div>

      <ul className="flex gap-2 flex-wrap shrink-0 list-none">
        {tab === 1 && (
          <>
            {blogs
              .filter((ele) => ele.isPublished && !ele.isPublic)
              .map((blogItem, idx) => (
                <BlogBox
                  key={idx}
                  blog={blogItem}
                  author={{ fullName: user!.fullName, authorId: user!._id }}
                />
              ))}
          </>
        )}
        {tab === 2 && (
          <>
            {blogs
              .filter((ele) => ele.isPublished && ele.isPublic)
              .map((blogItem, idx) => (
                <BlogBox
                  key={idx}
                  blog={blogItem}
                  author={{ fullName: user!.fullName, authorId: user!._id }}
                />
              ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default PublishedBlogs;
