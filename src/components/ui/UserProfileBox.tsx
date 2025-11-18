import { NavLink } from "react-router-dom";
import { _default } from "../../functions/images";
import type { User } from "../../types/user";

const UserProfileBox = ({ user }: { user: User }) => {
  const { firstName, middleName, lastName } = user.fullName;
  const fullName = firstName + " " + middleName + " " + lastName;
  return (
    <li className="border-light rounded-md h-[150px] w-[200px] relative cursor-pointer hover:shadow-md shadow-blue-400">
      <img
        src={user.profilePic?.secure_url || _default.profilePic[user.gender]}
        className="h-12 w-12 border border-blue-600 rounded-full absolute top-[40%] left-4"
      />
      <div className="h-[70%] overflow-hidden rounded-t-md">
        <img
          className="h-full w-full"
          alt="user-profile-thumbnail"
          src={user.thumbnail?.secure_url || _default.thumbnail[1]}
        />
      </div>
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
