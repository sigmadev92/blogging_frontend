import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../ui/Button";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux_toolkit/store/hooks";
import { _default } from "../../../../functions/images";
import { usersURL } from "../../../../functions/backend";
import { UserActions } from "../../../../redux_toolkit/reducers/userReducer";
import toast from "react-hot-toast";
import { useState } from "react";

const LoggedIn = () => {
  const { user } = useAppSelector((state) => state.user);
  const [opened, setOpened] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      const response = await fetch(`${usersURL}/signout`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        dispatch(UserActions.logout());
        navigate("/login");
        toast.success("logged out successfully");
      } else {
        toast.error("failed to Logout");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };
  return (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
      </li>
      <li className="relative flex items-center">
        <CustomButton onClick={() => setOpened((prev) => !prev)}>
          <img
            alt="user-image"
            src={user!.profilePic || _default.profilePic}
            className="rounded-full w-6 h-6"
          />
        </CustomButton>
        {opened && (
          <div className="absolute top-8 rounded-md right-0 bg-white text-black dark:bg-gray-500 dark:text-white text-[12px] p-4">
            <CustomButton
              className="hover:bg-amber-500 px-3 py-1 rounded-sm"
              onClick={logoutUser}
            >
              <span>Logout</span>
            </CustomButton>
          </div>
        )}
      </li>
    </>
  );
};

export default LoggedIn;
