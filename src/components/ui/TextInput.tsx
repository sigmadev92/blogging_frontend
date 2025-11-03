import type { ChangeEvent } from "react";

const TextInput = ({
  placeholder,
  inputType,
  icon,
  label,
  handleChange,
  name,
  value,
}: {
  placeholder: string;
  inputType: string;
  icon: React.ReactElement;
  label: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
}) => {
  return (
    <div className="relative flex flex-col gap-2 w-full">
      <label className=" text-xl"> {label}</label>
      <input
        type={inputType}
        placeholder={placeholder}
        name={name}
        value={value}
        className="bg-white text-black px-3 py-2 placeholder:text-[12px] placeholder:text-gray-600"
        onChange={(e) => handleChange(e)}
      />
      <div className="absolute top-2 right-3 text-white">{icon}</div>
    </div>
  );
};

export default TextInput;
