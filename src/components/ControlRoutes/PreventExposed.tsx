import type { ReactElement } from "react";
import { useAppSelector } from "../../redux_toolkit/store/hooks";
import { Navigate } from "react-router-dom";

const PreventExposed = ({ children }: { children: ReactElement }) => {
  const { loggedIn } = useAppSelector((state) => state.user);
  const { loader } = useAppSelector((state) => state.loader);
  if (loader && !loggedIn) {
    return <div></div>;
  }
  if (loggedIn) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default PreventExposed;
