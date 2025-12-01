import { useEffect, useState } from "react";
import TextInput from "../../components/ui/TextInput";
import CustomButton from "../../components/ui/Button";
import { InfoIcon } from "lucide-react";
import { usersURL } from "../../constants/urls/backend";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../redux_toolkit/store/hooks";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [info, setInfo] = useState<boolean>(false);
  const [params] = useSearchParams();
  const userId = params.get("userId");
  const rawToken = params.get("rawToken");
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const { user } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (!rawToken || !rawToken) {
      navigate("/invalid-route");
    }
    if (user) {
      if (user._id === userId) {
        setMessage("Change your Password");
      } else {
        setError(
          "You are hacking into the mails of others. This is a serious offence under cyber security."
        );
      }
    } else {
      setMessage("Reset Your Password");
    }
  }, []);

  const submitFn = async () => {
    if (!password || !confirmPassword) {
      toast.error(
        "Please provide password and confirm password values accurately"
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password must be same");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${usersURL}/password/reset?rawToken=${rawToken}&userId=${userId}`,
        {
          method: "POST",
          body: JSON.stringify({ password, confirmPassword }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Request Failed ${response.status}`);
      }
      toast.success("Password Reset Successfully");
      navigate("/out/login");
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
    setLoading(false);
  };
  return (
    <section className="pt-11 center theme">
      <div className="md:w-[60%] flex flex-col gap-8 rounded-md shadow shadow-blue-500 p-4">
        {error ? (
          <p className="text-2xl text-red-500">{error}</p>
        ) : (
          <>
            <h2 className="text-4xl">{message}</h2>
            <div className="relative">
              <CustomButton
                onClick={() => {
                  setInfo((prev) => !prev);
                }}
              >
                <span className="flex gap-2 items-center">
                  Rules
                  <InfoIcon size={14} />
                </span>
              </CustomButton>

              {info && (
                <div className="border p-2 rounded bg-gray-500 text-white text-[10px] absolute -top-25">
                  <p>Passwords must be 8-12 characters</p>
                  <p>Contain at least 1 uppercase alphabet</p>
                  <p>contain at least 1 lowercase alphabet</p>
                  <p>Contains at least 1 digit (0-9)</p>
                  <p>Contains at least 1 symbol [@,#,$,_]</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <TextInput
                label="Password"
                name="password"
                min={8}
                max={12}
                style={{ input: "w-full", size: "flex flex-col gap-2" }}
                value={password}
                handleChange={(e) => {
                  setPassword(e.target.value);
                }}
                inputType="password"
                placeholder="8-12 characters"
              />
              <TextInput
                label="Confirm Password"
                name="confirmPassword"
                min={8}
                max={12}
                style={{ input: "w-full", size: "flex flex-col gap-2" }}
                value={confirmPassword}
                handleChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                inputType="password"
                placeholder="must be same as password"
              />

              <CustomButton
                variant="regular-confirm"
                onClick={submitFn}
                className="w-fit"
                disabled={loading || password !== confirmPassword}
              >
                {loading ? "Verifying..." : "Verify"}
              </CustomButton>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ResetPassword;
