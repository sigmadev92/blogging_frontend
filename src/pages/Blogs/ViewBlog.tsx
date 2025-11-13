import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { blogsURL } from "../../functions/backend";
import toast from "react-hot-toast";
import type { PublicBlog } from "../../types/blog";
import { _default } from "../../functions/images";

const ViewBlog = () => {
  const { pathname } = useLocation();
  const [blog, setBlog] = useState<PublicBlog | null>(null);
  const [fullName, setFullName] = useState<string>("");
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
          </div>
          <div className="hidden md:visible w-[20%] h-[250px] border-light sm:flex flex-col items-center gap-4">
            <h2>About Author</h2>

            <img
              src={
                blog.authorId.profilePic?.secure_url || _default.profilePic.NS
              }
              className="rounded-full w-20 h-20"
            />
            {fullName && (
              <p className=" text-[12px] text-gray-400">{fullName}</p>
            )}
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
