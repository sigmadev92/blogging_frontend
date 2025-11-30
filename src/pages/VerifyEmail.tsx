import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../redux_toolkit/store/hooks";
import { usersURL } from "../constants/urls/backend";
const VerifyEmail = () => {
  const [params] = useSearchParams();
  const userId = params.get("userId");
  const rawToken = params.get("rawToken");
  const { user } = useAppSelector((state) => state.user);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !rawToken) {
      navigate("/*");
    }
    if (user) {
      if (user._id === userId) {
        if (user.isAccountVerified) {
          setMessage(`You are already verified ${user.fullName.firstName}`);
          setLoading(false);
        } else {
          setMessage("Verifying your email. Please wait");
        }
      } else {
        setMessage(
          "You are hacking into the mails of others. This is a serious offence under cyber security."
        );
        setLoading(false);
      }
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${usersURL}/verify-email?userId=${userId}&rawToken=${rawToken}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`Email Verification Failed ${response.status}`);
        }
        setMessage("Email Verified successfully. Please close this window");
      } catch (error) {
        console.log(error);
        setMessage((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, []);
  return (
    <section className="pt-11 center theme">
      <div className="flex flex-col items-center h-[200px] w-[200px]">
        {loading && <>Verifying...</>}
        {message && <>{<p>{message}</p>}</>}
      </div>
    </section>
  );
};

export default VerifyEmail;
