import type { ReactElement } from "react";
import { useAppSelector } from "../../redux_toolkit/store/hooks";
import { Navigate } from "react-router-dom";

const ProtectSensitive = ({ children }: { children: ReactElement }) => {
  const { loggedIn } = useAppSelector((state) => state.user);
  if (loggedIn) {
    return children;
  }
  return <Navigate to={"/out/login"} />;
};

export default ProtectSensitive;
