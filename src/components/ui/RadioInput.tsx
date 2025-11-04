import type { ChangeEvent } from "react";
import type { RadioInputProps } from "../../types/radio";

const RadioInput = ({
  radioFields,
  selected,
  className,
  handleChange,
}: {
  radioFields: RadioInputProps;
  selected: string;
  className: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <div className="flex justify-between px-2">
        <p>{radioFields.heading}</p>
        <span>{selected}</span>
      </div>
      <div className={className}>
        {radioFields.items.map((item, idx) => (
          <div key={idx}>
            <label
              htmlFor={item.value.toString()}
              className={`px-3 py-1 rounded text-[12px] cursor-pointer ${
                selected === item.label ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              {item.label}
            </label>
            <input
              type="radio"
              id={item.value.toString()}
              className="hidden"
              name={radioFields.variable}
              value={item.value}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioInput;
