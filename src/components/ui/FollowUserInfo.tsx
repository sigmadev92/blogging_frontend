import { NavLink } from "react-router-dom";
import { cloudinary_profilePicURL } from "../../functions/backend";
import { _default } from "../../functions/images";
import type { FollowUser } from "../../types/user";
import FollowBtn from "./FollowBtn";

const FollowUserInfo = ({ user }: { user: FollowUser }) => {
  const { firstName, lastName } = user.fullName;
  const fullName = firstName + " " + lastName;
  return (
    <li className="flex w-[80%] border-light gap-4 p-2 px-3 items-center overflow-visible">
      <div className="center h-10 w-10">
        <img
          className="h-full w-full rounded-full"
          src={`${cloudinary_profilePicURL}/${user._id}`}
          srcSet={`
    ${cloudinary_profilePicURL}/${user._id},
    ${_default.profilePic.NS} 
  `}
        />
      </div>
      <div className="flex w-[90%] justify-between items-center">
        <NavLink
          to={`/profile/id/${user._id}`}
          className="text-[0.8rem] font-bold hover:underline"
        >
          {fullName}
        </NavLink>
        <FollowBtn user={user} setNavBox={() => {}} />
      </div>
    </li>
  );
};

export default FollowUserInfo;
