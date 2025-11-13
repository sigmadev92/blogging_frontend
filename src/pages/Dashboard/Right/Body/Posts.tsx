import { useEffect } from "react";
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
  const dispatch = useAppDispatch();
  const deleteBlogBtn = async (_id: string) => {
    await dispatch(myBlogAsyncActions.deleteBlog(_id));
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
    <div className="h-full flex flex-col gap-4">
      <h2 className="font-bold">My blogs</h2>
      {myBlogs.length > 0 ? (
        <div className="w-full h-full overflow-scroll">
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
