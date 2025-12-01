import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux_toolkit/store/hooks";
import toast from "react-hot-toast";
import { usersURL } from "../../../../../constants/urls/backend";
import CustomButton from "../../../../../components/ui/Button";
import { UserActions } from "../../../../../redux_toolkit/reducers/userReducer";
import { LoaderActions } from "../../../../../redux_toolkit/reducers/loaderReducer";
import ShowProfilePic from "../../../../../components/ui/ShowProfilePic";

const Picture = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
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
      if (!response.ok) {
        throw new Error(`Request Failed ${response.status}`);
      }
      const data = await response.json();
      const { publicId, version } = data;
      console.log(publicId, version);
      dispatch(UserActions.setProfilePic({ publicId, version }));
      toast.success("Profile Pic updated successfully");
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
      if (!response.ok) {
        throw new Error(`Request Failed ${response.status}`);
      }

      dispatch(UserActions.removeProfilePic());
      toast.success("Profile Picture Removed");
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong");
    } finally {
      dispatch(LoaderActions.stopLoader());
    }
  };
  return (
    <div className="mb-4 flex justify-center md:flex-col w-[90%] md:w-[30%] border md:border-0 ">
      <form
        className="flex md:flex-col gap-4 items-center"
        onSubmit={handleFileSubmit}
        encType="mulitpart/formdata"
        id="picture"
      >
        {!user?.profilePic?.publicId && (
          <p className="text-[12px] text-red-400">
            Profile picture Not set Yet
          </p>
        )}
        <div className="rounded-full size-20  md:size-40 overflow-hidden">
          {!profilePic ? (
            <ShowProfilePic
              className="h-full w-full"
              user={user!}
              showHere={true}
            />
          ) : (
            <img
              src={URL.createObjectURL(profilePic)}
              className="w-full h-full shrink-0"
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
      </form>
      <div className=" flex flex-col gap-4 py-2 items-center w-[60%] md:w-full">
        <label
          htmlFor="profilePic"
          className="text-[12px] bg-purple-500 shrink-0 w-[100px] rounded text-center py-1 cursor-pointer"
        >
          Choose {profilePic ? "Another" : "Picture"}
        </label>
        {profilePic && (
          <>
            <CustomButton
              variant="regular-confirm"
              btnType="submit"
              className="w-[100px]"
              formRef="picture"
            >
              Upload
            </CustomButton>
            <CustomButton
              variant="regular-critical"
              btnType="button"
              onClick={() => setProfilePic(null)}
              className="w-[100px]"
            >
              Cancel
            </CustomButton>
          </>
        )}
        {user?.profilePic?.publicId && !profilePic && (
          <CustomButton
            variant="regular-danger"
            className="w-[100px]"
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
