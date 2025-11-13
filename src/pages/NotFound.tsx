import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="center">
      <p>Invalid Route</p>
      <NavLink to={"/"}>Home</NavLink>
    </div>
  );
};

export default NotFound;
