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
      <li className="relative flex items-center">
        <CustomButton onClick={() => setIsClicked((prev) => !prev)}>
          <img
            alt="user-image"
            src={user!.profilePic || _default.profilePic}
            className="rounded-full w-6 h-6"
          />
        </CustomButton>
        {isClicked && (
          <div className="absolute top-8 rounded-md right-0 bg-white text-black dark:bg-gray-500 dark:text-white text-[12px] p-4">
            <CustomButton
              onClick={() => {}}
              className="hover:bg-amber-500 px-3 py-1 rounded-sm"
            >
              Logout
            </CustomButton>
          </div>
        )}
      </li>
    </>
  );
};

export default LoggedIn;
