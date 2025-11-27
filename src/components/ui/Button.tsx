import type React from "react";

type BtnType = "button" | "submit" | "reset";
type VariantType =
  | "rounded-0"
  | "rounded-sm"
  | "rounded-full"
  | "regular"
  | "regular-confirm"
  | "regular-dark"
  | "regular-danger"
  | "regular-subscribe"
  | "regular-critical"
  | "submit";
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
  const regular = "rounded px-3 py-1 text-[12px] text-white";
  const submit =
    "px-3 py-1 rounded text-[1rem] text-white bg-blue-600 hover:bg-blue-500";
  const variantMap = {
    "rounded-0": "rounded-none",
    "rounded-sm": "rounded-sm",
    "rounded-full": "rounded-full",
    regular,
    "regular-confirm": `${regular} bg-blue-600`,
    "regular-dark": `${regular} bg-black dark:bg-white dark:text-black`,
    "regular-danger": `${regular} bg-red-600 hover:bg-red-500`,
    "regular-subscribe": `${regular} bg-orange-500`,
    "regular-critical": `${regular} bg-orange-500 hover:bg-orange-600`,
    submit,
  };
  return (
    <button
      disabled={disabled}
      type={btnType || "button"}
      className={`cursor-pointer ${variantMap[variant || "rounded-0"]} ${
        disabled ? "bg-gray-300 text-black hover:cursor-default" : ""
      } ${className || ""}`}
      onClick={onClick}
      form={formRef}
    >
      {children}
    </button>
  );
};

export default CustomButton;
