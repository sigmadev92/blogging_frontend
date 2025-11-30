import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux_toolkit/store/hooks";
import BlogsTab from "./Tab";
import { myBlogAsyncActions } from "../../../../../redux_toolkit/AsyncThunkActions/blog";
import Drafts from "./Drafts";
import PublishedBlogs from "./PublishedBlogs";

const Posts = () => {
  const { isFetched, myBlogs } = useAppSelector((state) => state.myBlogs);
  const [tab, setTab] = useState<number>(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFetched) return;

    const fetchMyBlogs = async () => {
      await dispatch(myBlogAsyncActions.fetchMyBlogs());
    };
    fetchMyBlogs();
  }, []);

  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="font-bold">My blogs</h2>
      {myBlogs.length > 0 ? (
        <div className="w-full h-[95%] overflow-y-auto">
          <BlogsTab tab={tab} setTab={setTab} />
          {tab === 1 && <PublishedBlogs blogs={myBlogs} />}

          {tab === 2 && <Drafts blogs={myBlogs} />}
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
