import { useState, type ChangeEvent, type FormEvent } from "react";
import TextInput from "../../components/ui/TextInput";
// import { images } from "../../functions/images";
import toast from "react-hot-toast";
import {
  BookOpenCheck,
  CircleCheckBig,
  CircleDollarSign,
  Heart,
  LockIcon,
  Mail,
  MessageSquareMore,
  NotebookPen,
  User2Icon,
  Users,
} from "lucide-react";
import CustomButton from "../../components/ui/Button";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { useAppDispatch } from "../../redux_toolkit/store/hooks";
import { LoaderActions } from "../../redux_toolkit/reducers/loaderReducer";
import { usersURL } from "../../constants/urls/backend";
import { images } from "../../constants/images/credits";
const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { fullName, email, password } = formData;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(formData);

    const names = fullName.split(" ");
    if (names.length < 2 || names.length > 3) {
      toast.error("Invalid Full Name");
      return;
    }
    const fn = names[0];
    let mn = "",
      ln = "";

    if (names.length === 2) {
      ln = names[1];
    } else {
      mn = names[1];
      ln = names[2];
    }
    dispatch(LoaderActions.startLoader("Regstering in"));

    try {
      const response = await fetch(`${usersURL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: {
            firstName: fn,
            middleName: mn,
            lastName: ln,
          },
          email,
          password,
        }),
      });

      const data = await response.json();
      if (data.success) {
        dispatch(LoaderActions.stopLoader());
        toast.success("Registered successfully");
        navigate("/out/login");
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
    <section className={`pt-11 theme h-full`}>
      {/* <img src={images["forDashboard"].src} className="h-screen w-full" /> */}
      <div className="top-0 left-0 w-full h-full flex justify-center gap-8 items-center">
        <div className="hidden sm:block w-[40%] shadow-md rounded-xl h-[400px] shadow-blue-300">
          <div className="flex flex-col h-full gap-4 ">
            <h3 className=" text-3xl text-center font-bold">Join Us Today</h3>
            <p className="p-4">
              Drive yourself in the amazing world of blogs written by top
              Authors and feel the vibes you always love.
            </p>
            <ul className={styles.leftUl}>
              <li>
                <BookOpenCheck />
                Read free blogs
              </li>
              <li>
                {" "}
                <CircleCheckBig />
                Subscribe to premium blogs
              </li>
              <li>
                <Heart fill="red" />
                Like and <MessageSquareMore fill="white" /> Comment on blogs
              </li>
              <li>
                {" "}
                <NotebookPen />
                Write and publish your own blogs
              </li>
              <li>
                <Users />
                Build your Community
              </li>
              <li>
                <CircleDollarSign />
                Monetize your blogs
              </li>
            </ul>
          </div>
        </div>
        <div className="w-[90%] sm:w-[40%]   h-[450px] shadow-2xs rounded-2xl px-5">
          <h3 className=" text-3xl text-center font-bold">Sign Up </h3>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-4 mx-auto items-center"
          >
            <TextInput
              label="Full Name"
              variant="regular"
              placeholder="John F Cena"
              name="fullName"
              inputType="text"
              value={fullName}
              icon={<User2Icon size={15} />}
              handleChange={handleChange}
            />
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
            <CustomButton
              className="text-[14px]"
              variant="submit"
              btnType="submit"
            >
              Register
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
          <div className="flex justify-center mt-3">
            <p>
              Already have an account?{" "}
              <NavLink to={"/out/login"} className={"hover:underline"}>
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
