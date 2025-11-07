import type React from "react";

type BtnType = "button" | "submit" | "reset";
type VariantType = "rounded-0" | "rounded-sm" | "rounded-full";
const CustomButton = ({
  children,
  className,
  onClick,
  btnType,
  disabled,
  variant,
  formRef,
}: {
  children: React.ReactElement | string;
  className?: string;
  onClick?: () => void;
  btnType?: BtnType;
  disabled?: boolean;
  variant?: VariantType;
  formRef?: string;
}) => {
  const variantMap = {
    "rounded-0": "rounded-none",
    "rounded-sm": "rounded-sm",
    "rounded-full": "rounded-full",
    default: "rounded-sm",
  };
  return (
    <button
      disabled={disabled}
      type={btnType || "button"}
      className={`cursor-pointer text-[12px] ${
        variantMap[variant || "default"] || ""
      } ${disabled ? "bg-gray-300 " : ""} ${className || ""}`}
      onClick={onClick}
      form={formRef}
    >
      {children}
    </button>
  );
};

export default CustomButton;
