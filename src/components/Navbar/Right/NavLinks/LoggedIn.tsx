import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../../ui/Button";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux_toolkit/store/hooks";

import { UserActions } from "../../../../redux_toolkit/reducers/userReducer";
import toast from "react-hot-toast";
import { useState } from "react";
import { PenToolIcon, PlusCircleIcon } from "lucide-react";
import { usersURL } from "../../../../constants/urls/backend";
import ShowProfilePic from "../../../ui/ShowProfilePic";

const LoggedIn = () => {
  const { user } = useAppSelector((state) => state.user);
  const [opened, setOpened] = useState(false);
  const [plusMenu, setPlusMenu] = useState(false);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      const response = await fetch(`${usersURL}/signout`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        dispatch(UserActions.logout());
        navigate("/out/login");
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
      {pathname !== "/in/blog/new" && (
        <li className="relative">
          <CustomButton
            onClick={() => {
              setPlusMenu((prev) => !prev);
              setOpened(false);
            }}
          >
            <PlusCircleIcon size={14} />
          </CustomButton>

          {plusMenu && (
            <div className="absolute top-8 translate-x-[-50%] rounded border p-2 dark:bg-gray-600 dark:text-white bg-white text-black w-[150px]">
              <NavLink
                to={"/in/blog/new"}
                onClick={() => setPlusMenu(false)}
                className={
                  "flex items-center gap-2 hover:bg-amber-500 py-0.5 px-2"
                }
              >
                <PenToolIcon size={14} />
                <span>Create a blog</span>
              </NavLink>
            </div>
          )}
        </li>
      )}
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>

      <li>
        <NavLink to={"/in/dashboard"}>Dashboard</NavLink>
      </li>
      <li className="relative flex items-center">
        <CustomButton
          onClick={() => {
            setOpened((prev) => !prev);
            setPlusMenu(false);
          }}
        >
          <ShowProfilePic
            user={user!}
            className="rounded-full w-6 h-6"
            showHere={true}
          />
        </CustomButton>
        {opened && (
          <div className="absolute top-8 rounded-md right-0 bg-white text-black dark:bg-gray-500 dark:text-white text-[12px] p-2 border flex flex-col gap-1 w-[150px] box-border overflow-hidden">
            <span className="font-bold block">
              {user?.fullName.firstName + " " + user?.fullName.lastName}
            </span>
            <span>{user?.email}</span>
            <hr />
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
