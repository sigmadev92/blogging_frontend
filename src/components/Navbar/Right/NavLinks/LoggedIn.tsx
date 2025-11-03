import { NavLink } from "react-router-dom";
import CustomButton from "../../../ui/Button";
import { useAppSelector } from "../../../../redux_toolkit/store/hooks";
import { _default } from "../../../../functions/images";
import { useState } from "react";

const LoggedIn = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  return (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
      </li>
      <li className="relative">
        <CustomButton onClick={() => setIsClicked((prev) => !prev)}>
          <img
            alt="user-image"
            src={user!.profilePic || _default.profilePic}
            className="rounded-full"
          />
        </CustomButton>
        {isClicked && (
          <div className="absolute top-2 right-0 bg-white text-black dark:bg-gray-500 dark:text-white ">
            <CustomButton onClick={() => {}} className="hover:bg-amber-500">
              Logout
            </CustomButton>
          </div>
        )}
      </li>
    </>
  );
};

export default LoggedIn;
