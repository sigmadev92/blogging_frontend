import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux_toolkit/store/hooks";
import {
  myBlogAsyncActions,
  myBlogsActions,
} from "../../../../redux_toolkit/reducers/myblogsReducer";
import toast from "react-hot-toast";
import { blogsURL } from "../../../../functions/backend";
import BlogBox from "../../../../components/ui/BlogBox";

const Posts = () => {
  const { isFetched, myBlogs } = useAppSelector((state) => state.myBlogs);
  const { user } = useAppSelector((state) => state.user);
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const deleteBlogBtn = async (_id: string) => {
    setDeleting(true);
    await dispatch(myBlogAsyncActions.deleteBlog(_id));
    setDeleting(false);
  };

  useEffect(() => {
    if (isFetched) return;

    const fetchMyBlogs = async () => {
      try {
        const response = await fetch(`${blogsURL}/my-blogs`, {
          credentials: "include",
          method: "GET",
        });

        const data = await response.json();
        if (data.success) {
          dispatch(myBlogsActions.setMyBlogs(data.blogs));
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching blogs");
      }
    };
    fetchMyBlogs();
  }, []);

  return (
    <div className="h-full">
      <h2 className="font-bold">My blogs</h2>
      {myBlogs.length > 0 ? (
        <div className="w-full h-full overflow-scroll relative">
          {isDeleting && (
            <div className="absolute top-0 left-0 w-full center backdrop-blur-[2px] z-5">
              <p className="text-red-600 text-4xl font-bold">Deleting post</p>
            </div>
          )}
          <ul className="flex gap-2 flex-wrap shrink-0 list-none">
            {myBlogs.map((blogItem, idx) => (
              <BlogBox
                key={idx}
                blog={blogItem}
                author={{ fullName: user!.fullName, authorId: user!._id }}
                deleteBlogBtn={deleteBlogBtn}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className="center">
          <p>No blogs Yet</p>
        </div>
      )}
    </div>
  );
};

export default Posts;
