import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux_toolkit/store/hooks";
import TextInput from "../../../../../components/ui/TextInput";
import RadioInput from "../../../../../components/ui/RadioInput";
import {
  genderMap,
  genderRadioInput,
} from "../../../../../constants/objects/genderValues";
import CustomButton from "../../../../../components/ui/Button";
import { LoaderActions } from "../../../../../redux_toolkit/reducers/loaderReducer";
import toast from "react-hot-toast";
import { UserActions } from "../../../../../redux_toolkit/reducers/userReducer";
import { usersURL } from "../../../../../constants/urls/backend";

const EditDetails = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    firstName: user?.fullName.firstName,
    middleName: user?.fullName.middleName,
    lastName: user?.fullName.lastName,
    gender: user?.gender,
  });
  const { firstName, lastName, middleName, gender } = formData;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (
      user?.gender !== gender ||
      firstName !== user?.fullName.firstName ||
      middleName !== user?.fullName.middleName ||
      lastName !== user?.fullName.lastName
    ) {
      dispatch(LoaderActions.startLoader("Updating profile"));
      try {
        const response = await fetch(`${usersURL}/update/profile`, {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({
            gender,
            fullName: { firstName, middleName, lastName },
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        if (data.success) {
          toast.success("Profile updated Successfully");
          dispatch(UserActions.setUser(data.updatedUser));
          dispatch(LoaderActions.stopLoader());
          return;
        } else {
          toast.error("Error while updating details");
          dispatch(LoaderActions.stopLoader());
        }
      } catch (error) {
        console.log(error);
        toast.error("Error while updating details");
        dispatch(LoaderActions.stopLoader());
      }
    } else {
      toast.success("Profile updated Successfully");
    }
  };
  return (
    <div className="sm:w-[60%] mx-auto h-[90%] overflow-y-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextInput
          label="First Name"
          variant="regular"
          style={{ label: "text-[14px]" }}
          name="firstName"
          value={firstName || ""}
          handleChange={handleChange}
          placeholder="John"
          inputType="text"
        />
        <TextInput
          label="Middle Name"
          name="middleName"
          variant="regular"
          style={{ label: "text-[14px]" }}
          value={middleName || ""}
          handleChange={handleChange}
          placeholder="K"
          inputType="text"
        />
        <TextInput
          label="Last Name"
          name="lastName"
          style={{ label: "text-[14px]", input: "text-[14px]" }}
          variant="regular"
          value={lastName || ""}
          handleChange={handleChange}
          placeholder="Cena"
          inputType="text"
        />

        <RadioInput
          radioFields={genderRadioInput}
          selected={genderMap[gender || "NS"]}
          className="flex gap-4 items-center"
          handleChange={handleChange}
        />
        <CustomButton
          btnType={"submit"}
          className="w-fit px-4 bg-blue-500 py-1"
        >
          Update
        </CustomButton>
      </form>
    </div>
  );
};

export default EditDetails;
