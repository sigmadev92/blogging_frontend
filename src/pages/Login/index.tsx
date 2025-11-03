import { useState, type ChangeEvent, type FormEvent } from "react";
import TextInput from "../../components/ui/TextInput";
import { images } from "../../functions/images";
import { LockIcon, Mail } from "lucide-react";
import CustomButton from "../../components/ui/Button";
import { NavLink } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

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
          <div className="p-4 flex h-full justify-center items-center">
            <h3 className="text-white text-3xl text-center font-bold">
              Welcome{" "}
            </h3>
          </div>
        </div>
        <div className="w-[90%] sm:w-[45%] h-[400px] shadow-2xs rounded-2xl text-white px-5 flex flex-col  gap-2">
          <h3 className="text-white text-3xl text-center font-bold">Login </h3>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-4 items-center"
          >
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
            <CustomButton className="bg-blue-500 px-3 py-1 text-white">
              Login
            </CustomButton>
          </form>
          <p className="text-center">-----OR-----</p>
          <div className="flex justify-center">
            <CustomButton className="bg-white px-3 py-2 text-black text-[12px] w-fit">
              Sign In with Google
            </CustomButton>
          </div>
          <div className="flex justify-between">
            <p>
              Don't have an account? <NavLink to={"/register"}>Sign up</NavLink>
            </p>
            <NavLink to={"/password/recover"}>Forgot Password</NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
