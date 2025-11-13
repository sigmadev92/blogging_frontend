import type { ReactElement } from "react";
import { useAppSelector } from "../../redux_toolkit/store/hooks";
import { Navigate } from "react-router-dom";

const ProtectSensitive = ({ children }: { children: ReactElement }) => {
  const { loggedIn } = useAppSelector((state) => state.user);
  const { loader } = useAppSelector((state) => state.loader);
  if (loader && !loggedIn) {
    return <div className="center">Loading</div>;
  }
  if (loggedIn) {
    return children;
  }
  return <Navigate to={"/out/login"} />;
};

export default ProtectSensitive;
