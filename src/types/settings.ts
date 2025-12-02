export type SettingProps = {
  q: string;
  ans: boolean;
  fieldType: "one-time" | "toggle" | "will-end";
  operation: { label: string; fn: (e?: string) => void; disabled?: boolean }[];
};
