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
export enum UserRole {
  reader = "reader",
  author = "author",
}
export type User = {
  _id: string;
  email: string;
  password?: string;
  fullName: FullName;
  gender: Gender;
  role: UserRole;
  profilePic?: {
    secure_url: string;
    publicId: string;
  };
};
