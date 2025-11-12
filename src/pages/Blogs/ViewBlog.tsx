import { useLocation } from "react-router-dom";

const ViewBlog = () => {
  const { pathname } = useLocation();
  return <section>{pathname}</section>;
};

export default ViewBlog;
