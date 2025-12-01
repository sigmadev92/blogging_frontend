import { useState, type ChangeEvent } from "react";
import TextInput from "../../components/ui/TextInput";
import { usersURL } from "../../constants/urls/backend";
import CustomButton from "../../components/ui/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RecoverPassword = () => {
  const [email, setMail] = useState<string>("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const navigate = useNavigate();
  const recoverPassword = async () => {
    if (!email) {
      toast.error("Please fill email properly");
    }
    setLoading(true);
    try {
      const response = await fetch(`${usersURL}/password/recover`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMail("");
      const data = await response.json();
      if (data.success) {
        toast.success("A verification link has been sent to your mail");
        navigate("/out/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
      setError((err as Error).message);
    }
    setLoading(false);
  };
  return (
    <section className="pt-11 theme center">
      <div className="p-2 shadow shadow-blue-400 rounded-md md:w-[50%] flex flex-col gap-4">
        <h2 className="text-4xl text-center">Forgetting Pasword is normal.</h2>
        <div className="p-4 flex flex-col gap-8">
          <p className="text-center">
            We are here to help you recover your password
          </p>
          {error && <p className="text-red-500 font-bold">{error}</p>}
          <TextInput
            inputType={loading ? "readOnly" : "email"}
            label="Registered Email"
            placeholder="enter your registered mail"
            style={{
              label: "font-bold",
              input: "w-full",
              size: "flex flex-col gap-4",
            }}
            name="email"
            value={email}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => {
              setMail(e.target.value);
            }}
          />
          <CustomButton
            variant="regular-confirm"
            onClick={recoverPassword}
            className="w-fit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "submit"}
          </CustomButton>
        </div>
      </div>
    </section>
  );
};
export default RecoverPassword;
