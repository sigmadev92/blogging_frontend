import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogsURL } from "../../constants/urls/backend";
import type { Blog } from "../../types/blog";
import type { ImageType } from "../../types/image";

const WriteEditBlog = () => {
  const [blog, setBlog] = useState<{
    title: string;
    description: string;
    topics: string[];
    searchTags: string[];
    thumbnail: ImageType;
  }>({
    title: "",
    description: "",
    topics: [],
    searchTags: [],
    thumbnail: {
      secure_url: "",
      publicId: "",
    },
  });

  const { blogId } = useParams();

  useEffect(() => {
    if (!blogId) {
      return;
    }
    const fetchBlog = async () => {
      const response = await fetch(`${blogsURL}/one/${blogId}`, {
        credentials: "include",
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Request failed" + response.status);
      }
      const data: { blog: Blog } = await response.json();
      setBlog(data.blog);
    };
    fetchBlog();
  }, []);
  return <section className="theme pt-11 h-full">{blog.title}</section>;
};

export default WriteEditBlog;
