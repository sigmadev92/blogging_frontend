import type { ChangeEvent, ReactElement } from "react";

const CustomTextArea = ({
  styles,
  icon,
  label,
  handleChange,
  value,
  name,
  placeholder,
  rows,
}: {
  name: string;
  placeholder: string;
  styles?: { outer?: string; label?: string; textArea?: string };
  icon?: ReactElement;
  label: string;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  rows?: number;
}) => {
  return (
    <div className={`flex justify-between ${styles?.outer || ""}`}>
      <label htmlFor={name} className={styles?.label}>
        {label}
      </label>
      {icon && <div>{icon}</div>}

      <textarea
        className={styles?.textArea}
        placeholder={placeholder}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        rows={rows || 4}
      ></textarea>
    </div>
  );
};

export default CustomTextArea;
