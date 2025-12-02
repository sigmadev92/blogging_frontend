import { NavLink } from "react-router-dom";
import { genderMap } from "../../../../constants/objects/genderValues";
import { useAppSelector } from "../../../../redux_toolkit/store/hooks";
import { ExternalLink } from "lucide-react";
import ShowProfilePic from "../../../../components/ui/ShowProfilePic";

const Overview = () => {
  const { user } = useAppSelector((state) => state.user);
  const { myBlogs } = useAppSelector((state) => state.myBlogs);
  const { followers, following } = useAppSelector((state) => state.follow);
  const { gender, fullName, _id, userName } = user!;
  const { firstName, lastName, middleName } = fullName;
  return (
    <div className="mx-auto lg:w-[50%] py-3 flex flex-col gap-3">
      <p className="text-red-400">
        All of this data is not public. You can control the privacy of your data
        in Settings
      </p>
      <div className="flex shrink-0 gap-16 items-center">
        <div className=" w-40 h-40">
          <ShowProfilePic
            user={user!}
            className="w-full h-full rounded-full shrink-0"
          />
        </div>
        <div>
          {userName ? (
            <NavLink
              to={`/profile/username/@${userName}`}
              className={"text-xl hover:underline"}
            >
              <span>/@</span>
              <span>{userName}</span>
            </NavLink>
          ) : (
            <span>username not set</span>
          )}
          <h3 className="text-2xl font-bold">
            {firstName + " " + middleName + " " + lastName}
          </h3>
          <NavLink
            to={`/profile/id/${_id}`}
            className={"text-[14px] px-3 text-blue-400 flex items-center gap-2"}
          >
            Public Profile <ExternalLink size={12} />
          </NavLink>
          <p>{genderMap[gender]}</p>
          <p>Account : {user?.isPublic ? "Public" : "Private"}</p>
          <div className="flex gap-4">
            <p>{myBlogs.length} Blogs</p>
            <p>{Object.keys(followers).length} Followers</p>
            <p>{Object.keys(following).length} Following</p>
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <div>
        <h3 className="text-cyan-400 text-2xl">About me</h3>
        <p>{user?.aboutMe || "Not set yet"}</p>
      </div>
    </div>
  );
};

export default Overview;
