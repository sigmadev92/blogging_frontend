import type React from "react";

const CustomButton = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactElement | string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`cursor-pointer rounded-md ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
