import { NavLink } from "react-router-dom";

const LoggedOut = () => {
  return (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/login"}>Sign In</NavLink>
      </li>
      <li>
        <NavLink to={"/credits"}>Credits</NavLink>
      </li>
    </>
  );
};

export default LoggedOut;
