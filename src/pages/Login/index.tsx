import { useState, type ChangeEvent, type FormEvent } from "react";
import TextInput from "../../components/ui/TextInput";
// import { images } from "../../functions/images";
import toast from "react-hot-toast";
import { LockIcon, Mail } from "lucide-react";
import CustomButton from "../../components/ui/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { usersURL } from "../../functions/backend";
import { useAppDispatch } from "../../redux_toolkit/store/hooks";
import { LoaderActions } from "../../redux_toolkit/reducers/loaderReducer";

import { images } from "../../functions/images";
const Login = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(formData);
    if (!email || !password) {
      toast.error("Please enter valid details");
      return;
    }

    dispatch(LoaderActions.startLoader("Regstering in"));

    try {
      const response = await fetch(`${usersURL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (data.success) {
        dispatch(LoaderActions.stopLoader());
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        dispatch(LoaderActions.stopLoader());
        toast.error(data.message);
      }
    } catch (error: unknown) {
      console.log(images.bgHome);
      console.log(error);
      dispatch(LoaderActions.stopLoader());
      toast.error((error as Error).message);
    }
  }
  return (
    <section className="theme h-full relative">
      <div className="absolute top-0 left-0 w-full h-full flex">
        <div className="h-full w-[65%] relative ">
          <img
            alt="login-right"
            src={images["forDashboard"].src}
            className="h-full"
          />
          <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center"></div>
        </div>
        <div
          className={` w-[90%] sm:w-[35%] h-full flex flex-col justify-center items-center`}
        >
          <div className="w-[90%]">
            <h3 className=" text-3xl text-center font-bold">Sign In </h3>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col gap-4 mx-auto items-center"
            >
              <TextInput
                label="Email"
                variant="regular"
                placeholder="email here"
                name="email"
                inputType="email"
                value={email}
                icon={<Mail size={15} />}
                handleChange={handleChange}
              />
              <TextInput
                label="Password"
                placeholder="**********"
                variant="regular"
                name="password"
                inputType="password"
                value={password}
                icon={<LockIcon size={15} />}
                handleChange={handleChange}
              />
              <CustomButton btnType="submit" variant="submit">
                Login
              </CustomButton>
            </form>
            <p className="text-center my-2">-----OR-----</p>
            <div className="flex justify-center">
              <CustomButton className="" variant="regular-dark">
                <span className="flex gap-2 items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg"
                    className="w-4 h-4"
                  />{" "}
                  Sign In with Google
                </span>
              </CustomButton>
            </div>
            <div className="flex justify-between mt-3">
              <p>
                Don't have an account?{" "}
                <NavLink to={"/out/register"} className={"hover:underline"}>
                  Register
                </NavLink>
              </p>
              <NavLink
                to={"/out/password/recover"}
                className={"hover:underline"}
              >
                Forgot Password
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
