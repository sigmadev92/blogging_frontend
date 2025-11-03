export type FullName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export enum Gender {
  M = "M",
  F = "F",
  O = "O",
  NS = "NS", // Not Specified
}
export type User = {
  _id: string;
  email: string;
  password?: string;
  fullName: FullName;
  gender: Gender;
  profilePic: string | null;
};
