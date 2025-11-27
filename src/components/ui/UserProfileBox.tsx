import { NavLink } from "react-router-dom";
import type { User } from "../../types/user";
import ShowProfilePic from "./ShowProfilePic";
import ShowProfileThumbnail from "./ShowProfileThumbnail";

const UserProfileBox = ({ user }: { user: User }) => {
  const { firstName, middleName, lastName } = user.fullName;
  const fullName = firstName + " " + middleName + " " + lastName;
  return (
    <li className="border-light rounded-md h-[150px] w-[200px] relative cursor-pointer hover:shadow-md shadow-blue-400">
      <ShowProfilePic
        user={user}
        className="h-12 w-12 border border-blue-600 rounded-full absolute top-[40%] left-4"
      />
      <ShowProfileThumbnail user={user} className="h-full w-full" />
      <div className="h-[70%] overflow-hidden rounded-t-md"></div>
      <div className="h-[30%] px-2">
        {user.userName && <h4>{user.userName}</h4>}
        <NavLink
          to={`/profile/id/${user._id}`}
          className="text-[12px] text-gray-400 hover:underline"
        >
          {fullName}
        </NavLink>
      </div>
    </li>
  );
};

export default UserProfileBox;
