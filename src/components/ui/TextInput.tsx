import type { ChangeEvent } from "react";

const TextInput = ({
  placeholder,
  inputType,
  icon,
  label,
  handleChange,
  name,
  value,
  style,
  gap,
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
    label: string;
  };
}) => {
  return (
    <div className={`relative flex flex-col gap-${gap || 4} w-full`}>
      <label className={style?.label || "text-xl"}> {label}</label>
      <input
        type={inputType}
        placeholder={placeholder}
        name={name}
        value={value}
        className="border-light input-custom"
        onChange={(e) => handleChange(e)}
      />
      <div className="absolute top-2 right-3 text-white">{icon}</div>
    </div>
  );
};

export default TextInput;
