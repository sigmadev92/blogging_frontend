import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux_toolkit/store/hooks";
import toast from "react-hot-toast";
import { usersURL } from "../../../../../functions/backend";
import { _default } from "../../../../../functions/images";
import CustomButton from "../../../../../components/ui/Button";
import { UserActions } from "../../../../../redux_toolkit/reducers/userReducer";
import { LoaderActions } from "../../../../../redux_toolkit/reducers/loaderReducer";

const Picture = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) {
      toast.error("Please choose a valid profile picture");
      return;
    }
    setProfilePic(file);
  };

  const handleFileSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!profilePic) {
      toast.error("Please choose a profile pic first");
      return;
    }
    dispatch(LoaderActions.startLoader("Uploading Profile Pic"));
    const formData = new FormData();

    formData.append("profilePic", profilePic);
    setProfilePic(null);

    try {
      const response = await fetch(`${usersURL}/update/profile-pic`, {
        credentials: "include",
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        const { secure_url, publicId } = data;
        dispatch(UserActions.setProfilePic({ secure_url, publicId }));
        toast.success("Profile Pic updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while uploading pics");
    } finally {
      dispatch(LoaderActions.stopLoader());
    }
  };

  const handleRemovePic = async () => {
    if (!user?.profilePic) {
      toast.error("No profile pic found");
      return;
    }
    dispatch(LoaderActions.startLoader("Removing Profile Picture"));
    try {
      const response = await fetch(`${usersURL}/remove/profile-pic`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        dispatch(UserActions.removeProfilePic());
        toast.success("Profile Picture updated");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong");
    } finally {
      dispatch(LoaderActions.stopLoader());
    }
  };
  return (
    <div className=" sm:w-[30%]">
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleFileSubmit}
        encType="mulitpart/formdata"
      >
        {!user?.profilePic?.publicId && (
          <p className="text-[12px] text-red-400">
            Profile picture Not set Yet
          </p>
        )}
        <div className="rounded-full w-40 h-40 overflow-hidden">
          {!profilePic ? (
            <img
              src={
                user?.profilePic?.secure_url ||
                _default.profilePic[user?.gender || "NS"]
              }
              className="w-full h-full"
            />
          ) : (
            <img
              src={URL.createObjectURL(profilePic)}
              className="w-full h-full"
            />
          )}
        </div>
        <input
          type="file"
          name="profilePic"
          className="hidden"
          accept=".jpeg, .jpg, .png"
          onChange={onFileChange}
          id="profilePic"
        />
        <label
          htmlFor="profilePic"
          className="text-[12px] bg-purple-500 px-3 py-1 cursor-pointer"
        >
          Choose Picture
        </label>
        {profilePic && (
          <CustomButton className="bg-blue-500 px-3 py-1" btnType="submit">
            Upload
          </CustomButton>
        )}
      </form>
      <div className="flex justify-center mt-12">
        {user?.profilePic?.secure_url && (
          <CustomButton
            className="bg-red-500 px-3 py-1"
            onClick={handleRemovePic}
          >
            Remove Pic
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default Picture;
