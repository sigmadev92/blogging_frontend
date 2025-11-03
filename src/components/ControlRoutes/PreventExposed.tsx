import type { ReactElement } from "react";
import { useAppSelector } from "../../redux_toolkit/store/hooks";
import { Navigate } from "react-router-dom";

const PreventExposed = ({ children }: { children: ReactElement }) => {
  const { loggedIn } = useAppSelector((state) => state.user);
  if (loggedIn) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default PreventExposed;
