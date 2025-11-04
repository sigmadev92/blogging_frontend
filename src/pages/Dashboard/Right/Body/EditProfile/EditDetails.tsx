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
} from "../../../../../functions/constants/genderValues";
import CustomButton from "../../../../../components/ui/Button";
import { LoaderActions } from "../../../../../redux_toolkit/reducers/loaderReducer";
import { usersURL } from "../../../../../functions/backend";
import toast from "react-hot-toast";
import { UserActions } from "../../../../../redux_toolkit/reducers/userReducer";

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
    <div className="sm:w-[60%] mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextInput
          label="First Name"
          name="firstName"
          value={firstName || ""}
          handleChange={handleChange}
          placeholder="John"
          inputType="text"
        />
        <TextInput
          label="Middle Name"
          name="middleName"
          value={middleName || ""}
          handleChange={handleChange}
          placeholder="K"
          inputType="text"
        />
        <TextInput
          label="First Name"
          name="lastName"
          value={lastName || ""}
          handleChange={handleChange}
          placeholder="Cena"
          inputType="text"
        />

        <RadioInput
          radioFields={genderRadioInput}
          selected={genderMap[gender || "NS"]}
          className="flex justify-around items-center"
          handleChange={handleChange}
        />
        <CustomButton className="w-fit px-4 bg-blue-500 py-1">
          Update
        </CustomButton>
      </form>
    </div>
  );
};

export default EditDetails;
