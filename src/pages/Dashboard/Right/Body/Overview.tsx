import { NavLink } from "react-router-dom";
import { genderMap } from "../../../../functions/constants/genderValues";
import { _default } from "../../../../functions/images";
import { useAppSelector } from "../../../../redux_toolkit/store/hooks";
import { ExternalLink } from "lucide-react";

const Overview = () => {
  const { user } = useAppSelector((state) => state.user);
  const { profilePic, gender, fullName, _id, role, userName } = user!;
  const { firstName, lastName, middleName } = fullName;
  return (
    <div className="mx-auto lg:w-[50%] py-3 flex flex-col gap-3">
      <p className="text-red-400">
        All of this data is not public. You can control the privacy of your data
        in Settings
      </p>
      <div className="flex shrink-0 gap-16 items-center">
        <div className=" w-40 h-40">
          <img
            src={profilePic?.secure_url || _default.profilePic[gender || "NS"]}
            className="w-full h-full rounded-full shrink-0"
          />
        </div>
        <div>
          <h4>{userName || "Username not set yet"}</h4>
          <h3 className="text-2xl font-bold">
            {firstName + " " + middleName + " " + lastName}
          </h3>
          <NavLink
            to={`/profile/userId/${_id}`}
            className={"text-[14px] px-3 text-blue-400 flex items-center gap-2"}
          >
            Public Profile <ExternalLink size={12} />
          </NavLink>
          <p>{genderMap[gender]}</p>
          <p>Account : {role === "author" ? "Public" : "Private"}</p>
          <div className="flex gap-4">
            <p>0 Blogs</p>
            <p>0 Followers</p>
            <p>0 Following</p>
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <div>
        <h3 className="text-cyan-400 text-2xl">About me</h3>
        <p>Not set yet</p>
      </div>
    </div>
  );
};

export default Overview;
