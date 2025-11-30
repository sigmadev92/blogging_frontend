import { useEffect, useState } from "react";
import BlogBox from "../components/ui/BlogBox";
import { type PublicBlog1 } from "../types/blog";
import { blogsURL } from "../constants/urls/backend";

const Blogs = () => {
  const [blogs, setBlogs] = useState<PublicBlog1[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${blogsURL}/all`);

        if (!response.ok) {
          throw new Error(`Request Failed ${response.status}`);
        }
        const data = await response.json();

        console.log(data.blogs);
        setBlogs(data.blogs);
      } catch (error) {
        console.log(error);
        setError("Client Error. Working on it");
      }
    };
    fetchBlogs();
  }, []);
  return (
    <section className="theme pt-11 h-full">
      <div className="flex gap-2 px-4 h-[95%]">
        <div className="md:w-[15%] hidden md:block border-light md:h-full">
          <h3 className="font-bold text-[14px] text-center">Categories</h3>
        </div>
        <div className="md:w-[83%] border-light h-full">
          {blogs.length > 0 ? (
            <div className="w-full h-full flex justify-center overflow-y-auto overflow-x-hidden p-1">
              <ul className="flex gap-2 flex-wrap list-none">
                {blogs.map((blogItem, idx) => (
                  <BlogBox
                    key={idx}
                    blog={blogItem}
                    author={{
                      ...blogItem.authorId,
                      authorId: blogItem.authorId._id,
                    }}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div className="center">{error}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
