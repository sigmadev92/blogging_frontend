import EditDetails from "./EditDetails";
import Picture from "./Picture";

const EditProfile = () => {
  return (
    <div>
      <h3 className="font-bold">Edit Profile</h3>
      <div className="flex justify-around">
        <EditDetails />
        <Picture />
      </div>
    </div>
  );
};

export default EditProfile;
