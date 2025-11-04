import type { ReactElement } from "react";

export type RadioInputField = {
  label: string;
  icon?: ReactElement;
  value: string | number;
};
export type RadioInputProps = {
  heading: string;
  icon?: ReactElement;
  variable: string;
  items: RadioInputField[];
};
