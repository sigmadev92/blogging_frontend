import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import CustomButton from "./Button";
type Variant = "regular";
const TextInput = ({
  placeholder,
  inputType,
  icon,
  label,
  handleChange,
  name,
  value,
  style,
  variant,
}: {
  placeholder: string;
  inputType: string;
  icon?: React.ReactElement;
  label: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  gap?: number;
  style?: {
    label?: string;
    input?: string;
  };
  variant?: Variant;
}) => {
  const regular = "relative flex flex-col gap-2 w-full";
  const [it, setIt] = useState<boolean>(inputType === "password");
  const maping = {
    regular,
    _: "",
  };
  return (
    <div
      className={`${maping[variant || "_"]} ${
        inputType === "password" ? "relative" : ""
      }`}
    >
      <label htmlFor={name} className={style?.label || "text-xl"}>
        {" "}
        {label}
      </label>
      <input
        type={inputType === "password" ? (it ? "password" : "text") : inputType}
        placeholder={placeholder}
        name={name}
        id={name}
        value={value}
        className={`border-light input-custom ${style?.input}`}
        onChange={(e) => handleChange(e)}
      />
      <div className="absolute top-2 right-3">{icon}</div>
      {inputType === "password" && (
        <CustomButton
          className="absolute right-2 top-10"
          variant="rounded-0"
          onClick={() => setIt((prev) => !prev)}
        >
          {it ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
        </CustomButton>
      )}
    </div>
  );
};

export default TextInput;
