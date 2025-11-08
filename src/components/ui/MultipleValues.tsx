import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import CustomButton from "./Button";

const MultipleValues = ({
  collector,
  deleteFromCollector,
  addToCollector,
  placeholder,
  styles,
  label,
  inputLength,
  items,
}: {
  collector: string[];
  placeholder: string;
  label: string;
  items: {
    min: number;
    max: number;
  };
  inputLength: {
    min: number;
    max: number;
  };
  styles: {
    outer?: string;
    inputField?: string;
    addBtn?: string;
    label?: string;
  };
  addToCollector: (e: string) => void;
  deleteFromCollector: (e: number) => void;
}) => {
  const [inputValue, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const addBtn = () => {
    if (collector.includes(inputValue)) {
      setError("Duplicate value not allowed");
      return;
    }
    if (
      inputValue.length > inputLength.max ||
      inputValue.length < inputLength.min
    ) {
      setError(`must be ${inputLength.min} - ${inputLength.max} characters.`);
      return;
    }
    addToCollector(inputValue);
    setError("");
    setValue("");
  };
  const deleteBtn = (idx: number) => {
    console.log(idx);
    deleteFromCollector(idx);
  };
  return (
    <div className={`flex flex-col gap-2${styles.outer || ""}`}>
      <label className={styles.label || "font-bold"}>{label}</label>
      <div className="flex justify-between">
        <input
          type="text"
          minLength={inputLength.min}
          maxLength={inputLength.max}
          name="inputValue"
          value={inputValue}
          className="placeholder:text-[12px] text-[12px] bg-transparent border border-gray-300 rounded px-2 py-1 w-[80%]"
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          disabled={collector.length === items.max}
        />
        {error && <p className="text-[12px] text-red-500">{error}</p>}
        <CustomButton
          btnType="button"
          onClick={addBtn}
          variant={"regular-confirm"}
          disabled={
            inputValue.length > inputLength.max ||
            inputValue.length < inputLength.min ||
            collector.length >= items.max
          }
        >
          Add
        </CustomButton>
      </div>

      {collector.length > 0 && (
        <div className="max-h-[100px] overflow-y-auto p-2 rounded border border-blue-200">
          <ul className="list-none flex gap-2 flex-wrap">
            {collector.map((item, idx) => (
              <li
                key={idx}
                className="text-[12px] px-2 py-0.5 rounded bg-black text-white dark:bg-white dark:text-black"
              >
                {item}{" "}
                <button
                  onClick={() => deleteBtn(idx)}
                  className="cursor-pointer"
                >
                  <Trash2Icon size={12} className="hover:text-red-500" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultipleValues;
