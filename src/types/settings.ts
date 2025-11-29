export type SettingProps = {
  q: string;
  ans: boolean;
  operation: { label: string; fn: (e?: string) => void; disabled?: boolean };
};
