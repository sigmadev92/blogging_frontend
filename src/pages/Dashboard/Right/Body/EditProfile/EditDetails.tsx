import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
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
import { searchURL, usersURL } from "../../../../../constants/urls/backend";
import CustomTextArea from "../../../../../components/ui/TextArea";
import { canChangeUsername } from "../../../../../constants/functions/time";
import { UserThunkActions } from "../../../../../redux_toolkit/AsyncThunkActions/user";

const EditDetails = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    userName: user?.userName,
    firstName: user?.fullName.firstName,
    middleName: user?.fullName.middleName,
    lastName: user?.fullName.lastName,
    gender: user?.gender,
    dob: user?.dob,
    aboutMe: user?.aboutMe || "",
  });
  const { firstName, lastName, middleName, gender, dob, aboutMe } = formData;
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    console.log(username);
    if (username.length === 0) return;
    console.log(`${searchURL}/check-username?username=${username}`);
    setTimeout(() => {
      fetch(`${searchURL}/check-username?username=${username}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (!data.valid) setStatus("Invalid username");
          else if (!data.available) setStatus("Already taken ❌");
          else setStatus("Available ✔");
        });
    }, 300); // debounce

    // return () => clearTimeout(timer);
  }, [username]);

  const get18YearsBack = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().split("T")[0];
  };
  const initialDate = dob
    ? new Date(dob).toISOString().slice(0, 10) // ensure YYYY-MM-DD format
    : get18YearsBack();

  const [birthdate, setBirthdate] = useState(initialDate);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(dob);
    if (
      user?.gender !== gender ||
      firstName !== user?.fullName.firstName ||
      middleName !== user?.fullName.middleName ||
      lastName !== user?.fullName.lastName ||
      aboutMe !== user?.aboutMe ||
      birthdate !== initialDate
    ) {
      dispatch(LoaderActions.startLoader("Updating profile"));
      try {
        const response = await fetch(`${usersURL}/update/profile`, {
          method: "PUT",

          credentials: "include",
          body: JSON.stringify({
            gender,
            fullName: { firstName, middleName, lastName },
            dob: birthdate,
            dobSet: Boolean(dob),
            aboutMe,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        if (data.success) {
          toast.success("Profile updated Successfully");
          dispatch(UserActions.setUser(data.updatedUser));
          dispatch(LoaderActions.stopLoader());
          dispatch(
            UserActions.toggleVisibilityParam({
              param: "dobSet",
              value: Boolean(dob),
            })
          );
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

  const saveUserName = async () => {
    await dispatch(UserThunkActions.setUsername({ userName: username }));
  };

  return (
    <div className="w-[90%] md:w-[60%] mx-auto max-h-[95%] overflow-y-auto pr-5 pb-4">
      <div className="flex gap-4 items-center">
        <TextInput
          label="Username"
          style={{
            label: "text-[14px] font-bold",
            size: "flex gap-3 items-center",
          }}
          name="userName"
          max={30}
          value={formData.userName || username}
          readOnly={!canChangeUsername(user!)}
          handleChange={(e) => setUsername(e.target.value)}
          inputType="text"
          placeholder="@handle"
        />
        <p className="text-[12px] text-green-500">
          {username.length >= 4 && status === "Available ✔"
            ? "available"
            : "Not Available"}
        </p>
        <CustomButton
          variant="regular-confirm"
          onClick={() => {
            saveUserName();
          }}
        >
          Set
        </CustomButton>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <h3 className="font-bold -mb-4">Full Name</h3>
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
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dob" className="font-bold">
            Date of Birth
          </label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            max={get18YearsBack()} // optional: enforce min age 18
          />
        </div>

        <RadioInput
          radioFields={genderRadioInput}
          selected={genderMap[gender || "NS"]}
          className="flex gap-4 items-center"
          handleChange={handleChange}
        />
        <CustomTextArea
          label="About me"
          name="aboutMe"
          value={aboutMe}
          placeholder="write something about yourself"
          handleChange={handleChange}
          styles={{
            outer: "flex flex-col gap-2 ",
            textArea:
              "w-full resize-none placeholder:text-[12px] border-light p-2",
            label: "font-bold",
          }}
        />
        <CustomButton
          btnType={"submit"}
          variant="regular-confirm"
          className="w-fit"
        >
          Update
        </CustomButton>
      </form>
    </div>
  );
};

export default EditDetails;
