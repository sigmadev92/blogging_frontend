import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import type { PublicBlog } from "../../types/blog";
import NavigationOverlay from "../../components/ui/NavigationOverlay";
import ViewBlogLeft from "./Left";
import ViewBlogRight from "./Right";
import { blogsURL } from "../../constants/urls/backend";

const ViewBlog = () => {
  const { pathname } = useLocation();
  const [blog, setBlog] = useState<PublicBlog | null>(null);
  const [fullName, setFullName] = useState<string>("");

  const [showNavBox, setNavBox] = useState<boolean>(false);
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
      } catch (error) {
        console.log(error);
        toast.error("Error at client side");
      }
    };
    fetchBlog();
  }, []);

  return (
    <section className="pt-11 theme h-full">
      {showNavBox && (
        <NavigationOverlay
          navs={[{ label: "Login", link: "/out/login" }]}
          message="You are not logged in. Please login to Continue"
          close={() => setNavBox(false)}
        />
      )}
      {blog ? (
        <div className="sm:flex justify-between px-4 h-[95%]">
          <ViewBlogLeft fullName={fullName} blog={blog} setNavBox={setNavBox} />
          <ViewBlogRight
            fullName={fullName}
            blog={blog}
            setNavBox={setNavBox}
          />
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
