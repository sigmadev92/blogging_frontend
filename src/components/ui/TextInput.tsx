import type { ChangeEvent } from "react";
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
  const regular = "relative flex flex-col gap-1 w-full";

  const maping = {
    regular,
    _: "",
  };
  return (
    <div className={maping[variant || "_"]}>
      <label className={style?.label || "text-xl"}> {label}</label>
      <input
        type={inputType}
        placeholder={placeholder}
        name={name}
        value={value}
        className={`border-light input-custom ${style?.input}`}
        onChange={(e) => handleChange(e)}
      />
      <div className="absolute top-2 right-3">{icon}</div>
    </div>
  );
};

export default TextInput;
