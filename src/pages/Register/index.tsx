import { useState, type ChangeEvent, type FormEvent } from "react";
import TextInput from "../../components/ui/TextInput";
import { images } from "../../functions/images";
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
import { NavLink } from "react-router-dom";
import styles from "./register.module.css";
const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { fullName, email, password } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <section className="relative">
      <img src={images["bgLogin"].src} className="h-screen w-full" />
      <div className="absolute top-0 left-0 w-full h-full bg-[#00000058] flex justify-center gap-8 items-center">
        <div className="hidden sm:block w-[40%] shadow-2xl  rounded-xl h-[400px]">
          <div className="p-4 flex flex-col h-full gap-4  text-white">
            <h3 className=" text-3xl text-center font-bold">Join Us Today</h3>
            <p className="p-4 text-[1.5rem]">
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
        <div className="w-[90%] sm:w-[40%]   h-[400px] shadow-2xs rounded-2xl text-white px-5">
          <h3 className="text-white text-3xl text-center font-bold">
            Sign Up{" "}
          </h3>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-4 mx-auto items-center"
          >
            <TextInput
              label="Full Name"
              placeholder="John F Cena"
              name="fullName"
              inputType="text"
              value={fullName}
              icon={<User2Icon size={15} />}
              handleChange={handleChange}
            />
            <TextInput
              label="Email"
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
              name="password"
              inputType="password"
              value={password}
              icon={<LockIcon size={15} />}
              handleChange={handleChange}
            />
            <CustomButton className="bg-blue-700 px-3 py-1 text-white">
              Register
            </CustomButton>
          </form>
          <p className="text-center my-2">-----OR-----</p>
          <div className="flex justify-center">
            <CustomButton className="bg-white px-3 py-2 text-black text-[12px] w-fit">
              Sign In with Google
            </CustomButton>
          </div>
          <div className="flex justify-between mt-3">
            <p>
              Already have an account? <NavLink to={"/login"}>Login</NavLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
