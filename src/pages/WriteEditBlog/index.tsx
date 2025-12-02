import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux_toolkit/store/hooks";
import editBlogThunkActions from "../../redux_toolkit/AsyncThunkActions/editBlog";

const WriteEditBlog = () => {
  const { blogId, blog } = useAppSelector((state) => state.editBlog);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (blogId) {
      dispatch(editBlogThunkActions.fetchBlog(blogId));
    }
  }, []);
  return (
    <section className="pt-11 theme h-full">
      {blog._id && <h2>{blog.title}</h2>}
    </section>
  );
};

export default WriteEditBlog;
