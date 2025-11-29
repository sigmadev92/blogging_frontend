import EditDetails from "./EditDetails";
import Picture from "./Picture";

const EditProfile = () => {
  return (
    <div className="h-full">
      <div className="h-[5%]">
        <h3 className="font-bold">Edit Profile</h3>
      </div>
      <div className="flex flex-wrap-reverse h-[90%] overflow-y-auto">
        <EditDetails />
        <Picture />
      </div>
    </div>
  );
};

export default EditProfile;
